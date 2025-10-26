"use strict";
/**
 * Entidad Usuario
 * Representa un usuario del sistema que puede comprar boletos y realizar órdenes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const enums_1 = require("../types/enums");
class Usuario {
    constructor(data) {
        this._id = data.id;
        this._email = data.email;
        this._password = data.password;
        this._nombre = data.nombre;
        this._apellidos = data.apellidos;
        this._telefono = data.telefono;
        this._rol = data.rol || enums_1.Role.USER;
        this._artistaId = data.artistaId;
        this._organizadorId = data.organizadorId;
        // Convertir fechaRegistro a Date si viene como string
        if (data.fechaRegistro) {
            this._fechaRegistro = typeof data.fechaRegistro === 'string'
                ? new Date(data.fechaRegistro)
                : data.fechaRegistro;
        }
        else {
            this._fechaRegistro = new Date();
        }
        this.validar();
    }
    // ==================== GETTERS ====================
    get id() {
        return this._id;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get nombre() {
        return this._nombre;
    }
    get apellidos() {
        return this._apellidos;
    }
    get telefono() {
        return this._telefono;
    }
    get fechaRegistro() {
        return this._fechaRegistro;
    }
    get rol() {
        return this._rol;
    }
    get artistaId() {
        return this._artistaId;
    }
    get organizadorId() {
        return this._organizadorId;
    }
    // ==================== SETTERS ====================
    set email(value) {
        if (!Usuario.validarEmail(value)) {
            throw new Error('Email inválido');
        }
        this._email = value.trim();
    }
    set password(value) {
        if (!Usuario.validarPassword(value)) {
            throw new Error('Contraseña inválida. Debe tener al menos 6 caracteres');
        }
        this._password = value;
    }
    set nombre(value) {
        if (!Usuario.validarNombre(value)) {
            throw new Error('Nombre inválido');
        }
        this._nombre = value.trim();
    }
    set apellidos(value) {
        if (!Usuario.validarNombre(value)) {
            throw new Error('Apellidos inválidos');
        }
        this._apellidos = value.trim();
    }
    set telefono(value) {
        if (!Usuario.validarTelefono(value)) {
            throw new Error('Teléfono inválido');
        }
        this._telefono = value.trim();
    }
    set fechaRegistro(value) {
        const fecha = typeof value === 'string' ? new Date(value) : value;
        if (!Usuario.validarFecha(fecha)) {
            throw new Error('Fecha inválida');
        }
        this._fechaRegistro = fecha;
    }
    set rol(value) {
        this._rol = value;
    }
    // ==================== VALIDACIONES ====================
    /**
     * Valida la instancia completa del usuario
     * @throws Error si algún dato es inválido
     */
    validar() {
        if (!Usuario.validarEmail(this._email)) {
            throw new Error('Email inválido');
        }
        if (!Usuario.validarPassword(this._password)) {
            throw new Error('Contraseña inválida. Debe tener al menos 6 caracteres');
        }
        if (!Usuario.validarNombre(this._nombre)) {
            throw new Error('Nombre inválido');
        }
        if (!Usuario.validarNombre(this._apellidos)) {
            throw new Error('Apellidos inválidos');
        }
        if (!Usuario.validarTelefono(this._telefono)) {
            throw new Error('Teléfono inválido');
        }
        if (!Usuario.validarFecha(this._fechaRegistro)) {
            throw new Error('Fecha de registro inválida');
        }
    }
    /**
     * Valida el formato de un email
     * @param email - Email a validar
     * @returns true si el email es válido
     */
    static validarEmail(email) {
        if (!email || email.trim().length === 0) {
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    /**
     * Valida una contraseña
     * @param password - Contraseña a validar
     * @returns true si la contraseña es válida
     */
    static validarPassword(password) {
        if (!password || password.length === 0) {
            return false;
        }
        // Mínimo 6 caracteres
        return password.length >= 6;
    }
    /**
     * Valida un nombre o apellido
     * @param nombre - Nombre a validar
     * @returns true si el nombre es válido
     */
    static validarNombre(nombre) {
        if (!nombre || nombre.trim().length === 0) {
            return false;
        }
        if (nombre.length < 2 || nombre.length > 100) {
            return false;
        }
        // Solo letras, espacios, acentos y ñ
        const nombreRegex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/;
        return nombreRegex.test(nombre);
    }
    /**
     * Valida un número de teléfono
     * @param telefono - Teléfono a validar
     * @returns true si el teléfono es válido
     */
    static validarTelefono(telefono) {
        if (!telefono || telefono.trim().length === 0) {
            return false;
        }
        // Eliminar espacios, guiones y paréntesis
        const telefonoLimpio = telefono.replace(/[\s\-()]/g, '');
        // Validar que tenga 10 dígitos
        const telefonoRegex = /^\d{10}$/;
        return telefonoRegex.test(telefonoLimpio);
    }
    /**
     * Valida una fecha
     * @param fecha - Fecha a validar
     * @returns true si la fecha es válida
     */
    static validarFecha(fecha) {
        if (!(fecha instanceof Date)) {
            return false;
        }
        return !isNaN(fecha.getTime());
    }
    // ==================== MÉTODOS DE NEGOCIO ====================
    /**
     * Obtiene el nombre completo del usuario
     * @returns Nombre y apellidos concatenados
     */
    getNombreCompleto() {
        return `${this._nombre} ${this._apellidos}`;
    }
    /**
     * Obtiene las iniciales del usuario
     * @returns Iniciales en mayúsculas
     */
    getIniciales() {
        const inicialNombre = this._nombre.charAt(0).toUpperCase();
        const inicialApellido = this._apellidos.charAt(0).toUpperCase();
        return `${inicialNombre}${inicialApellido}`;
    }
    /**
     * Calcula cuántos días lleva registrado el usuario
     * @returns Número de días desde el registro
     */
    getDiasRegistrado() {
        const hoy = new Date();
        const diferencia = hoy.getTime() - this._fechaRegistro.getTime();
        return Math.floor(diferencia / (1000 * 3600 * 24));
    }
    /**
     * Obtiene la fecha de registro formateada
     * @returns Fecha en formato legible
     */
    getFechaRegistroFormateada() {
        return this._fechaRegistro.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    /**
     * Verifica si el usuario es nuevo (menos de 30 días registrado)
     * @returns true si el usuario es nuevo
     */
    esUsuarioNuevo() {
        return this.getDiasRegistrado() <= 30;
    }
    /**
     * Verifica si el usuario tiene rol de usuario normal
     * @returns true si el rol es USER
     */
    esUsuarioNormal() {
        return this._rol === enums_1.Role.USER;
    }
    /**
     * Verifica si el usuario tiene rol de artista
     * @returns true si el rol es ARTISTA
     */
    esArtista() {
        return this._rol === enums_1.Role.ARTISTA;
    }
    /**
     * Verifica si el usuario tiene rol de organizador
     * @returns true si el rol es ORGANIZADOR
     */
    esOrganizador() {
        return this._rol === enums_1.Role.ORGANIZADOR;
    }
    /**
     * Verifica si el usuario tiene rol de administrador
     * @returns true si el rol es ADMIN
     */
    esAdmin() {
        return this._rol === enums_1.Role.ADMIN;
    }
    // ==================== CONVERSIÓN DE DATOS ====================
    /**
     * Convierte el usuario a un objeto plano para persistencia
     * @returns Objeto con los datos del usuario
     */
    toJSON() {
        return {
            id: this._id,
            email: this._email,
            password: this._password,
            nombre: this._nombre,
            apellidos: this._apellidos,
            telefono: this._telefono,
            fechaRegistro: this._fechaRegistro,
            rol: this._rol,
            artistaId: this._artistaId,
            organizadorId: this._organizadorId,
        };
    }
    /**
     * Crea una instancia de Usuario desde datos de base de datos
     * @param data - Datos del usuario desde la BD
     * @returns Nueva instancia de Usuario
     */
    static fromDatabase(data) {
        return new Usuario({
            id: data.id,
            email: data.email,
            password: data.password,
            nombre: data.nombre,
            apellidos: data.apellidos,
            telefono: data.telefono,
            fechaRegistro: data.fechaRegistro || data.fecha_registro,
            rol: data.rol,
            artistaId: data.artista?.id || null,
            organizadorId: data.organizador?.id || null,
        });
    }
    /**
     * Crea una copia independiente del usuario
     * @returns Nueva instancia con los mismos datos
     */
    clone() {
        return new Usuario(this.toJSON());
    }
    /**
     * Convierte el usuario a string representativo
     * @returns Representación en texto del usuario
     */
    toString() {
        return `${this.getNombreCompleto()} (${this._email})`;
    }
    // ==================== MÉTODOS DE COMPARACIÓN ====================
    /**
     * Compara si dos usuarios son iguales (por ID)
     * @param otro - Otro usuario a comparar
     * @returns true si son el mismo usuario
     */
    equals(otro) {
        return this._id !== undefined && this._id === otro._id;
    }
    /**
     * Verifica si el usuario tiene un ID asignado
     * @returns true si el usuario ha sido persistido en BD
     */
    estaPersistido() {
        return this._id !== undefined && this._id > 0;
    }
}
exports.Usuario = Usuario;
//# sourceMappingURL=Usuario.js.map