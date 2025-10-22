/**
 * Middleware de autenticación JWT
 * Verifica que el usuario tenga un token válido
 */
import { Request, Response, NextFunction } from 'express';
import { DecodedToken } from '../utils/jwt';
/**
 * Extensión del tipo Request de Express para incluir el usuario autenticado
 */
declare global {
    namespace Express {
        interface Request {
            user?: DecodedToken;
        }
    }
}
/**
 * Middleware para verificar autenticación JWT
 * Extrae el token del header Authorization y lo verifica
 * Si es válido, agrega la información del usuario a req.user
 */
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Middleware opcional de autenticación
 * Similar a authenticate, pero no falla si no hay token
 * Útil para rutas que pueden funcionar con o sin autenticación
 */
export declare const optionalAuthenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map