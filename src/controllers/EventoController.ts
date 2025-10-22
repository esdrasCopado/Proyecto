import { Request, Response } from 'express';
import { EventoService } from '../services/EventoService';

/**
 * Controlador para gestión de eventos
 */
export class EventoController {
    private eventoService: EventoService;

    constructor() {
        this.eventoService = new EventoService();
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
     * POST /api/eventos
     * Crea un nuevo evento
     */
    public create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { nombre, descripcion, fecha, ubicacion, organizadorId } = req.body;

            if (!nombre || !fecha || !ubicacion || !organizadorId) {
                return this.errorResponse(res,
                    new Error('Faltan campos requeridos: nombre, fecha, ubicacion, organizadorId'),
                    400
                );
            }

            const nuevoEvento = await this.eventoService.crearEvento({
                nombre,
                descripcion,
                fecha,
                ubicacion,
                organizadorId
            });

            return this.successResponse(res, nuevoEvento, 'Evento creado exitosamente', 201);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/eventos/:id
     * Obtiene un evento por su ID
     */
    public findById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const eventoId = this.validarNumero(req.params.id, 'ID del evento');
            const evento = await this.eventoService.obtenerEventoPorId(eventoId);

            if (!evento) {
                return this.errorResponse(res, new Error('Evento no encontrado'), 404);
            }

            return this.successResponse(res, evento);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/eventos
     * Obtiene todos los eventos
     */
    public findAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const eventos = await this.eventoService.obtenerTodosLosEventos();
            return this.successResponse(res, eventos, `${eventos.length} eventos encontrados`);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * PUT /api/eventos/:id
     * Actualiza un evento
     */
    public update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const eventoId = this.validarNumero(req.params.id, 'ID del evento');
            const { nombre, descripcion, fecha, ubicacion, organizadorId } = req.body;

            if (!nombre && !descripcion && !fecha && !ubicacion && !organizadorId) {
                return this.errorResponse(res,
                    new Error('Debe proporcionar al menos un campo para actualizar'),
                    400
                );
            }

            const eventoActualizado = await this.eventoService.actualizarEvento(eventoId, {
                nombre,
                descripcion,
                fecha,
                ubicacion,
                organizadorId
            });

            if (!eventoActualizado) {
                return this.errorResponse(res, new Error('Evento no encontrado'), 404);
            }

            return this.successResponse(res, eventoActualizado, 'Evento actualizado exitosamente');
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * DELETE /api/eventos/:id
     * Elimina un evento
     */
    public delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const eventoId = this.validarNumero(req.params.id, 'ID del evento');
            const eliminado = await this.eventoService.eliminarEvento(eventoId);

            if (!eliminado) {
                return this.errorResponse(res, new Error('Evento no encontrado'), 404);
            }

            return this.successResponse(res, null, 'Evento eliminado exitosamente');
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/eventos/organizador/:organizadorId
     * Obtiene eventos de un organizador específico
     */
    public findByOrganizador = async (req: Request, res: Response): Promise<Response> => {
        try {
            const organizadorId = this.validarNumero(req.params.organizadorId, 'ID del organizador');
            const eventos = await this.eventoService.obtenerEventosPorOrganizador(organizadorId);

            return this.successResponse(res, eventos, `${eventos.length} eventos encontrados`);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/eventos/proximos
     * Obtiene eventos próximos (futuros)
     */
    public findProximos = async (req: Request, res: Response): Promise<Response> => {
        try {
            const limite = req.query.limite ? parseInt(req.query.limite as string, 10) : undefined;
            const eventos = await this.eventoService.obtenerEventosProximos(limite);

            return this.successResponse(res, eventos, `${eventos.length} eventos próximos`);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/eventos/pasados
     * Obtiene eventos pasados
     */
    public findPasados = async (req: Request, res: Response): Promise<Response> => {
        try {
            const limite = req.query.limite ? parseInt(req.query.limite as string, 10) : undefined;
            const eventos = await this.eventoService.obtenerEventosPasados(limite);

            return this.successResponse(res, eventos, `${eventos.length} eventos pasados`);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/eventos/rango-fecha
     * Obtiene eventos en un rango de fechas
     */
    public findByRangoFecha = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { fechaInicio, fechaFin } = req.query;

            if (!fechaInicio || !fechaFin) {
                return this.errorResponse(res,
                    new Error('Se requieren los parámetros fechaInicio y fechaFin'),
                    400
                );
            }

            const eventos = await this.eventoService.obtenerEventosPorRangoFecha(
                fechaInicio as string,
                fechaFin as string
            );

            return this.successResponse(res, eventos, `${eventos.length} eventos encontrados`);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/eventos/estadisticas
     * Obtiene estadísticas de eventos
     */
    public getEstadisticas = async (req: Request, res: Response): Promise<Response> => {
        try {
            const estadisticas = await this.eventoService.obtenerEstadisticas();
            return this.successResponse(res, estadisticas, 'Estadísticas obtenidas');
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/eventos/count
     * Obtiene el conteo total de eventos
     */
    public getCount = async (req: Request, res: Response): Promise<Response> => {
        try {
            const total = await this.eventoService.contarEventos();
            return this.successResponse(res, { total }, `Total de eventos: ${total}`);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };
}
