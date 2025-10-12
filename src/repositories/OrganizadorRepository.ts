import { IOrganizadorRepository } from '../interfaces/IOrganizadorRepository';
import { Organizador } from '../models/Organizador';
import  prisma  from '../config/database';

export class OrganizadorRepository implements IOrganizadorRepository {
    async create(organizador: Organizador): Promise<Organizador> {
        const { id, ...data } = organizador.toJSON();
        const createdOrganizador = await prisma.organizador.create({
            data,
        });
        return Organizador.fromDatabase(createdOrganizador);
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