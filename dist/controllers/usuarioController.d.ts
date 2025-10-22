/**
 * UsuarioController
 * Controlador que maneja las peticiones HTTP relacionadas con usuarios
 * Utiliza UserService para la lógica de negocio
 */
import { Request, Response } from 'express';
export declare class UsuarioController {
    private userService;
    constructor();
    /**
     * GET /api/usuarios
     * Obtiene todos los usuarios o filtra según parámetros de query
     */
    getAll: (req: Request, res: Response) => Promise<void>;
    /**
     * GET /api/usuarios/:id
     * Obtiene un usuario por su ID
     */
    getById: (req: Request, res: Response) => Promise<void>;
    /**
     * GET /api/usuarios/email/:email
     * Obtiene un usuario por su email
     */
    getByEmail: (req: Request, res: Response) => Promise<void>;
    /**
     * POST /api/usuarios
     * Crea un nuevo usuario
     */
    create: (req: Request, res: Response) => Promise<void>;
    /**
     * PUT /api/usuarios/:id
     * Actualiza un usuario existente
     */
    update: (req: Request, res: Response) => Promise<void>;
    /**
     * DELETE /api/usuarios/:id
     * Elimina un usuario
     */
    delete: (req: Request, res: Response) => Promise<void>;
    /**
     * GET /api/usuarios/stats/count
     * Obtiene el conteo total de usuarios
     */
    getCount: (req: Request, res: Response) => Promise<void>;
    /**
     * GET /api/usuarios/stats/general
     * Obtiene estadísticas generales de usuarios
     */
    getStats: (req: Request, res: Response) => Promise<void>;
    /**
     * GET /api/usuarios/nuevos
     * Obtiene usuarios nuevos (registrados hace menos de 30 días)
     */
    getNewUsers: (req: Request, res: Response) => Promise<void>;
    /**
     * POST /api/usuarios/login
     * Valida credenciales de usuario y genera tokens JWT
     */
    login: (req: Request, res: Response) => Promise<void>;
    /**
     * PUT /api/usuarios/:id/rol
     * Cambia el rol de un usuario
     */
    changeRole: (req: Request, res: Response) => Promise<void>;
    /**
     * GET /api/usuarios/check-email/:email
     * Verifica si un email está disponible
     */
    checkEmailAvailability: (req: Request, res: Response) => Promise<void>;
    /**
     * Método auxiliar para remover la contraseña de la respuesta
     * @param usuario - Usuario a sanitizar
     * @returns Objeto usuario sin el campo password
     */
    private sanitizarUsuario;
}
//# sourceMappingURL=usuarioController.d.ts.map