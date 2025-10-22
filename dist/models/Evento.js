"use strict";
/**
 * Entidad Evento
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evento = void 0;
class Evento {
    constructor(data) {
        this._id = data.id;
        this._nombre = data.nombre;
        this._descripcion = data.descripcion || '';
        this._fecha = data.fecha instanceof Date ? data.fecha : new Date(data.fecha);
        this._ubicacion = data.ubicacion;
        this._organizadorId = data.organizadorId;
        this.validar();
    }
    // ==================== GETTERS ====================
    get id() {
        return this._id;
    }
    get nombre() {
        return this._nombre;
    }
    get descripcion() {
        return this._descripcion;
    }
    get fecha() {
        return this._fecha;
    }
    get ubicacion() {
        return this._ubicacion;
    }
    get organizadorId() {
        return this._organizadorId;
    }
    // ==================== SETTERS ====================
    set nombre(value) {
        if (!Evento.validarNombre(value)) {
            throw new Error('Nombre invalido');
        }
        this._nombre = value.trim();
    }
    set descripcion(value) {
        if (!Evento.validarDescripcion(value)) {
            throw new Error('Descripción invalida');
        }
        this._descripcion = value.trim();
    }
    set fecha(value) {
        const fecha = typeof value === 'string' ? new Date(value) : value;
        if (!Evento.validarFecha(fecha)) {
            throw new Error('Fecha invalida');
        }
        this._fecha = fecha;
    }
    set ubicacion(value) {
        if (!Evento.validarUbicacion(value)) {
            throw new Error('Ubicación invalida');
        }
        this._ubicacion = value.trim();
    }
    set organizadorId(value) {
        if (!Evento.validarId(value)) {
            throw new Error('ID de organizador inválido');
        }
        this._organizadorId = value;
    }
    // ==================== VALIDACIONES ====================
    validar() {
        if (!Evento.validarNombre(this._nombre)) {
            throw new Error('Nombre invalido');
        }
        if (!Evento.validarFecha(this._fecha)) {
            throw new Error('Fecha invalida');
        }
        if (!Evento.validarUbicacion(this._ubicacion)) {
            throw new Error('Ubicación invalida');
        }
        if (!Evento.validarDescripcion(this._descripcion)) {
            throw new Error('Descripción invalida');
        }
        if (!Evento.validarId(this._organizadorId)) {
            throw new Error('ID de organizador inválido');
        }
    }
    static validarNombre(nombre) {
        return typeof nombre === 'string' && nombre.trim().length > 0 && nombre.length <= 200;
    }
    static validarDescripcion(descripcion) {
        return typeof descripcion === 'string' && descripcion.trim().length > 0 && descripcion.length <= 500;
    }
    static validarFecha(fecha) {
        return fecha instanceof Date && !isNaN(fecha.getTime());
    }
    static validarUbicacion(ubicacion) {
        return typeof ubicacion === 'string' && ubicacion.trim().length > 0 && ubicacion.length <= 300;
    }
    static validarId(id) {
        return typeof id === 'number' && id > 0 && Number.isInteger(id);
    }
    // ==================== CONVERSORES ====================
    static fromDatabase(data) {
        return new Evento({
            id: data.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            fecha: data.fecha,
            ubicacion: data.ubicacion,
            organizadorId: data.organizadorId || data.organizador_id
        });
    }
    toJSON() {
        return {
            id: this._id,
            nombre: this._nombre,
            descripcion: this._descripcion,
            fecha: this._fecha,
            ubicacion: this._ubicacion,
            organizadorId: this._organizadorId
        };
    }
}
exports.Evento = Evento;
//# sourceMappingURL=Evento.js.map