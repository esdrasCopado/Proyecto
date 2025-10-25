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
        try {
            const { id, ...data } = organizador.toJSON();
            // Validar si el usuario ya es organizador (solo si usuarioId está definido)
            if (data.usuarioId && data.usuarioId > 0) {
                const existingOrganizador = await database_1.default.organizador.findUnique({
                    where: { usuarioId: data.usuarioId },
                });
                if (existingOrganizador) {
                    throw new Error('El usuario ya es un organizador');
                }
                // Validar que el usuario existe
                const usuarioExiste = await database_1.default.usuario.findUnique({
                    where: { id: data.usuarioId },
                });
                if (!usuarioExiste) {
                    throw new Error('El usuario especificado no existe');
                }
            }
            // Crear el organizador
            const createdOrganizador = await database_1.default.organizador.create({
                data,
            });
            return Organizador_1.Organizador.fromDatabase(createdOrganizador);
        }
        catch (error) {
            // Manejar errores específicos de Prisma
            if (error.code === 'P2002') {
                throw new Error('El usuario ya es un organizador');
            }
            if (error.code === 'P2003') {
                throw new Error('El usuario especificado no existe');
            }
            // Re-lanzar el error si ya tiene un mensaje personalizado
            throw error;
        }
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