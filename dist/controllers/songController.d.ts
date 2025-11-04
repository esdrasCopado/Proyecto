import { Request, Response } from 'express';
/**
 * Controlador para gestión de canciones
 */
export declare class SongController {
    private songService;
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
     * POST /api/songs
     * Crea una nueva canción
     */
    create: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/songs/:id
     * Obtiene una canción por su ID
     */
    findById: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/songs
     * Obtiene todas las canciones
     */
    findAll: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/songs/album/:albumId
     * Obtiene canciones de un álbum
     */
    findByAlbum: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/songs/buscar/:titulo
     * Busca canciones por título
     */
    searchByTitulo: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/songs/con-video
     * Obtiene canciones con video
     */
    findWithVideo: (req: Request, res: Response) => Promise<Response>;
    /**
     * PUT /api/songs/:id
     * Actualiza una canción
     */
    update: (req: Request, res: Response) => Promise<Response>;
    /**
     * DELETE /api/songs/:id
     * Elimina una canción
     */
    delete: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/songs/count
     * Obtiene el conteo total de canciones
     */
    getCount: (req: Request, res: Response) => Promise<Response>;
}
//# sourceMappingURL=songController.d.ts.map