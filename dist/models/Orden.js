"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orden = void 0;
const enums_1 = require("../types/enums");
class Orden {
    constructor(data) {
        this._id = data.id;
        this._total = data.total;
        this._fechaCompra = data.fechaCompra;
        this._usuarioId = data.usuarioId;
        this._boletos = data.boletos;
        this._estado = data.estado;
        this.validar();
    }
    // ==================== GETTERS ====================
    get id() {
        return this._id;
    }
    get total() {
        return this._total;
    }
    get fechaCompra() {
        return this._fechaCompra;
    }
    get usuarioId() {
        return this._usuarioId;
    }
    get boletos() {
        return this._boletos;
    }
    get estado() {
        return this._estado;
    }
    // ==================== SETTERS ====================
    set total(value) {
        if (!Orden.validarTotal(value)) {
            throw new Error('Total inválido');
        }
        this._total = value;
    }
    set fechaCompra(value) {
        if (!(value instanceof Date) || isNaN(value.getTime())) {
            throw new Error('Fecha de compra inválida');
        }
        this._fechaCompra = value;
    }
    set usuarioId(value) {
        if (!Orden.validarUsuarioId(value)) {
            throw new Error('ID de usuario inválido');
        }
        this._usuarioId = value;
    }
    set boletos(value) {
        if (!Array.isArray(value) || value.some(id => !Orden.validarBoletoId(id))) {
            throw new Error('IDs de boletos inválidos');
        }
        this._boletos = value;
    }
    // ==================== VALIDACIONES ====================
    validar() {
        if (!Orden.validarTotal(this._total)) {
            throw new Error('Total inválido');
        }
        if (!(this._fechaCompra instanceof Date) || isNaN(this._fechaCompra.getTime())) {
            throw new Error('Fecha de compra inválida');
        }
        if (!Orden.validarUsuarioId(this._usuarioId)) {
            throw new Error('ID de usuario inválido');
        }
        if (!Array.isArray(this._boletos) || this._boletos.some(id => !Orden.validarBoletoId(id))) {
            throw new Error('IDs de boletos inválidos');
        }
        if (!Object.values(enums_1.EstadoOrden).includes(this._estado)) {
            throw new Error('Estado de orden inválido');
        }
    }
    static validarTotal(total) {
        return typeof total === 'number' && total >= 0 && !isNaN(total);
    }
    static validarUsuarioId(id) {
        return Number.isInteger(id) && id > 0;
    }
    static validarBoletoId(id) {
        return Number.isInteger(id) && id > 0;
    }
    // conversión de datos
    toJSON() {
        return {
            id: this._id,
            total: this._total,
            fechaCompra: this._fechaCompra,
            usuarioId: this._usuarioId,
            boletos: this._boletos,
            estado: this._estado,
        };
    }
    static fromDatabase(data) {
        return new Orden({
            id: data.id,
            total: Number(data.total),
            fechaCompra: new Date(data.fechaCompra),
            usuarioId: data.usuarioId || data.usuario_id,
            boletos: Array.isArray(data.boletos) ? data.boletos.map((b) => Number(b)) : [],
            estado: data.estado,
        });
    }
    clone() {
        return new Orden(this.toJSON());
    }
    toString() {
        return `Orden #${this._id} - Total: ${this._total} - Fecha: ${this._fechaCompra.toISOString()} - Usuario ID: ${this._usuarioId} - Estado: ${this._estado}`;
    }
}
exports.Orden = Orden;
//# sourceMappingURL=Orden.js.map