/**
 * Middleware de autorización por roles
 * Verifica que el usuario autenticado tenga el rol necesario
 */

import { Request, Response, NextFunction } from 'express';
import { Role } from '../types/enums';

/**
 * Middleware para autorizar acceso basado en roles
 * Debe usarse DESPUÉS del middleware authenticate
 * @param allowedRoles - Array de roles permitidos para acceder a la ruta
 */
export const authorize = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            // Verificar que el usuario esté autenticado
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado',
                });
                return;
            }

            // Verificar si el rol del usuario está en los roles permitidos
            const userRole = req.user.rol;
            const hasPermission = allowedRoles.includes(userRole);

            if (!hasPermission) {
                res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para acceder a este recurso',
                    requiredRoles: allowedRoles,
                    userRole: userRole,
                });
                return;
            }

            // Usuario autorizado, continuar
            next();
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al verificar autorización',
                error: error.message,
            });
        }
    };
};

/**
 * Middleware para verificar que el usuario solo acceda a sus propios recursos
 * o sea administrador
 * @param getUserIdFromParams - Función para extraer el ID del usuario de los parámetros
 */
export const authorizeOwnerOrAdmin = (
    getUserIdFromParams: (req: Request) => number
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            // Verificar que el usuario esté autenticado
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado',
                });
                return;
            }

            // Si es admin, permitir acceso
            if (req.user.rol === Role.ADMIN) {
                next();
                return;
            }

            // Extraer el ID del recurso
            const resourceUserId = getUserIdFromParams(req);

            // Verificar que el usuario sea el propietario del recurso
            if (req.user.userId !== resourceUserId) {
                res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para acceder a este recurso',
                });
                return;
            }

            // Usuario autorizado, continuar
            next();
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al verificar autorización',
                error: error.message,
            });
        }
    };
};

/**
 * Middleware que solo permite acceso a administradores
 */
export const adminOnly = authorize(Role.ADMIN);

/**
 * Middleware que permite acceso a administradores y organizadores
 */
export const adminOrOrganizer = authorize(Role.ADMIN, Role.ORGANIZADOR);

/**
 * Middleware que permite acceso a administradores y artistas
 */
export const adminOrArtist = authorize(Role.ADMIN, Role.ARTISTA);

/**
 * Middleware que permite acceso a todos los usuarios autenticados
 */
export const anyAuthenticatedUser = authorize(
    Role.USER,
    Role.ARTISTA,
    Role.ORGANIZADOR,
    Role.ADMIN
);
