import { Request, Response } from 'express';
/**
 * Controlador para gestión de álbumes
 */
export declare class AlbumController {
    private albumService;
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
     * POST /api/albums
     * Crea un nuevo álbum
     */
    create: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/albums/:id
     * Obtiene un álbum por su ID
     */
    findById: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/albums
     * Obtiene todos los álbumes
     */
    findAll: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/albums/artista/:artistaId
     * Obtiene álbumes de un artista
     */
    findByArtista: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/albums/genero/:genero
     * Obtiene álbumes por género
     */
    findByGenero: (req: Request, res: Response) => Promise<Response>;
    /**
     * PUT /api/albums/:id
     * Actualiza un álbum
     */
    update: (req: Request, res: Response) => Promise<Response>;
    /**
     * DELETE /api/albums/:id
     * Elimina un álbum
     */
    delete: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/albums/count
     * Obtiene el conteo total de álbumes
     */
    getCount: (req: Request, res: Response) => Promise<Response>;
}
//# sourceMappingURL=albumController.d.ts.map