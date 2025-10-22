/**
 * Utilidad para hashear y comparar contraseñas usando bcrypt
 */
/**
 * Hashea una contraseña usando bcrypt
 * @param password - Contraseña en texto plano
 * @returns Contraseña hasheada
 */
export declare const hashPassword: (password: string) => Promise<string>;
/**
 * Compara una contraseña en texto plano con una contraseña hasheada
 * @param password - Contraseña en texto plano
 * @param hashedPassword - Contraseña hasheada
 * @returns true si las contraseñas coinciden
 */
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
/**
 * Valida que una contraseña cumpla con los requisitos mínimos
 * @param password - Contraseña a validar
 * @returns true si la contraseña es válida
 */
export declare const validatePasswordStrength: (password: string) => {
    isValid: boolean;
    errors: string[];
};
//# sourceMappingURL=bcrypt.d.ts.map