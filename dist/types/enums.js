"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolArtista = exports.EstadoOrden = exports.TipoBoleto = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ARTISTA"] = "ARTISTA";
    Role["ORGANIZADOR"] = "ORGANIZADOR";
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
var TipoBoleto;
(function (TipoBoleto) {
    TipoBoleto["VIP"] = "VIP";
    TipoBoleto["GENERAL"] = "GENERAL";
    TipoBoleto["PLATINO"] = "PLATINO";
    TipoBoleto["ORO"] = "ORO";
})(TipoBoleto || (exports.TipoBoleto = TipoBoleto = {}));
var EstadoOrden;
(function (EstadoOrden) {
    EstadoOrden["PENDIENTE"] = "PENDIENTE";
    EstadoOrden["PAGADO"] = "PAGADO";
    EstadoOrden["CANCELADO"] = "CANCELADO";
    EstadoOrden["REEMBOLSADO"] = "REEMBOLSADO";
})(EstadoOrden || (exports.EstadoOrden = EstadoOrden = {}));
var RolArtista;
(function (RolArtista) {
    RolArtista["HEADLINER"] = "HEADLINER";
    RolArtista["TELONERO"] = "TELONERO";
    RolArtista["INVITADO"] = "INVITADO";
    RolArtista["COLABORADOR"] = "COLABORADOR";
})(RolArtista || (exports.RolArtista = RolArtista = {}));
//# sourceMappingURL=enums.js.map