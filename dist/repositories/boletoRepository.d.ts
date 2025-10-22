import { IBoleto } from '../models/Boleto';
import { IBoletoRepository } from '@/interfaces/IBoletoRepository';
export declare class BoletoRepository implements IBoletoRepository {
    private toBoletoData;
    crear(boleto: IBoleto): Promise<IBoleto>;
    obtenerPorId(id: number): Promise<IBoleto | null>;
    obtenerTodos(): Promise<IBoleto[]>;
    actualizar(id: number, boleto: IBoleto): Promise<IBoleto | null>;
    eliminar(id: number): Promise<boolean>;
    buscarPorEvento(eventoId: number): Promise<IBoleto[]>;
    eliminarPorEvento(eventoId: number): Promise<number>;
}
//# sourceMappingURL=boletoRepository.d.ts.map