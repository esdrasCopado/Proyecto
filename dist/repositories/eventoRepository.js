"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoRepository = void 0;
const Evento_1 = require("../models/Evento");
const database_1 = __importDefault(require("../config/database"));
class EventoRepository {
    async save(evento) {
        try {
            const newEvento = await database_1.default.evento.create({
                data: {
                    nombre: evento.nombre,
                    descripcion: evento.descripcion,
                    fecha: evento.fecha,
                    ubicacion: evento.ubicacion,
                    organizadorId: evento.organizadorId,
                    imagenUrl: evento.imagenUrl || null,
                },
            });
            return Evento_1.Evento.fromDatabase(newEvento);
        }
        catch (error) {
            if (error.code === 'P2003') {
                throw new Error('Organizador no existe');
            }
            throw new Error(`Error al guardar el evento: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const evento = await database_1.default.evento.findUnique({
                where: { id },
            });
            return evento ? Evento_1.Evento.fromDatabase(evento) : null;
        }
        catch (error) {
            throw new Error(`Error al buscar el evento: ${error}`);
        }
    }
    async update(evento) {
        try {
            const updatedEvento = await database_1.default.evento.update({
                where: { id: evento.id },
                data: {
                    nombre: evento.nombre,
                    descripcion: evento.descripcion,
                    fecha: evento.fecha,
                    ubicacion: evento.ubicacion,
                    organizadorId: evento.organizadorId,
                    imagenUrl: evento.imagenUrl || null,
                },
            });
            return Evento_1.Evento.fromDatabase(updatedEvento);
        }
        catch (error) {
            if (error.code === 'P2003') {
                throw new Error('Organizador no existe');
            }
            if (error.code === 'P2025') {
                throw new Error('Evento no encontrado');
            }
            throw new Error(`Error al actualizar el evento: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            await database_1.default.evento.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new Error(`Error al eliminar el evento: ${error}`);
        }
    }
    async findMany() {
        try {
            const eventos = await database_1.default.evento.findMany({
                orderBy: {
                    fecha: 'asc'
                }
            });
            return eventos.map(Evento_1.Evento.fromDatabase);
        }
        catch (error) {
            throw new Error(`Error al buscar eventos: ${error}`);
        }
    }
    async findByOrganizadorId(organizadorId) {
        try {
            const eventos = await database_1.default.evento.findMany({
                where: { organizadorId },
                orderBy: {
                    fecha: 'desc'
                }
            });
            return eventos.map(Evento_1.Evento.fromDatabase);
        }
        catch (error) {
            throw new Error(`Error al buscar eventos por organizador: ${error.message}`);
        }
    }
    async findByFechaRange(fechaInicio, fechaFin) {
        try {
            const eventos = await database_1.default.evento.findMany({
                where: {
                    fecha: {
                        gte: fechaInicio,
                        lte: fechaFin
                    }
                },
                orderBy: {
                    fecha: 'asc'
                }
            });
            return eventos.map(Evento_1.Evento.fromDatabase);
        }
        catch (error) {
            throw new Error(`Error al buscar eventos por rango de fecha: ${error.message}`);
        }
    }
    async findProximos(limite) {
        try {
            const eventos = await database_1.default.evento.findMany({
                where: {
                    fecha: {
                        gte: new Date()
                    }
                },
                orderBy: {
                    fecha: 'asc'
                },
                take: limite
            });
            return eventos.map(Evento_1.Evento.fromDatabase);
        }
        catch (error) {
            throw new Error(`Error al buscar eventos próximos: ${error.message}`);
        }
    }
    async findPasados(limite) {
        try {
            const eventos = await database_1.default.evento.findMany({
                where: {
                    fecha: {
                        lt: new Date()
                    }
                },
                orderBy: {
                    fecha: 'desc'
                },
                take: limite
            });
            return eventos.map(Evento_1.Evento.fromDatabase);
        }
        catch (error) {
            throw new Error(`Error al buscar eventos pasados: ${error.message}`);
        }
    }
    async count() {
        try {
            return await database_1.default.evento.count();
        }
        catch (error) {
            throw new Error(`Error al contar eventos: ${error.message}`);
        }
    }
}
exports.EventoRepository = EventoRepository;
//# sourceMappingURL=EventoRepository.js.map