"use strict";
/**
 * Utilidad para hashear y comparar contraseñas usando bcrypt
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswordStrength = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
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
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
        return hashedPassword;
    }
    catch (error) {
        throw new Error(`Error al hashear contraseña: ${error.message}`);
    }
};
exports.hashPassword = hashPassword;
/**
 * Compara una contraseña en texto plano con una contraseña hasheada
 * @param password - Contraseña en texto plano
 * @param hashedPassword - Contraseña hasheada
 * @returns true si las contraseñas coinciden
 */
const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt_1.default.compare(password, hashedPassword);
        return isMatch;
    }
    catch (error) {
        throw new Error(`Error al comparar contraseña: ${error.message}`);
    }
};
exports.comparePassword = comparePassword;
/**
 * Valida que una contraseña cumpla con los requisitos mínimos
 * @param password - Contraseña a validar
 * @returns true si la contraseña es válida
 */
const validatePasswordStrength = (password) => {
    const errors = [];
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
exports.validatePasswordStrength = validatePasswordStrength;
//# sourceMappingURL=bcrypt.js.map