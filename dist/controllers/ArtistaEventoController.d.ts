import { Request, Response } from 'express';
/**
 * Controlador para gestión de relaciones Artista-Evento
 */
export declare class ArtistaEventoController {
    private artistaEventoService;
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
     * POST /api/eventos/:eventoId/artistas
     * Asigna un artista a un evento
     */
    asignarArtista: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/eventos/:eventoId/artistas
     * Obtiene todos los artistas de un evento
     */
    obtenerArtistasDeEvento: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/artistas/:artistaId/eventos
     * Obtiene todos los eventos de un artista
     */
    obtenerEventosDeArtista: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/eventos/:eventoId/artistas/headliners
     * Obtiene los headliners de un evento
     */
    obtenerHeadliners: (req: Request, res: Response) => Promise<Response>;
    /**
     * PUT /api/eventos/:eventoId/artistas/:artistaId
     * Actualiza el rol y/o compensación de un artista en un evento
     */
    actualizarAsignacion: (req: Request, res: Response) => Promise<Response>;
    /**
     * DELETE /api/eventos/:eventoId/artistas/:artistaId
     * Remueve un artista de un evento
     */
    removerArtista: (req: Request, res: Response) => Promise<Response>;
}
//# sourceMappingURL=ArtistaEventoController.d.ts.map