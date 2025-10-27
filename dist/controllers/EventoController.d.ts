import { Request, Response } from 'express';
/**
 * Controlador para gestión de eventos
 */
export declare class EventoController {
    private eventoService;
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
     * POST /api/eventos
     * Crea un nuevo evento
     */
    create: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/eventos/:id
     * Obtiene un evento por su ID
     */
    findById: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/eventos
     * Obtiene todos los eventos
     */
    findAll: (req: Request, res: Response) => Promise<Response>;
    /**
     * PUT /api/eventos/:id
     * Actualiza un evento
     */
    update: (req: Request, res: Response) => Promise<Response>;
    /**
     * DELETE /api/eventos/:id
     * Elimina un evento
     */
    delete: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/eventos/organizador/:organizadorId
     * Obtiene eventos de un organizador específico
     */
    findByOrganizador: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/eventos/proximos
     * Obtiene eventos próximos (futuros)
     */
    findProximos: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/eventos/pasados
     * Obtiene eventos pasados
     */
    findPasados: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/eventos/rango-fecha
     * Obtiene eventos en un rango de fechas
     */
    findByRangoFecha: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/eventos/estadisticas
     * Obtiene estadísticas de eventos
     */
    getEstadisticas: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/eventos/count
     * Obtiene el conteo total de eventos
     */
    getCount: (req: Request, res: Response) => Promise<Response>;
}
//# sourceMappingURL=eventoController.d.ts.map