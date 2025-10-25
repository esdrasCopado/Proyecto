import { Request, Response } from 'express';
/**
 * Controlador para gestión de boletos
 */
export declare class BoletoController {
    private boletoService;
    constructor();
    /**
     * Formato de respuesta estándar para éxito
     */
    private successResponse;
    /**
     * Formato de respuesta estándar para error
     */
    private errorResponse;
    /**
     * Valida que un parámetro sea un número válido
     */
    private validarNumero;
    /**
     * POST /api/boletos
     * Crea un nuevo boleto
     */
    crearBoleto: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/boletos/:id
     * Obtiene un boleto por su ID
     */
    obtenerBoletoPorId: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/boletos
     * Obtiene todos los boletos
     */
    obtenerTodosLosBoletos: (req: Request, res: Response) => Promise<Response>;
    /**
     * PUT /api/boletos/:id
     * Actualiza un boleto
     */
    actualizarBoleto: (req: Request, res: Response) => Promise<Response>;
    /**
     * DELETE /api/boletos/:id
     * Elimina un boleto
     */
    eliminarBoleto: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/boletos/evento/:eventoId
     * Obtiene todos los boletos de un evento
     */
    buscarBoletosPorEvento: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/boletos/evento/:eventoId/disponibles
     * Obtiene boletos disponibles de un evento
     */
    obtenerBoletosDisponibles: (req: Request, res: Response) => Promise<Response>;
    /**
     * POST /api/boletos/:id/comprar
     * Compra un boleto (asigna al usuario autenticado)
     * Requiere autenticación
     */
    comprarBoleto: (req: Request, res: Response) => Promise<Response>;
    /**
     * POST /api/boletos/:id/liberar
     * Libera un boleto (lo hace disponible nuevamente)
     * Requiere autenticación y permisos de admin
     */
    liberarBoleto: (req: Request, res: Response) => Promise<Response>;
    /**
     * DELETE /api/boletos/evento/:eventoId
     * Elimina todos los boletos de un evento
     * Requiere permisos de admin/organizador
     */
    eliminarBoletosPorEvento: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/boletos/evento/:eventoId/estadisticas
     * Obtiene estadísticas de boletos de un evento
     */
    obtenerEstadisticasEvento: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/boletos/evento/:eventoId/verificar-disponibilidad
     * Verifica si hay suficientes boletos disponibles
     */
    verificarDisponibilidad: (req: Request, res: Response) => Promise<Response>;
    /**
     * POST /api/boletos/lote
     * Crea boletos en lote para un evento
     * Permite crear cientos o miles de boletos de manera eficiente
     */
    crearBoletosEnLote: (req: Request, res: Response) => Promise<Response>;
}
//# sourceMappingURL=BoletoController.d.ts.map