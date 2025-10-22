"use strict";
/**
 * Middleware de autorización por roles
 * Verifica que el usuario autenticado tenga el rol necesario
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyAuthenticatedUser = exports.adminOrArtist = exports.adminOrOrganizer = exports.adminOnly = exports.authorizeOwnerOrAdmin = exports.authorize = void 0;
const enums_1 = require("../types/enums");
/**
 * Middleware para autorizar acceso basado en roles
 * Debe usarse DESPUÉS del middleware authenticate
 * @param allowedRoles - Array de roles permitidos para acceder a la ruta
 */
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al verificar autorización',
                error: error.message,
            });
        }
    };
};
exports.authorize = authorize;
/**
 * Middleware para verificar que el usuario solo acceda a sus propios recursos
 * o sea administrador
 * @param getUserIdFromParams - Función para extraer el ID del usuario de los parámetros
 */
const authorizeOwnerOrAdmin = (getUserIdFromParams) => {
    return (req, res, next) => {
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
            if (req.user.rol === enums_1.Role.ADMIN) {
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al verificar autorización',
                error: error.message,
            });
        }
    };
};
exports.authorizeOwnerOrAdmin = authorizeOwnerOrAdmin;
/**
 * Middleware que solo permite acceso a administradores
 */
exports.adminOnly = (0, exports.authorize)(enums_1.Role.ADMIN);
/**
 * Middleware que permite acceso a administradores y organizadores
 */
exports.adminOrOrganizer = (0, exports.authorize)(enums_1.Role.ADMIN, enums_1.Role.ORGANIZADOR);
/**
 * Middleware que permite acceso a administradores y artistas
 */
exports.adminOrArtist = (0, exports.authorize)(enums_1.Role.ADMIN, enums_1.Role.ARTISTA);
/**
 * Middleware que permite acceso a todos los usuarios autenticados
 */
exports.anyAuthenticatedUser = (0, exports.authorize)(enums_1.Role.USER, enums_1.Role.ARTISTA, enums_1.Role.ORGANIZADOR, enums_1.Role.ADMIN);
//# sourceMappingURL=authorize.middleware.js.map