import { IBoleto } from '../models/Boleto';
import { Boleto } from '../models/Boleto';
import prisma from '../config/database';
import { TipoBoleto } from '../types/enums';
import { IBoletoRepository } from '@/interfaces/IBoletoRepository';

export class BoletoRepository implements IBoletoRepository {
    crear(boleto: IBoleto): Promise<IBoleto> {
        throw new Error('Method not implemented.');
    }
    obtenerPorId(id: number): Promise<IBoleto | null> {
        throw new Error('Method not implemented.');
    }
    obtenerTodos(): Promise<IBoleto[]> {
        throw new Error('Method not implemented.');
    }
    actualizar(id: number, boleto: IBoleto): Promise<IBoleto | null> {
        throw new Error('Method not implemented.');
    }
    eliminar(id: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    buscarPorEvento(eventoId: number): Promise<IBoleto[]> {
        throw new Error('Method not implemented.');
    }
    eliminarPorEvento(eventoId: number): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

