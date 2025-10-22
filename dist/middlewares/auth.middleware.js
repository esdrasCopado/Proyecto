"use strict";
/**
 * Middleware de autenticación JWT
 * Verifica que el usuario tenga un token válido
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthenticate = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
/**
 * Middleware para verificar autenticación JWT
 * Extrae el token del header Authorization y lo verifica
 * Si es válido, agrega la información del usuario a req.user
 */
const authenticate = async (req, res, next) => {
    try {
        // Extraer el token del header Authorization
        const authHeader = req.headers.authorization;
        const token = (0, jwt_1.extractTokenFromHeader)(authHeader);
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Token de autenticación no proporcionado',
            });
            return;
        }
        // Verificar y decodificar el token
        try {
            const decoded = (0, jwt_1.verifyAccessToken)(token);
            // Agregar información del usuario a la request
            req.user = decoded;
            // Continuar con el siguiente middleware
            next();
        }
        catch (error) {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al verificar autenticación',
            error: error.message,
        });
    }
};
exports.authenticate = authenticate;
/**
 * Middleware opcional de autenticación
 * Similar a authenticate, pero no falla si no hay token
 * Útil para rutas que pueden funcionar con o sin autenticación
 */
const optionalAuthenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = (0, jwt_1.extractTokenFromHeader)(authHeader);
        if (token) {
            try {
                const decoded = (0, jwt_1.verifyAccessToken)(token);
                req.user = decoded;
            }
            catch (error) {
                // Ignorar errores en autenticación opcional
            }
        }
        next();
    }
    catch (error) {
        // Ignorar errores en autenticación opcional
        next();
    }
};
exports.optionalAuthenticate = optionalAuthenticate;
//# sourceMappingURL=auth.middleware.js.map