"use strict";
/**
 * Entidad Artista
 * Representa un artista que puede participar en eventos
 *
 * @author Tu Nombre
 * @version 1.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artista = void 0;
class Artista {
    /**
     * Constructor de la clase Artista
     * @param data - Datos del artista
     * @throws Error si los datos son inválidos
     */
    constructor(data) {
        this._id = data.id;
        this._nombre = data.nombre;
        this._genero = data.genero;
        this._contacto = data.contacto;
        this._paisOrigen = data.paisOrigen;
        this._fechaDebut = data.fechaDebut;
        this._disquera = data.disquera;
        this._usuarioId = data.usuarioId;
        this.validar();
    }
    // ==================== GETTERS ====================
    /**
     * Obtiene el ID del artista
     * @returns ID del artista o undefined si no está asignado
     */
    get id() {
        return this._id;
    }
    /**
     * Obtiene el nombre del artista
     * @returns Nombre del artista
     */
    get nombre() {
        return this._nombre;
    }
    /**
     * Obtiene el género musical del artista
     * @returns Género musical
     */
    get genero() {
        return this._genero;
    }
    /**
     * Obtiene el contacto del artista
     * @returns Información de contacto o null/undefined si no está disponible
     */
    get contacto() {
        return this._contacto;
    }
    get paisOrigen() {
        return this._paisOrigen;
    }
    get fechaDebut() {
        return this._fechaDebut;
    }
    get disquera() {
        return this._disquera;
    }
    /**
     * Obtiene el ID del usuario asociado
     * @returns ID del usuario o null/undefined si no está asociado
     */
    get usuarioId() {
        return this._usuarioId;
    }
    // ==================== SETTERS ====================
    /**
     * Establece el nombre del artista
     * @param value - Nuevo nombre
     * @throws Error si el nombre es inválido
     */
    set nombre(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('El nombre del artista es requerido');
        }
        if (value.length > 200) {
            throw new Error('El nombre del artista no puede exceder 200 caracteres');
        }
        this._nombre = value.trim();
    }
    /**
     * Establece el género musical del artista
     * @param value - Nuevo género musical
     * @throws Error si el género es inválido
     */
    set genero(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('El género musical es requerido');
        }
        if (value.length > 100) {
            throw new Error('El género musical no puede exceder 100 caracteres');
        }
        this._genero = value.trim();
    }
    /**
     * Establece la información de contacto del artista
     * @param value - Nueva información de contacto
     */
    set contacto(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('El contacto es requerido');
        }
        this._contacto = value.trim();
    }
    set paisOrigen(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('El país de origen es requerido');
        }
        this._paisOrigen = value.trim();
    }
    set fechaDebut(value) {
        if (!(value instanceof Date) || isNaN(value.getTime())) {
            throw new Error('La fecha de debut es inválida');
        }
        this._fechaDebut = value;
    }
    set disquera(value) {
        if (value && value.trim().length === 0) {
            this._disquera = null;
        }
        else {
            this._disquera = value;
        }
    }
    /**
     * Establece el ID del usuario asociado
     * @param value - ID del usuario o null para desasociar
     */
    set usuarioId(value) {
        if (value !== null && value !== undefined) {
            if (typeof value !== 'number' || value <= 0 || !Number.isInteger(value)) {
                throw new Error('El ID de usuario debe ser un número entero positivo');
            }
        }
        this._usuarioId = value;
    }
    // ==================== VALIDACIONES ====================
    /**
     * Valida la instancia completa del artista
     * @throws Error si algún dato es inválido
     * @private
     */
    validar() {
        // 1. Validaciones existentes (nombre y genero)
        if (!this._nombre || this._nombre.trim().length === 0 || this._nombre.length > 200) {
            throw new Error('El nombre del artista es inválido.');
        }
        if (!this._genero || this._genero.trim().length === 0 || this._genero.length > 100) {
            throw new Error('El género musical es inválido.');
        }
        // Validar Contacto
        if (!this._contacto || this._contacto.trim().length === 0) {
            throw new Error('El contacto es requerido.');
        }
        // Validar País de Origen
        if (!this._paisOrigen || this._paisOrigen.trim().length === 0) {
            throw new Error('El país de origen es requerido.');
        }
        // Validar Fecha de Debut
        if (!(this._fechaDebut instanceof Date) || isNaN(this._fechaDebut.getTime())) {
            throw new Error('La fecha de debut es inválida.');
        }
        // Validar Usuario ID (si existe)
        if (this._usuarioId !== null && this._usuarioId !== undefined) {
            if (typeof this._usuarioId !== 'number' || this._usuarioId <= 0 || !Number.isInteger(this._usuarioId)) {
                throw new Error('El ID de usuario es inválido.');
            }
        }
    }
    /**
     * Valida si un nombre de artista es válido
     * @param nombre - Nombre a validar
     * @returns true si el nombre es válido, false en caso contrario
     */
    static validarNombre(nombre) {
        return typeof nombre === 'string' && nombre.trim().length > 0 && nombre.length <= 200;
    }
    /**
     * Valida si un género musical es válido
     * @param genero - Género a validar
     * @returns true si el género es válido, false en caso contrario
     */
    static validarGenero(genero) {
        return typeof genero === 'string' && genero.trim().length > 0 && genero.length <= 100;
    }
    // ==================== MÉTODOS DE NEGOCIO ====================
    /**
     * Verifica si el artista tiene información de contacto disponible
     * @returns true si tiene contacto, false en caso contrario
     */
    tieneContacto() {
        return this._contacto !== null &&
            this._contacto !== undefined &&
            this._contacto.trim().length > 0;
    }
    /**
     * Obtiene la información completa del artista en formato texto
     * @returns String con nombre, género y contacto (si existe)
     */
    getInformacionCompleta() {
        return `${this._nombre} - ${this._genero}${this.tieneContacto() ? ` (${this._contacto})` : ''}`;
    }
    /**
     * Verifica si el artista pertenece a un género específico
     * @param genero - Género a verificar
     * @returns true si el artista es de ese género (ignora mayúsculas/minúsculas)
     */
    esGenero(genero) {
        return this._genero.toLowerCase() === genero.toLowerCase();
    }
    /**
     * Obtiene solo las iniciales del nombre del artista
     * @returns Iniciales en mayúsculas
     */
    getIniciales() {
        return this._nombre
            .split(' ')
            .map((palabra) => palabra.charAt(0).toUpperCase())
            .join('');
    }
    /**
     * Verifica si el nombre del artista contiene una palabra específica
     * @param palabra - Palabra a buscar
     * @returns true si el nombre contiene la palabra
     */
    nombreContiene(palabra) {
        return this._nombre.toLowerCase().includes(palabra.toLowerCase());
    }
    /**
     * Verifica si el artista tiene un usuario asociado
     * @returns true si tiene usuarioId asignado
     */
    tieneUsuarioAsociado() {
        return this._usuarioId !== null && this._usuarioId !== undefined;
    }
    /**
     * Asocia el artista a un usuario
     * @param usuarioId - ID del usuario a asociar
     * @throws Error si el ID es inválido
     */
    asociarUsuario(usuarioId) {
        if (typeof usuarioId !== 'number' || usuarioId <= 0 || !Number.isInteger(usuarioId)) {
            throw new Error('El ID de usuario debe ser un número entero positivo');
        }
        this._usuarioId = usuarioId;
    }
    /**
     * Desasocia el artista del usuario
     */
    desasociarUsuario() {
        this._usuarioId = null;
    }
    /**
     * Verifica si el artista está asociado a un usuario específico
     * @param usuarioId - ID del usuario a verificar
     * @returns true si está asociado a ese usuario
     */
    estaAsociadoAUsuario(usuarioId) {
        return this._usuarioId === usuarioId;
    }
    // ==================== CONVERSIÓN DE DATOS ====================
    /**
     * Convierte el artista a un objeto plano para persistencia en BD
     * @returns Objeto con los datos del artista
     */
    toJSON() {
        return {
            id: this._id,
            nombre: this._nombre,
            genero: this._genero,
            contacto: this._contacto,
            paisOrigen: this._paisOrigen,
            fechaDebut: this._fechaDebut,
            disquera: this._disquera,
            usuarioId: this._usuarioId,
        };
    }
    /**
     * Crea una instancia de Artista desde datos de base de datos
     * @param data - Datos del artista desde la BD
     * @returns Nueva instancia de Artista
     */
    static fromDatabase(data) {
        return new Artista({
            id: data.id,
            nombre: data.nombre,
            genero: data.genero,
            contacto: data.contacto,
            paisOrigen: data.paisOrigen,
            fechaDebut: data.fechaDebut,
            disquera: data.disquera,
            usuarioId: data.usuarioId || data.usuario_id,
        });
    }
    /**
     * Crea una copia independiente del artista
     * @returns Nueva instancia con los mismos datos
     */
    clone() {
        return new Artista(this.toJSON());
    }
    /**
     * Convierte el artista a string representativo
     * @returns Representación en texto del artista
     */
    toString() {
        return this.getInformacionCompleta();
    }
    // ==================== MÉTODOS DE COMPARACIÓN ====================
    /**
     * Compara si dos artistas son iguales (por ID)
     * @param otro - Otro artista a comparar
     * @returns true si son el mismo artista
     */
    equals(otro) {
        return this._id !== undefined && this._id === otro._id;
    }
    /**
     * Verifica si el artista tiene un ID asignado
     * @returns true si el artista ha sido persistido en BD
     */
    estaPersistido() {
        return this._id !== undefined && this._id > 0;
    }
}
exports.Artista = Artista;
//# sourceMappingURL=Artista.js.map