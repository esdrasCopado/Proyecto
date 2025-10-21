/**
 * Utilidad para hashear y comparar contraseñas usando bcrypt
 */

import bcrypt from 'bcrypt';

/**
 * Número de rondas de salt para bcrypt
 * Mayor número = más seguro pero más lento
 * Recomendado: 10-12
 */
const SALT_ROUNDS = 10;

/**
 * Hashea una contraseña usando bcrypt
 * @param password - Contraseña en texto plano
 * @returns Contraseña hasheada
 */
export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    } catch (error: any) {
        throw new Error(`Error al hashear contraseña: ${error.message}`);
    }
};

/**
 * Compara una contraseña en texto plano con una contraseña hasheada
 * @param password - Contraseña en texto plano
 * @param hashedPassword - Contraseña hasheada
 * @returns true si las contraseñas coinciden
 */
export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error: any) {
        throw new Error(`Error al comparar contraseña: ${error.message}`);
    }
};

/**
 * Valida que una contraseña cumpla con los requisitos mínimos
 * @param password - Contraseña a validar
 * @returns true si la contraseña es válida
 */
export const validatePasswordStrength = (password: string): {
    isValid: boolean;
    errors: string[];
} => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una mayúscula');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una minúscula');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('La contraseña debe contener al menos un número');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('La contraseña debe contener al menos un carácter especial');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};
