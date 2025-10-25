import { Request, Response } from 'express';
/**
 * Controlador para gestión de órdenes
 */
export declare class OrdenController {
    private ordenService;
    constructor();
    /**
     * Formato de respuesta estandar para éxito
     */
    private successResponse;
    /**
     * Formato de respuesta estandar para error
     */
    private errorResponse;
    /**
     * Valida que un parametro sea un número válido
     */
    private validarNumero;
    /**
     * POST /api/ordenes
     * Crea una nueva orden
     */
    crearOrden: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/ordenes/:id
     * Obtiene una orden por su ID
     */
    obtenerOrdenPorId: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/ordenes
     * Obtiene todas las Órdenes
     */
    obtenerTodasLasOrdenes: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/ordenes/mis-ordenes
     * Obtiene las órdenes del usuario autenticado (sus compras)
     */
    obtenerMisOrdenes: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/ordenes/usuario/:usuarioId
     * Obtiene todas las órdenes de un usuario específico (Admin/Organizador)
     */
    obtenerOrdenesPorUsuario: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/ordenes/estado/:estado
     * Obtiene Órdenes por estado
     */
    obtenerOrdenesPorEstado: (req: Request, res: Response) => Promise<Response>;
    /**
     * PUT /api/ordenes/:id/estado
     * Actualiza el estado de una orden
     */
    actualizarEstadoOrden: (req: Request, res: Response) => Promise<Response>;
    /**
     * POST /api/ordenes/:id/pagar
     * Marca una orden como pagada
     */
    marcarComoPagada: (req: Request, res: Response) => Promise<Response>;
    /**
     * POST /api/ordenes/:id/cancelar
     * Cancela una orden
     */
    cancelarOrden: (req: Request, res: Response) => Promise<Response>;
    /**
     * POST /api/ordenes/:id/reembolsar
     * Procesa un reembolso para una orden
     */
    reembolsarOrden: (req: Request, res: Response) => Promise<Response>;
    /**
     * DELETE /api/ordenes/:id
     * Elimina una orden
     */
    eliminarOrden: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/ordenes/estadisticas
     * Obtiene estadísticas de órdenes
     */
    obtenerEstadisticas: (req: Request, res: Response) => Promise<Response>;
}
//# sourceMappingURL=OrdenController.d.ts.map