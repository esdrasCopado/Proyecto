import { ArtistaEvento } from "../models/ArtistaEvento";
import prisma from "../config/database";
import { IArtistaEventoRepository } from "../interfaces/IArtista-EventoRepository";
import { ca } from "zod/v4/locales";

export class ArtistaEventoRepository implements IArtistaEventoRepository {
    async save(artistaEvento: ArtistaEvento): Promise<ArtistaEvento> {
        try {
            const created = await prisma.artistaEvento.create({
                data: {
                    artistaId: artistaEvento.artistaId,
                    eventoId: artistaEvento.eventoId,
                    rol: artistaEvento.rol,
                    compensacion: artistaEvento.compensacion,
                    fechaConfirmacion: artistaEvento.fechaConfirmacion ? new Date(artistaEvento.fechaConfirmacion) : undefined
                }
            });
            return ArtistaEvento.fromDatabase(created);
        } catch (error : any) {
            if(error.code === 'P2002') {
                throw new Error("El artista ya está asociado a este evento: " + error.message);
            }
            if(error.code === 'P2003') {
                throw new Error("Clave foránea inválida (artistaId o eventoId no existen): " + error.message);
            }
            throw new Error("Error al guardar ArtistaEvento: " + error.message);
        }
    }
    async findById(id: number): Promise<ArtistaEvento | null> {
        try {
            const found = await prisma.artistaEvento.findUnique({
                where: { id }
            });
            return found ? ArtistaEvento.fromDatabase(found) : null;
        } catch (error : any) {
            throw new Error("Error al buscar ArtistaEvento: " + error.message);
        }
    }
    async update(artistaEvento: ArtistaEvento): Promise<ArtistaEvento> {
        try {
            const updated = await prisma.artistaEvento.update({
                where: { id: artistaEvento.id },
                data: {
                    artistaId: artistaEvento.artistaId,
                    eventoId: artistaEvento.eventoId,
                    rol: artistaEvento.rol,
                    compensacion: artistaEvento.compensacion,
                    fechaConfirmacion: artistaEvento.fechaConfirmacion ? new Date(artistaEvento.fechaConfirmacion) : undefined
                }
            });
            return ArtistaEvento.fromDatabase(updated);
        } catch (error : any) {
            throw new Error("Error al actualizar ArtistaEvento: " + error.message);
        }
    }
    async delete(id: number): Promise<void> {
        try {
            await prisma.artistaEvento.delete({
                where: { id }
            });
        } catch (error : any) {
            throw new Error("Error al eliminar ArtistaEvento: " + error.message);
        }
    }
    async findMany(): Promise<ArtistaEvento[]> {
        try {
            const found = await prisma.artistaEvento.findMany();
            return found.map(ArtistaEvento.fromDatabase);
        } catch (error : any) {
            throw new Error("Error al buscar ArtistaEvento: " + error.message);
        }
    }
    async findByArtistaId(artistaId: number): Promise<ArtistaEvento[]> {
        try {
            const found = await prisma.artistaEvento.findMany({
                where: { artistaId }
            });
            return found.map(ArtistaEvento.fromDatabase);
        } catch (error : any) {
            throw new Error("Error al buscar ArtistaEvento por artistaId: " + error.message);
        }
    }
    async findByEventoId(eventoId: number): Promise<ArtistaEvento[]> {
        try {
            const found = await prisma.artistaEvento.findMany({
                where: { eventoId }
            });
            return found.map(ArtistaEvento.fromDatabase);
        } catch (error : any) {
            throw new Error("Error al buscar ArtistaEvento por eventoId: " + error.message);
        }
    }
    
}