/**
 * Utilidad para generar y verificar JSON Web Tokens (JWT)
 */

import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/env';
import { Role } from '../types/enums';

/**
 * Payload del token JWT
 */
export interface JWTPayload {
    userId: number;
    email: string;
    rol: Role;
}

/**
 * Payload decodificado del token JWT
 */
export interface DecodedToken extends JWTPayload {
    iat: number;  // Issued at (tiempo de emisión)
    exp: number;  // Expiration time (tiempo de expiración)
}

/**
 * Genera un token JWT de acceso
 * @param payload - Datos del usuario para incluir en el token
 * @returns Token JWT
 */
export const generateAccessToken = (payload: JWTPayload): string => {
    try {
        const secret = jwtConfig.secret;
        const expiresIn = jwtConfig.expiresIn || '7d';

        const token = jwt.sign(
            payload,
            secret,
            { expiresIn } as jwt.SignOptions
        );
        return token;
    } catch (error: any) {
        throw new Error(`Error al generar token de acceso: ${error.message}`);
    }
};

/**
 * Genera un token JWT de refresco (refresh token)
 * @param payload - Datos del usuario para incluir en el token
 * @returns Refresh token JWT
 */
export const generateRefreshToken = (payload: JWTPayload): string => {
    try {
        if (!jwtConfig.refreshSecret) {
            throw new Error('JWT_REFRESH_SECRET no está configurado');
        }

        const secret = jwtConfig.refreshSecret;
        const expiresIn = jwtConfig.refreshExpiresIn || '30d';

        const token = jwt.sign(
            payload,
            secret,
            { expiresIn } as jwt.SignOptions
        );
        return token;
    } catch (error: any) {
        throw new Error(`Error al generar refresh token: ${error.message}`);
    }
};

/**
 * Verifica y decodifica un token JWT de acceso
 * @param token - Token JWT a verificar
 * @returns Payload decodificado del token
 * @throws Error si el token es inválido o ha expirado
 */
export const verifyAccessToken = (token: string): DecodedToken => {
    try {
        const decoded = jwt.verify(token, jwtConfig.secret) as DecodedToken;
        return decoded;
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expirado');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Token inválido');
        }
        throw new Error(`Error al verificar token: ${error.message}`);
    }
};

/**
 * Verifica y decodifica un refresh token
 * @param token - Refresh token JWT a verificar
 * @returns Payload decodificado del token
 * @throws Error si el token es inválido o ha expirado
 */
export const verifyRefreshToken = (token: string): DecodedToken => {
    try {
        if (!jwtConfig.refreshSecret) {
            throw new Error('JWT_REFRESH_SECRET no está configurado');
        }

        const decoded = jwt.verify(token, jwtConfig.refreshSecret) as DecodedToken;
        return decoded;
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Refresh token expirado');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Refresh token inválido');
        }
        throw new Error(`Error al verificar refresh token: ${error.message}`);
    }
};

/**
 * Decodifica un token JWT sin verificar su firma
 * Útil para inspeccionar tokens sin validarlos
 * @param token - Token JWT a decodificar
 * @returns Payload decodificado o null si el token es inválido
 */
export const decodeToken = (token: string): DecodedToken | null => {
    try {
        const decoded = jwt.decode(token) as DecodedToken;
        return decoded;
    } catch (error) {
        return null;
    }
};

/**
 * Extrae el token del header Authorization
 * @param authHeader - Header Authorization (Bearer token)
 * @returns Token extraído o null
 */
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
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

/**
 * Verifica si un token ha expirado
 * @param token - Token JWT a verificar
 * @returns true si el token ha expirado
 */
export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp) {
            return true;
        }

        // exp está en segundos, Date.now() en milisegundos
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};

/**
 * Obtiene el tiempo restante antes de que expire el token (en segundos)
 * @param token - Token JWT
 * @returns Segundos restantes o 0 si ya expiró
 */
export const getTokenExpirationTime = (token: string): number => {
    try {
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp) {
            return 0;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = decoded.exp - currentTime;
        return timeRemaining > 0 ? timeRemaining : 0;
    } catch (error) {
        return 0;
    }
};
