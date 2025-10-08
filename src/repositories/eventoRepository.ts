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
                },
            });
            return Evento.fromDatabase(newEvento);
        } catch (error) {
            throw new Error(`Error al guardar el evento: ${error}`);
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
                },
            });
            return Evento.fromDatabase(updatedEvento);
        } catch (error) {
            throw new Error(`Error al actualizar el evento: ${error}`);
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
            const eventos = await prisma.evento.findMany();
            return eventos.map(Evento.fromDatabase);
        } catch (error) {
            throw new Error(`Error al buscar eventos: ${error}`);
        }
    }
}