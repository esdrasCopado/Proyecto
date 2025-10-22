"use strict";
/**
 * Entidad ArtistaEvento
 * Representa la relación entre un artista y un evento
 * Define el rol y la compensación del artista en un evento específico
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistaEvento = void 0;
const enums_1 = require("../types/enums");
class ArtistaEvento {
    constructor(data) {
        this._id = data.id;
        this._artistaId = data.artistaId;
        this._eventoId = data.eventoId;
        this._rol = data.rol || enums_1.RolArtista.INVITADO;
        this._compensacion = data.compensacion || 0;
        if (data.fechaConfirmacion) {
            this._fechaConfirmacion = typeof data.fechaConfirmacion === 'string'
                ? new Date(data.fechaConfirmacion)
                : data.fechaConfirmacion;
        }
        else {
            this._fechaConfirmacion = new Date();
        }
        this.validar();
    }
    // ==================== GETTERS ====================
    get id() {
        return this._id;
    }
    get artistaId() {
        return this._artistaId;
    }
    get eventoId() {
        return this._eventoId;
    }
    get rol() {
        return this._rol;
    }
    get compensacion() {
        return this._compensacion;
    }
    get fechaConfirmacion() {
        return this._fechaConfirmacion;
    }
    // ==================== SETTERS ====================
    set artistaId(value) {
        if (!ArtistaEvento.validarId(value)) {
            throw new Error('ID de artista invalido');
        }
        this._artistaId = value;
    }
    set eventoId(value) {
        if (!ArtistaEvento.validarId(value)) {
            throw new Error('ID de evento invalido');
        }
        this._eventoId = value;
    }
    set rol(value) {
        this._rol = value;
    }
    set compensacion(value) {
        if (!ArtistaEvento.validarCompensacion(value)) {
            throw new Error('Compensacion invalida');
        }
        this._compensacion = value;
    }
    set fechaConfirmacion(value) {
        const fecha = typeof value === 'string' ? new Date(value) : value;
        if (!ArtistaEvento.validarFecha(fecha)) {
            throw new Error('Fecha de confirmacion invalida');
        }
        this._fechaConfirmacion = fecha;
    }
    // ==================== VALIDACIONES ====================
    validar() {
        if (!ArtistaEvento.validarId(this._artistaId)) {
            throw new Error('ID de artista invalido');
        }
        if (!ArtistaEvento.validarId(this._eventoId)) {
            throw new Error('ID de evento invalido');
        }
        if (!ArtistaEvento.validarCompensacion(this._compensacion)) {
            throw new Error('Compensacion invalida');
        }
        if (!ArtistaEvento.validarFecha(this._fechaConfirmacion)) {
            throw new Error('Fecha de confirmacion invalida');
        }
    }
    static validarId(id) {
        return typeof id === 'number' && id > 0 && Number.isInteger(id);
    }
    static validarCompensacion(compensacion) {
        return typeof compensacion === 'number' && compensacion >= 0;
    }
    static validarFecha(fecha) {
        if (!(fecha instanceof Date)) {
            return false;
        }
        return !isNaN(fecha.getTime());
    }
    // ==================== MÉTODOS DE NEGOCIO ====================
    /**
     * Verifica si el artista es el headliner (artista principal)
     * @returns true si el rol es HEADLINER
     */
    esHeadliner() {
        return this._rol === enums_1.RolArtista.HEADLINER;
    }
    /**
     * Verifica si el artista es telonero (acto de apertura)
     * @returns true si el rol es TELONERO
     */
    esTelonero() {
        return this._rol === enums_1.RolArtista.TELONERO;
    }
    /**
     * Verifica si el artista es invitado
     * @returns true si el rol es INVITADO
     */
    esInvitado() {
        return this._rol === enums_1.RolArtista.INVITADO;
    }
    /**
     * Verifica si el artista es colaborador
     * @returns true si el rol es COLABORADOR
     */
    esColaborador() {
        return this._rol === enums_1.RolArtista.COLABORADOR;
    }
    tieneCompensacion() {
        return this._compensacion > 0;
    }
    getCompensacionFormateada() {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
        }).format(this._compensacion);
    }
    getFechaConfirmacionFormateada() {
        return this._fechaConfirmacion.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    getDiasDesdeConfirmacion() {
        const hoy = new Date();
        const diferencia = hoy.getTime() - this._fechaConfirmacion.getTime();
        return Math.floor(diferencia / (1000 * 3600 * 24));
    }
    esConfirmacionReciente() {
        return this.getDiasDesdeConfirmacion() <= 7;
    }
    /**
     * Obtiene el rol formateado en español
     * @returns Nombre del rol en español
     */
    getRolFormateado() {
        const roles = {
            [enums_1.RolArtista.HEADLINER]: 'Headliner',
            [enums_1.RolArtista.TELONERO]: 'Telonero',
            [enums_1.RolArtista.INVITADO]: 'Invitado',
            [enums_1.RolArtista.COLABORADOR]: 'Colaborador'
        };
        return roles[this._rol];
    }
    // ==================== CONVERSIÓN DE DATOS ====================
    toJSON() {
        return {
            id: this._id,
            artistaId: this._artistaId,
            eventoId: this._eventoId,
            rol: this._rol,
            compensacion: this._compensacion,
            fechaConfirmacion: this._fechaConfirmacion,
        };
    }
    static fromDatabase(data) {
        return new ArtistaEvento({
            id: data.id,
            artistaId: data.artista_id || data.artistaId,
            eventoId: data.evento_id || data.eventoId,
            rol: data.rol,
            compensacion: data.compensacion ? Number(data.compensacion) : 0,
            fechaConfirmacion: data.fecha_confirmacion || data.fechaConfirmacion,
        });
    }
    clone() {
        return new ArtistaEvento(this.toJSON());
    }
    toString() {
        return `Artista ${this._artistaId} - Evento ${this._eventoId} (${this._rol})`;
    }
    // ==================== MÉTODOS DE COMPARACIÓN ====================
    equals(otro) {
        return this._id !== undefined && this._id === otro._id;
    }
    mismosArtistaYEvento(otro) {
        return this._artistaId === otro._artistaId && this._eventoId === otro._eventoId;
    }
    estaPersistido() {
        return this._id !== undefined && this._id > 0;
    }
}
exports.ArtistaEvento = ArtistaEvento;
//# sourceMappingURL=ArtistaEvento.js.map