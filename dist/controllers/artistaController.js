"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistaController = void 0;
const ArtistaService_1 = require("../services/ArtistaService");
/**
 * Controlador para gestión de artistas
 */
class ArtistaController {
    constructor() {
        /**
         * POST /api/artistas
         * Crea un nuevo artista
         */
        this.create = async (req, res) => {
            try {
                const { nombre, genero, contacto, paisOrigen, fechaDebut, disquera, usuarioId } = req.body;
                if (!nombre || !genero || !contacto || !paisOrigen || !fechaDebut) {
                    return this.errorResponse(res, new Error('Faltan campos requeridos: nombre, genero, contacto, paisOrigen, fechaDebut'), 400);
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
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/artistas/:id
         * Obtiene un artista por su ID
         */
        this.findById = async (req, res) => {
            try {
                const artistaId = this.validarNumero(req.params.id, 'ID del artista');
                const artista = await this.artistaService.obtenerArtistaPorId(artistaId);
                if (!artista) {
                    return this.errorResponse(res, new Error('Artista no encontrado'), 404);
                }
                return this.successResponse(res, artista);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/artistas
         * Obtiene todos los artistas
         */
        this.findAll = async (req, res) => {
            try {
                const artistas = await this.artistaService.obtenerTodosLosArtistas();
                return this.successResponse(res, artistas, `${artistas.length} artistas encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * PUT /api/artistas/:id
         * Actualiza un artista
         */
        this.update = async (req, res) => {
            try {
                const artistaId = this.validarNumero(req.params.id, 'ID del artista');
                const { nombre, genero, contacto, paisOrigen, fechaDebut, disquera, usuarioId } = req.body;
                if (!nombre && !genero && !contacto && !paisOrigen && !fechaDebut && disquera === undefined && usuarioId === undefined) {
                    return this.errorResponse(res, new Error('Debe proporcionar al menos un campo para actualizar'), 400);
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
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * DELETE /api/artistas/:id
         * Elimina un artista
         */
        this.delete = async (req, res) => {
            try {
                const artistaId = this.validarNumero(req.params.id, 'ID del artista');
                const eliminado = await this.artistaService.eliminarArtista(artistaId);
                if (!eliminado) {
                    return this.errorResponse(res, new Error('Artista no encontrado'), 404);
                }
                return this.successResponse(res, null, 'Artista eliminado exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        this.artistaService = new ArtistaService_1.ArtistaService();
    }
    /**
     * Formato de respuesta estándar para éxito
     */
    successResponse(res, data, message, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message: message || 'Operación exitosa',
            data
        });
    }
    /**
     * Formato de respuesta estándar para error
     */
    errorResponse(res, error, statusCode = 500) {
        let code = statusCode;
        let message = error.message || 'Error en la operación';
        if (message.includes('no encontrado')) {
            code = 404;
        }
        else if (message.includes('no existe')) {
            code = 404;
        }
        else if (message.includes('inválido') || message.includes('requerido')) {
            code = 400;
        }
        else if (message.includes('ya existe')) {
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
    validarNumero(valor, nombreCampo) {
        const numero = parseInt(valor, 10);
        if (isNaN(numero) || numero <= 0) {
            throw new Error(`${nombreCampo} debe ser un número válido y mayor a 0`);
        }
        return numero;
    }
}
exports.ArtistaController = ArtistaController;
//# sourceMappingURL=ArtistaController.js.map