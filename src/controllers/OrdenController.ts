import { Request, Response } from 'express';
import { OrdenService } from '../services/OrdeneService';
import { EstadoOrden } from '../types/enums';

/**
 * Controlador para gestión de órdenes
 */
export class OrdenController {
    private ordenService: OrdenService;

    constructor() {
        this.ordenService = new OrdenService();
    }

    /**
     * Formato de respuesta estandar para éxito
     */
    private successResponse(res: Response, data: any, message?: string, statusCode: number = 200): Response {
        return res.status(statusCode).json({
            success: true,
            message: message || 'Operacion exitosa',
            data
        });
    }

    /**
     * Formato de respuesta estandar para error
     */
    private errorResponse(res: Response, error: any, statusCode: number = 400): Response {
        let code = statusCode;
        let message = error.message || 'Error en la operacion';

        if (message.includes('no encontrad')) {
            code = 404;
        } else if (message.includes('no esta disponible') || message.includes('no se puede')) {
            code = 409; // Conflict
        } else if (message.includes('invalid') || message.includes('requerido')) {
            code = 400; // Bad Request
        } else if (!statusCode || statusCode === 400) {
            code = 500; // Internal Server Error
        }

        return res.status(code).json({
            success: false,
            message,
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }

    /**
     * Valida que un parametro sea un número válido
     */
    private validarNumero(valor: string, nombreCampo: string): number {
        const numero = parseInt(valor, 10);
        if (isNaN(numero) || numero <= 0) {
            throw new Error(`${nombreCampo} debe ser un número válido y mayor a 0`);
        }
        return numero;
    }

    /**
     * POST /api/ordenes
     * Crea una nueva orden
     */
    public crearOrden = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { usuarioId, boletoIds } = req.body;

            // Validación básica
            if (!usuarioId || !boletoIds) {
                return this.errorResponse(res,
                    new Error('Faltan campos requeridos: usuarioId, boletoIds'),
                    400
                );
            }

            if (!Array.isArray(boletoIds) || boletoIds.length === 0) {
                return this.errorResponse(res,
                    new Error('boletoIds debe ser un array con al menos un elemento'),
                    400
                );
            }

            const nuevaOrden = await this.ordenService.crearOrden({
                usuarioId,
                boletoIds,
            });

            return this.successResponse(res, nuevaOrden, 'Orden creada exitosamente', 201);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/ordenes/:id
     * Obtiene una orden por su ID
     */
    public obtenerOrdenPorId = async (req: Request, res: Response): Promise<Response> => {
        try {
            const ordenId = this.validarNumero(req.params.id, 'ID de la orden');
            const orden = await this.ordenService.obtenerOrdenPorId(ordenId);

            if (!orden) {
                return this.errorResponse(res, new Error('Orden no encontrada'), 404);
            }

            return this.successResponse(res, orden);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/ordenes
     * Obtiene todas las Órdenes
     */
    public obtenerTodasLasOrdenes = async (req: Request, res: Response): Promise<Response> => {
        try {
            const ordenes = await this.ordenService.obtenerTodasLasOrdenes();
            return this.successResponse(res, ordenes, `${ordenes.length} Órdenes encontradas`);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/ordenes/mis-ordenes
     * Obtiene las órdenes del usuario autenticado (sus compras)
     */
    public obtenerMisOrdenes = async (req: Request, res: Response): Promise<Response> => {
        try {
            // Obtener usuario del token de autenticación
            // @ts-ignore - El middleware de autenticación añade req.user
            const usuarioId = req.user?.id;

            if (!usuarioId) {
                return this.errorResponse(res,
                    new Error('Usuario no autenticado'),
                    401
                );
            }

            const ordenes = await this.ordenService.obtenerOrdenesPorUsuario(usuarioId);

            return this.successResponse(res, ordenes, `${ordenes.length} órdenes encontradas`);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/ordenes/usuario/:usuarioId
     * Obtiene todas las órdenes de un usuario específico (Admin/Organizador)
     */
    public obtenerOrdenesPorUsuario = async (req: Request, res: Response): Promise<Response> => {
        try {
            const usuarioId = this.validarNumero(req.params.usuarioId, 'ID del usuario');
            const ordenes = await this.ordenService.obtenerOrdenesPorUsuario(usuarioId);

            return this.successResponse(res, ordenes, `${ordenes.length} órdenes encontradas`);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/ordenes/estado/:estado
     * Obtiene Órdenes por estado
     */
    public obtenerOrdenesPorEstado = async (req: Request, res: Response): Promise<Response> => {
        try {
            const estado = req.params.estado.toUpperCase() as EstadoOrden;
            const ordenes = await this.ordenService.obtenerOrdenesPorEstado(estado);

            return this.successResponse(res, ordenes, `${ordenes.length} Órdenes encontradas`);
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * PUT /api/ordenes/:id/estado
     * Actualiza el estado de una orden
     */
    public actualizarEstadoOrden = async (req: Request, res: Response): Promise<Response> => {
        try {
            const ordenId = this.validarNumero(req.params.id, 'ID de la orden');
            const { estado } = req.body;

            if (!estado) {
                return this.errorResponse(res,
                    new Error('El campo estado es requerido'),
                    400
                );
            }

            const ordenActualizada = await this.ordenService.actualizarEstadoOrden(
                ordenId,
                estado.toUpperCase() as EstadoOrden
            );

            return this.successResponse(res, ordenActualizada, 'Estado de la orden actualizado exitosamente');
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * POST /api/ordenes/:id/pagar
     * Marca una orden como pagada
     */
    public marcarComoPagada = async (req: Request, res: Response): Promise<Response> => {
        try {
            const ordenId = this.validarNumero(req.params.id, 'ID de la orden');
            const ordenPagada = await this.ordenService.marcarComoPagada(ordenId);

            return this.successResponse(res, ordenPagada, 'Orden marcada como pagada exitosamente');
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * POST /api/ordenes/:id/cancelar
     * Cancela una orden
     */
    public cancelarOrden = async (req: Request, res: Response): Promise<Response> => {
        try {
            const ordenId = this.validarNumero(req.params.id, 'ID de la orden');
            const ordenCancelada = await this.ordenService.cancelarOrden(ordenId);

            return this.successResponse(res, ordenCancelada, 'Orden cancelada exitosamente');
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * POST /api/ordenes/:id/reembolsar
     * Procesa un reembolso para una orden
     */
    public reembolsarOrden = async (req: Request, res: Response): Promise<Response> => {
        try {
            const ordenId = this.validarNumero(req.params.id, 'ID de la orden');
            const ordenReembolsada = await this.ordenService.reembolsarOrden(ordenId);

            return this.successResponse(res, ordenReembolsada, 'Orden reembolsada exitosamente');
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * DELETE /api/ordenes/:id
     * Elimina una orden
     */
    public eliminarOrden = async (req: Request, res: Response): Promise<Response> => {
        try {
            const ordenId = this.validarNumero(req.params.id, 'ID de la orden');
            await this.ordenService.eliminarOrden(ordenId);

            return this.successResponse(res, null, 'Orden eliminada exitosamente');
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };

    /**
     * GET /api/ordenes/estadisticas
     * Obtiene estadísticas de órdenes
     */
    public obtenerEstadisticas = async (req: Request, res: Response): Promise<Response> => {
        try {
            const estadisticas = await this.ordenService.obtenerEstadisticas();

            return this.successResponse(res, estadisticas, 'Estadísticas obtenidas exitosamente');
        } catch (error: any) {
            return this.errorResponse(res, error);
        }
    };
}
