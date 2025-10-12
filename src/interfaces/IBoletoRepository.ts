import { IBoleto } from '../models/Boleto';

export interface IBoletoRepository {
    crear(boleto: IBoleto): Promise<IBoleto>;
    obtenerPorId(id: number): Promise<IBoleto | null>;
    obtenerTodos(): Promise<IBoleto[]>;
    actualizar(id: number, boleto: IBoleto): Promise<IBoleto | null>;
    eliminar(id: number): Promise<boolean>;
    buscarPorEvento(eventoId: number): Promise<IBoleto[]>;
    eliminarPorEvento(eventoId: number): Promise<number>;
}