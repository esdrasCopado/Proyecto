import { IOrganizadorRepository } from '../interfaces/IOrganizadorRepository';
import { Organizador } from '../models/Organizador';
import  prisma  from '../config/database';

export class OrganizadorRepository implements IOrganizadorRepository {
    async create(organizador: Organizador): Promise<Organizador> {
        try {
            const { id, ...data } = organizador.toJSON();

            // Validar si el usuario ya es organizador (solo si usuarioId está definido)
            if (data.usuarioId && data.usuarioId > 0) {
                const existingOrganizador = await prisma.organizador.findUnique({
                    where: { usuarioId: data.usuarioId },
                });

                if (existingOrganizador) {
                    throw new Error('El usuario ya es un organizador');
                }

                // Validar que el usuario existe
                const usuarioExiste = await prisma.usuario.findUnique({
                    where: { id: data.usuarioId },
                });

                if (!usuarioExiste) {
                    throw new Error('El usuario especificado no existe');
                }
            }

            // Crear el organizador
            const createdOrganizador = await prisma.organizador.create({
                data,
            });
            return Organizador.fromDatabase(createdOrganizador);
        } catch (error: any) {
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
    async findById(id: number): Promise<Organizador | null> {
        const organizador = await prisma.organizador.findUnique({
            where: { id },
        });
        return organizador ? Organizador.fromDatabase(organizador) : null;
    }
    async update(organizador: Organizador): Promise<Organizador | null> {
        const { id, ...data } = organizador.toJSON();
        const updatedOrganizador = await prisma.organizador.update({
            where: { id },
            data,
        });
        return Organizador.fromDatabase(updatedOrganizador);
    }
    async delete(id: number): Promise<boolean> {
        const deleted = await prisma.organizador.delete({
            where: { id },
        });
        return !!deleted;
    }

};