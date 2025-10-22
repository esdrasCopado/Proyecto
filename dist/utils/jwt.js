"use strict";
/**
 * Utilidad para generar y verificar JSON Web Tokens (JWT)
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenExpirationTime = exports.isTokenExpired = exports.extractTokenFromHeader = exports.decodeToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const env_1 = require("../config/env");
/**
 * Genera un token JWT de acceso
 * @param payload - Datos del usuario para incluir en el token
 * @returns Token JWT
 */
const generateAccessToken = (payload) => {
    try {
        const secret = env_1.jwtConfig.secret;
        const expiresIn = env_1.jwtConfig.expiresIn || '7d';
        const token = jwt.sign(payload, secret, { expiresIn });
        return token;
    }
    catch (error) {
        throw new Error(`Error al generar token de acceso: ${error.message}`);
    }
};
exports.generateAccessToken = generateAccessToken;
/**
 * Genera un token JWT de refresco (refresh token)
 * @param payload - Datos del usuario para incluir en el token
 * @returns Refresh token JWT
 */
const generateRefreshToken = (payload) => {
    try {
        if (!env_1.jwtConfig.refreshSecret) {
            throw new Error('JWT_REFRESH_SECRET no está configurado');
        }
        const secret = env_1.jwtConfig.refreshSecret;
        const expiresIn = env_1.jwtConfig.refreshExpiresIn || '30d';
        const token = jwt.sign(payload, secret, { expiresIn });
        return token;
    }
    catch (error) {
        throw new Error(`Error al generar refresh token: ${error.message}`);
    }
};
exports.generateRefreshToken = generateRefreshToken;
/**
 * Verifica y decodifica un token JWT de acceso
 * @param token - Token JWT a verificar
 * @returns Payload decodificado del token
 * @throws Error si el token es inválido o ha expirado
 */
const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, env_1.jwtConfig.secret);
        return decoded;
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expirado');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Token inválido');
        }
        throw new Error(`Error al verificar token: ${error.message}`);
    }
};
exports.verifyAccessToken = verifyAccessToken;
/**
 * Verifica y decodifica un refresh token
 * @param token - Refresh token JWT a verificar
 * @returns Payload decodificado del token
 * @throws Error si el token es inválido o ha expirado
 */
const verifyRefreshToken = (token) => {
    try {
        if (!env_1.jwtConfig.refreshSecret) {
            throw new Error('JWT_REFRESH_SECRET no está configurado');
        }
        const decoded = jwt.verify(token, env_1.jwtConfig.refreshSecret);
        return decoded;
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Refresh token expirado');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Refresh token inválido');
        }
        throw new Error(`Error al verificar refresh token: ${error.message}`);
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
/**
 * Decodifica un token JWT sin verificar su firma
 * Útil para inspeccionar tokens sin validarlos
 * @param token - Token JWT a decodificar
 * @returns Payload decodificado o null si el token es inválido
 */
const decodeToken = (token) => {
    try {
        const decoded = jwt.decode(token);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.decodeToken = decodeToken;
/**
 * Extrae el token del header Authorization
 * @param authHeader - Header Authorization (Bearer token)
 * @returns Token extraído o null
 */
const extractTokenFromHeader = (authHeader) => {
    if (!authHeader) {
        return null;
    }
    // Formato esperado: "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }
    return parts[1];
};
exports.extractTokenFromHeader = extractTokenFromHeader;
/**
 * Verifica si un token ha expirado
 * @param token - Token JWT a verificar
 * @returns true si el token ha expirado
 */
const isTokenExpired = (token) => {
    try {
        const decoded = (0, exports.decodeToken)(token);
        if (!decoded || !decoded.exp) {
            return true;
        }
        // exp está en segundos, Date.now() en milisegundos
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    }
    catch (error) {
        return true;
    }
};
exports.isTokenExpired = isTokenExpired;
/**
 * Obtiene el tiempo restante antes de que expire el token (en segundos)
 * @param token - Token JWT
 * @returns Segundos restantes o 0 si ya expiró
 */
const getTokenExpirationTime = (token) => {
    try {
        const decoded = (0, exports.decodeToken)(token);
        if (!decoded || !decoded.exp) {
            return 0;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = decoded.exp - currentTime;
        return timeRemaining > 0 ? timeRemaining : 0;
    }
    catch (error) {
        return 0;
    }
};
exports.getTokenExpirationTime = getTokenExpirationTime;
//# sourceMappingURL=jwt.js.map