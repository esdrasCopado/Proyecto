import { Request, Response } from 'express';
import { ArtistaService } from '../services/ArtistaService';

/**
 * Controlador para gestión de artistas
 */
export class ArtistaController {
    private artistaService: ArtistaService;

    constructor() {
        this.artistaService = new ArtistaService();
    }

    /**
     * Formato de respuesta estándar para éxito
     */
    private successResponse(res: Response, data: any, message?: string, statusCode: number = 200): Response {
        return res.status(statusCode).json({
            success: true,
            message: message || 'Operación exitosa',
            data
        });
    }

    /**
     * Formato de respuesta estándar para error
     */
    private errorResponse(res: Response, error: any, statusCode: number = 500): Response {
        let code = statusCode;
        let message = error.message || 'Error en la operación';

        if (message.includes('no encontrado')) {
            code = 404;
        } else if (message.includes('no existe')) {
            code = 404;
        } else if (message.includes('inválido') || message.includes('requerido')) {
            code = 400;
        } else if (message.includes('ya existe')) {
            code = 409;
        }

        return res.status(code).json({
            success: false,
            message,
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }

    /**
     * Valida que un parámetro sea un número válido
     */
    private validarNumero(valor: string, nombreCampo: string): number {
        const numero = parseInt(valor, 10);
        if (isNaN(numero) || numero <= 0) {
            throw new Error(`${nombreCampo} debe ser un número válido y mayor a 0`);
        }
        return numero;
    }

    /**
     * POST /api/artistas
     * Crea un nuevo artista
     */
    public create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { nombre, genero, contacto, paisOrigen, fechaDebut, disquera, usuarioId } = req.body;

            if (!nombre || !genero || !contacto || !paisOrigen || !fechaDebut) {
                return this.errorResponse(res,
                    new Error('Faltan campos requeridos: nombre, genero, contacto, paisOrigen, fechaDebut'),
                    400
                );
            }

            const nuevoArtista = await this.artistaService.crearArtista({
                nombre,
                genero,
                contacto,
                paisOrigen,
                fechaDebut,
                disquera,
                usuarioId
            });

            return this.successResponse(res, nuevoArtista, 'Artista creado exitosamente', 201);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/artistas/:id
     * Obtiene un artista por su ID
     */
    public findById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const artistaId = this.validarNumero(req.params.id, 'ID del artista');
            const artista = await this.artistaService.obtenerArtistaPorId(artistaId);

            if (!artista) {
                return this.errorResponse(res, new Error('Artista no encontrado'), 404);
            }

            return this.successResponse(res, artista);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/artistas
     * Obtiene todos los artistas
     */
    public findAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const artistas = await this.artistaService.obtenerTodosLosArtistas();
            return this.successResponse(res, artistas, `${artistas.length} artistas encontrados`);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * PUT /api/artistas/:id
     * Actualiza un artista
     */
    public update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const artistaId = this.validarNumero(req.params.id, 'ID del artista');
            const { nombre, genero, contacto, paisOrigen, fechaDebut, disquera, usuarioId } = req.body;

            if (!nombre && !genero && !contacto && !paisOrigen && !fechaDebut && disquera === undefined && usuarioId === undefined) {
                return this.errorResponse(res,
                    new Error('Debe proporcionar al menos un campo para actualizar'),
                    400
                );
            }

            const artistaActualizado = await this.artistaService.actualizarArtista(artistaId, {
                nombre,
                genero,
                contacto,
                paisOrigen,
                fechaDebut,
                disquera,
                usuarioId
            });

            if (!artistaActualizado) {
                return this.errorResponse(res, new Error('Artista no encontrado'), 404);
            }

            return this.successResponse(res, artistaActualizado, 'Artista actualizado exitosamente');
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * DELETE /api/artistas/:id
     * Elimina un artista
     */
    public delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const artistaId = this.validarNumero(req.params.id, 'ID del artista');
            const eliminado = await this.artistaService.eliminarArtista(artistaId);

            if (!eliminado) {
                return this.errorResponse(res, new Error('Artista no encontrado'), 404);
            }

            return this.successResponse(res, null, 'Artista eliminado exitosamente');
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };
}
