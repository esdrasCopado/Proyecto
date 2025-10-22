"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organizador = void 0;
class Organizador {
    constructor(data) {
        this._id = data.id;
        this._nombre = data.nombre;
        this._contacto = data.contacto;
        this._pais = data.pais;
        this._fundacion = data.fundacion;
        this._usuarioId = data.usuarioId;
    }
    get id() {
        return this._id;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(value) {
        this._nombre = value;
    }
    get contacto() {
        return this._contacto;
    }
    set contacto(value) {
        this._contacto = value;
    }
    get pais() {
        return this._pais;
    }
    set pais(value) {
        this._pais = value;
    }
    get fundacion() {
        return this._fundacion;
    }
    set fundacion(value) {
        this._fundacion = value;
    }
    get usuarioId() {
        return this._usuarioId;
    }
    set usuarioId(value) {
        this._usuarioId = value;
    }
    toJSON() {
        return {
            id: this._id ?? 0,
            nombre: this._nombre,
            contacto: this._contacto,
            pais: this._pais,
            fundacion: this._fundacion,
            usuarioId: this._usuarioId,
        };
    }
    static fromDatabase(data) {
        return new Organizador({
            id: data.id,
            nombre: data.nombre,
            contacto: data.contacto,
            pais: data.pais,
            fundacion: new Date(data.fundacion),
            usuarioId: data.usuarioId,
        });
    }
}
exports.Organizador = Organizador;
//# sourceMappingURL=Organizador.js.map