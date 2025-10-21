/**
 * Middleware de autenticación JWT
 * Verifica que el usuario tenga un token válido
 */

import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, extractTokenFromHeader, DecodedToken } from '../utils/jwt';

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
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extraer el token del header Authorization
        const authHeader = req.headers.authorization;
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Token de autenticación no proporcionado',
            });
            return;
        }

        // Verificar y decodificar el token
        try {
            const decoded = verifyAccessToken(token);

            // Agregar información del usuario a la request
            req.user = decoded;

            // Continuar con el siguiente middleware
            next();
        } catch (error: any) {
            if (error.message === 'Token expirado') {
                res.status(401).json({
                    success: false,
                    message: 'Token expirado',
                    code: 'TOKEN_EXPIRED',
                });
                return;
            }

            if (error.message === 'Token inválido') {
                res.status(401).json({
                    success: false,
                    message: 'Token inválido',
                    code: 'TOKEN_INVALID',
                });
                return;
            }

            throw error;
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error al verificar autenticación',
            error: error.message,
        });
    }
};

/**
 * Middleware opcional de autenticación
 * Similar a authenticate, pero no falla si no hay token
 * Útil para rutas que pueden funcionar con o sin autenticación
 */
export const optionalAuthenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token = extractTokenFromHeader(authHeader);

        if (token) {
            try {
                const decoded = verifyAccessToken(token);
                req.user = decoded;
            } catch (error) {
                // Ignorar errores en autenticación opcional
            }
        }

        next();
    } catch (error: any) {
        // Ignorar errores en autenticación opcional
        next();
    }
};
