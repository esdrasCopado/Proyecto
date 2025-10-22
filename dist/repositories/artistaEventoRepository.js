"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistaEventoRepository = void 0;
const ArtistaEvento_1 = require("../models/ArtistaEvento");
const enums_1 = require("../types/enums");
const database_1 = __importDefault(require("../config/database"));
class ArtistaEventoRepository {
    async create(artistaEvento) {
        try {
            const created = await database_1.default.artistaEvento.create({
                data: {
                    artistaId: artistaEvento.artistaId,
                    eventoId: artistaEvento.eventoId,
                    rol: artistaEvento.rol,
                    compensacion: artistaEvento.compensacion,
                    fechaConfirmacion: artistaEvento.fechaConfirmacion ? new Date(artistaEvento.fechaConfirmacion) : undefined
                }
            });
            return ArtistaEvento_1.ArtistaEvento.fromDatabase(created);
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new Error("El artista ya está asociado a este evento: " + error.message);
            }
            if (error.code === 'P2003') {
                throw new Error("Clave foránea inválida (artistaId o eventoId no existen): " + error.message);
            }
            throw new Error("Error al guardar ArtistaEvento: " + error.message);
        }
    }
    async findById(id) {
        try {
            const found = await database_1.default.artistaEvento.findUnique({
                where: { id }
            });
            return found ? ArtistaEvento_1.ArtistaEvento.fromDatabase(found) : null;
        }
        catch (error) {
            throw new Error("Error al buscar ArtistaEvento: " + error.message);
        }
    }
    async update(artistaEvento) {
        try {
            const updated = await database_1.default.artistaEvento.update({
                where: { id: artistaEvento.id },
                data: {
                    artistaId: artistaEvento.artistaId,
                    eventoId: artistaEvento.eventoId,
                    rol: artistaEvento.rol,
                    compensacion: artistaEvento.compensacion,
                    fechaConfirmacion: artistaEvento.fechaConfirmacion ? new Date(artistaEvento.fechaConfirmacion) : undefined
                }
            });
            return ArtistaEvento_1.ArtistaEvento.fromDatabase(updated);
        }
        catch (error) {
            throw new Error("Error al actualizar ArtistaEvento: " + error.message);
        }
    }
    async delete(id) {
        try {
            await database_1.default.artistaEvento.delete({
                where: { id }
            });
        }
        catch (error) {
            throw new Error("Error al eliminar ArtistaEvento: " + error.message);
        }
    }
    async findMany() {
        try {
            const found = await database_1.default.artistaEvento.findMany();
            return found.map(ArtistaEvento_1.ArtistaEvento.fromDatabase);
        }
        catch (error) {
            throw new Error("Error al buscar ArtistaEvento: " + error.message);
        }
    }
    async findByArtistaId(artistaId) {
        try {
            const found = await database_1.default.artistaEvento.findMany({
                where: { artistaId }
            });
            return found.map(ArtistaEvento_1.ArtistaEvento.fromDatabase);
        }
        catch (error) {
            throw new Error("Error al buscar ArtistaEvento por artistaId: " + error.message);
        }
    }
    async findByEventoId(eventoId) {
        try {
            const found = await database_1.default.artistaEvento.findMany({
                where: { eventoId }
            });
            return found.map(ArtistaEvento_1.ArtistaEvento.fromDatabase);
        }
        catch (error) {
            throw new Error("Error al buscar ArtistaEvento por eventoId: " + error.message);
        }
    }
    async findByRol(rol) {
        try {
            const found = await database_1.default.artistaEvento.findMany({
                where: { rol }
            });
            return found.map(ArtistaEvento_1.ArtistaEvento.fromDatabase);
        }
        catch (error) {
            throw new Error("Error al buscar ArtistaEvento por rol: " + error.message);
        }
    }
    async findHeadliners() {
        return this.findByRol(enums_1.RolArtista.HEADLINER);
    }
    async findByEventoIdAndRol(eventoId, rol) {
        try {
            const found = await database_1.default.artistaEvento.findMany({
                where: {
                    eventoId,
                    rol
                }
            });
            return found.map(ArtistaEvento_1.ArtistaEvento.fromDatabase);
        }
        catch (error) {
            throw new Error("Error al buscar ArtistaEvento por eventoId y rol: " + error.message);
        }
    }
}
exports.ArtistaEventoRepository = ArtistaEventoRepository;
//# sourceMappingURL=artistaEventoRepository.js.map