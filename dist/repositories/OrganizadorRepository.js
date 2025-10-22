"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizadorRepository = void 0;
const Organizador_1 = require("../models/Organizador");
const database_1 = __importDefault(require("../config/database"));
class OrganizadorRepository {
    async create(organizador) {
        const { id, ...data } = organizador.toJSON();
        const createdOrganizador = await database_1.default.organizador.create({
            data,
        });
        return Organizador_1.Organizador.fromDatabase(createdOrganizador);
    }
    async findById(id) {
        const organizador = await database_1.default.organizador.findUnique({
            where: { id },
        });
        return organizador ? Organizador_1.Organizador.fromDatabase(organizador) : null;
    }
    async update(organizador) {
        const { id, ...data } = organizador.toJSON();
        const updatedOrganizador = await database_1.default.organizador.update({
            where: { id },
            data,
        });
        return Organizador_1.Organizador.fromDatabase(updatedOrganizador);
    }
    async delete(id) {
        const deleted = await database_1.default.organizador.delete({
            where: { id },
        });
        return !!deleted;
    }
}
exports.OrganizadorRepository = OrganizadorRepository;
;
//# sourceMappingURL=OrganizadorRepository.js.map