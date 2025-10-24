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
    /**
     * Crea múltiples boletos en lote (para eventos con muchos boletos)
     * Usa createMany para optimizar la creación masiva
     */
    crearEnLote(boletos: IBoleto[]): Promise<number>;
}
//# sourceMappingURL=boletoRepository.d.ts.map