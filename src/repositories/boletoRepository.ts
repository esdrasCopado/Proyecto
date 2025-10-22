import { IBoleto } from '../models/Boleto';
import { Boleto } from '../models/Boleto';
import prisma from '../config/database';
import { TipoBoleto } from '../types/enums';
import { IBoletoRepository } from '@/interfaces/IBoletoRepository';

export class BoletoRepository implements IBoletoRepository {
    private toBoletoData(boleto: IBoleto) {
        return {
            precio: boleto.precio,
            tipo: boleto.tipo as TipoBoleto,
            disponible: boleto.disponible,
            eventoId: boleto.eventoId,
            usuarioId: boleto.usuarioId || null,
        };
    }

    async crear(boleto: IBoleto): Promise<IBoleto> {
        try {
            const boletoCreado = await prisma.boleto.create({
                data: this.toBoletoData(boleto)
            });
            return Boleto.fromDatabase(boletoCreado);
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('El boleto ya existe (violación de restricción única)');
            }
            if (error.code === 'P2003') {
                throw new Error('El evento o usuario especificado no existe');
            }
            throw new Error(`Error al crear el boleto: ${error.message}`);
        }
    }
    async obtenerPorId(id: number): Promise<IBoleto | null> {
        try {
            const boleto = await prisma.boleto.findUnique({
                where: { id }
            });
            return boleto ? Boleto.fromDatabase(boleto) : null;
        } catch (error: any) {
            throw new Error(`Error al obtener el boleto: ${error.message}`);
        }
    }
    async obtenerTodos(): Promise<IBoleto[]> {
        try {
            const boletos = await prisma.boleto.findMany();
            return boletos.map(Boleto.fromDatabase);
        } catch (error: any) {
            throw new Error(`Error al obtener los boletos: ${error.message}`);
        }
    }
    async actualizar(id: number, boleto: IBoleto): Promise<IBoleto | null> {
        try {
            const boletoActualizado = await prisma.boleto.update({
                where: { id },
                data: this.toBoletoData(boleto)
            });
            return Boleto.fromDatabase(boletoActualizado);
        } catch (error: any) {
            if (error.code === 'P2025') {
                return null; // Boleto no encontrado
            }
            if (error.code === 'P2003') {
                throw new Error('El evento o usuario especificado no existe');
            }
            throw new Error(`Error al actualizar el boleto: ${error.message}`);
        }
    }
    async eliminar(id: number): Promise<boolean> {
        try {
            await prisma.boleto.delete({
                where: { id }
            });
            return true;
        } catch (error: any) {
            if (error.code === 'P2025') {
                return false; // Boleto no encontrado
            }
            throw new Error(`Error al eliminar el boleto: ${error.message}`);
        }
    }
    async buscarPorEvento(eventoId: number): Promise<IBoleto[]> {
        try {
            const boletos = await prisma.boleto.findMany({
                where: { eventoId }
            });
            return boletos.map(Boleto.fromDatabase);
        } catch (error: any) {
            throw new Error(`Error al buscar boletos por evento: ${error.message}`);
        }
    }
    async eliminarPorEvento(eventoId: number): Promise<number> {
        try {
            const result = await prisma.boleto.deleteMany({
                where: { eventoId }
            });
            return result.count;
        } catch (error: any) {
            throw new Error(`Error al eliminar boletos por evento: ${error.message}`);
        }
    }
}

