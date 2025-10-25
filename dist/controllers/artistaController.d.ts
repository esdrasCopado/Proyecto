import { Request, Response } from 'express';
/**
 * Controlador para gestión de artistas
 */
export declare class ArtistaController {
    private artistaService;
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
     * POST /api/artistas
     * Crea un nuevo artista
     */
    create: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/artistas/:id
     * Obtiene un artista por su ID
     */
    findById: (req: Request, res: Response) => Promise<Response>;
    /**
     * GET /api/artistas
     * Obtiene todos los artistas
     */
    findAll: (req: Request, res: Response) => Promise<Response>;
    /**
     * PUT /api/artistas/:id
     * Actualiza un artista
     */
    update: (req: Request, res: Response) => Promise<Response>;
    /**
     * DELETE /api/artistas/:id
     * Elimina un artista
     */
    delete: (req: Request, res: Response) => Promise<Response>;
}
//# sourceMappingURL=ArtistaController.d.ts.map