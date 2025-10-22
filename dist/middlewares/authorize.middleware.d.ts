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
export declare const authorize: (...allowedRoles: Role[]) => (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware para verificar que el usuario solo acceda a sus propios recursos
 * o sea administrador
 * @param getUserIdFromParams - Función para extraer el ID del usuario de los parámetros
 */
export declare const authorizeOwnerOrAdmin: (getUserIdFromParams: (req: Request) => number) => (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware que solo permite acceso a administradores
 */
export declare const adminOnly: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware que permite acceso a administradores y organizadores
 */
export declare const adminOrOrganizer: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware que permite acceso a administradores y artistas
 */
export declare const adminOrArtist: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware que permite acceso a todos los usuarios autenticados
 */
export declare const anyAuthenticatedUser: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorize.middleware.d.ts.map