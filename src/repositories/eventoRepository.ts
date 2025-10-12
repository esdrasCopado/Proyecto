import { Evento } from "../models/Evento";
import { IEventoRepository } from "../interfaces/IEventoRepository";
import prisma from "../config/database";

export class EventoRepository implements IEventoRepository {
    async save(evento: Evento): Promise<Evento> {
        try {
            const newEvento = await prisma.evento.create({
                data: {
                    nombre: evento.nombre,
                    descripcion: evento.descripcion,
                    fecha: evento.fecha,
                    ubicacion: evento.ubicacion,
                    organizadorId: evento.organizadorId,
                },
            });
            return Evento.fromDatabase(newEvento);
        } catch (error: any) {
            if (error.code === 'P2003') {
                throw new Error('Organizador no existe');
            }
            throw new Error(`Error al guardar el evento: ${error.message}`);
        }
    }
    async findById(id: number): Promise<Evento | null> {
        try {
            const evento = await prisma.evento.findUnique({
                where: { id },
            });
            return evento ? Evento.fromDatabase(evento) : null;
        } catch (error) {
            throw new Error(`Error al buscar el evento: ${error}`);
        }
    }
    async update(evento: Evento): Promise<Evento> {
        try {
            const updatedEvento = await prisma.evento.update({
                where: { id: evento.id },
                data: {
                    nombre: evento.nombre,
                    descripcion: evento.descripcion,
                    fecha: evento.fecha,
                    ubicacion: evento.ubicacion,
                    organizadorId: evento.organizadorId,
                },
            });
            return Evento.fromDatabase(updatedEvento);
        } catch (error: any) {
            if (error.code === 'P2003') {
                throw new Error('Organizador no existe');
            }
            if (error.code === 'P2025') {
                throw new Error('Evento no encontrado');
            }
            throw new Error(`Error al actualizar el evento: ${error.message}`);
        }
    }
    async delete(id: number): Promise<void> {
        try {
            await prisma.evento.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error(`Error al eliminar el evento: ${error}`);
        }
    }
    async findMany(): Promise<Evento[]> {
        try {
            const eventos = await prisma.evento.findMany({
                orderBy: {
                    fecha: 'asc'
                }
            });
            return eventos.map(Evento.fromDatabase);
        } catch (error) {
            throw new Error(`Error al buscar eventos: ${error}`);
        }
    }

    async findByOrganizadorId(organizadorId: number): Promise<Evento[]> {
        try {
            const eventos = await prisma.evento.findMany({
                where: { organizadorId },
                orderBy: {
                    fecha: 'desc'
                }
            });
            return eventos.map(Evento.fromDatabase);
        } catch (error: any) {
            throw new Error(`Error al buscar eventos por organizador: ${error.message}`);
        }
    }

    async findByFechaRange(fechaInicio: Date, fechaFin: Date): Promise<Evento[]> {
        try {
            const eventos = await prisma.evento.findMany({
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
            return eventos.map(Evento.fromDatabase);
        } catch (error: any) {
            throw new Error(`Error al buscar eventos por rango de fecha: ${error.message}`);
        }
    }

    async findProximos(limite?: number): Promise<Evento[]> {
        try {
            const eventos = await prisma.evento.findMany({
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
            return eventos.map(Evento.fromDatabase);
        } catch (error: any) {
            throw new Error(`Error al buscar eventos próximos: ${error.message}`);
        }
    }

    async findPasados(limite?: number): Promise<Evento[]> {
        try {
            const eventos = await prisma.evento.findMany({
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
            return eventos.map(Evento.fromDatabase);
        } catch (error: any) {
            throw new Error(`Error al buscar eventos pasados: ${error.message}`);
        }
    }

    async count(): Promise<number> {
        try {
            return await prisma.evento.count();
        } catch (error: any) {
            throw new Error(`Error al contar eventos: ${error.message}`);
        }
    }
}