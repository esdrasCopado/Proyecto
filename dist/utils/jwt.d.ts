/**
 * Utilidad para generar y verificar JSON Web Tokens (JWT)
 */
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
    iat: number;
    exp: number;
}
/**
 * Genera un token JWT de acceso
 * @param payload - Datos del usuario para incluir en el token
 * @returns Token JWT
 */
export declare const generateAccessToken: (payload: JWTPayload) => string;
/**
 * Genera un token JWT de refresco (refresh token)
 * @param payload - Datos del usuario para incluir en el token
 * @returns Refresh token JWT
 */
export declare const generateRefreshToken: (payload: JWTPayload) => string;
/**
 * Verifica y decodifica un token JWT de acceso
 * @param token - Token JWT a verificar
 * @returns Payload decodificado del token
 * @throws Error si el token es inválido o ha expirado
 */
export declare const verifyAccessToken: (token: string) => DecodedToken;
/**
 * Verifica y decodifica un refresh token
 * @param token - Refresh token JWT a verificar
 * @returns Payload decodificado del token
 * @throws Error si el token es inválido o ha expirado
 */
export declare const verifyRefreshToken: (token: string) => DecodedToken;
/**
 * Decodifica un token JWT sin verificar su firma
 * Útil para inspeccionar tokens sin validarlos
 * @param token - Token JWT a decodificar
 * @returns Payload decodificado o null si el token es inválido
 */
export declare const decodeToken: (token: string) => DecodedToken | null;
/**
 * Extrae el token del header Authorization
 * @param authHeader - Header Authorization (Bearer token)
 * @returns Token extraído o null
 */
export declare const extractTokenFromHeader: (authHeader: string | undefined) => string | null;
/**
 * Verifica si un token ha expirado
 * @param token - Token JWT a verificar
 * @returns true si el token ha expirado
 */
export declare const isTokenExpired: (token: string) => boolean;
/**
 * Obtiene el tiempo restante antes de que expire el token (en segundos)
 * @param token - Token JWT
 * @returns Segundos restantes o 0 si ya expiró
 */
export declare const getTokenExpirationTime: (token: string) => number;
//# sourceMappingURL=jwt.d.ts.map