import { IArtistaRepository } from "../interfaces/IArtistaRepository";
import { Artista } from "../models/Artista";
import prisma from "../config/database"

export class ArtistaRepository implements IArtistaRepository {
    async save(artista: Artista): Promise<Artista> {
        try {
            const exist = await prisma.artista.findFirst({
                where: { nombre: artista.nombre }
            });
            if (exist) {
                throw new Error('El artista ya existe');
            }
            const newArtista = await prisma.artista.create({
                data: {
                    nombre: artista.nombre,
                    genero: artista.genero,
                    contacto: artista.contacto,
                    paisOrigen: artista.paisOrigen,
                    fechaDebut: artista.fechaDebut,
                    disquera: artista.disquera,
                }
            });
            return Artista.fromDatabase(newArtista);
        } catch (error: any) {
            throw new Error("Error al guardar el artista: " + error.message);
        }
    }
    async findMany(): Promise<Artista[]> {
        const artistas = await prisma.artista.findMany();
        return artistas.map(artista => Artista.fromDatabase(artista));
    }
    async findById(id: number): Promise<Artista | null> {
        const artista = await prisma.artista.findUnique({
            where: { id }
        });
        return artista ? Artista.fromDatabase(artista) : null;
    }
    async update(id: number, artista: Partial<Artista>): Promise<Artista | null> {
        try {
            const updatedArtista = await prisma.artista.update({
                where: { id },
                data: {
                    ...artista
                }
            });
            return Artista.fromDatabase(updatedArtista);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return null;
            }
            throw new Error("Error al actualizar el artista: " + error.message);
        }
    }
    async delete(id: number): Promise<void> {
        try {
            await prisma.artista.delete({
                where: { id }
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new Error('El artista no existe');
            }
            throw new Error("Error al eliminar el artista: " + error.message);
        }
    }

}