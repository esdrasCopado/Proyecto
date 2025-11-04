import { IOrden } from "../models/Orden";
import { IOrdenRepository } from "../interfaces/IOrdenRepository";
import { EstadoOrden } from "../types/enums";
export declare class OrdenRepository implements IOrdenRepository {
    /**
     * Convierte un IOrden a datos para Prisma
     * Nota: fecha se mapea automáticamente, no se incluye fechaCompra en el data
     */
    private toOrdenData;
    /**
     * Crea una nueva orden con boletos asociados
     */
    createOrden(orden: IOrden): Promise<IOrden>;
    /**
     * Obtiene una orden por ID con sus relaciones
     */
    getOrdenById(id: number): Promise<IOrden | null>;
    /**
     * Actualiza una orden (principalmente el estado)
     */
    updateOrden(orden: IOrden): Promise<IOrden>;
    /**
     * Elimina una orden
     */
    deleteOrden(id: number): Promise<void>;
    /**
     * Lista todas las ordenes
     */
    listOrdenes(): Promise<IOrden[]>;
    /**
     * Obtiene ordenes por usuario
     */
    getOrdenesByUsuario(usuarioId: number): Promise<IOrden[]>;
    /**
     * Obtiene ordenes por estado
     */
    getOrdenesByEstado(estado: EstadoOrden): Promise<IOrden[]>;
    /**
     * Asigna boletos a una orden
     * Actualiza cada boleto con el ordenId, usuarioId y marca como no disponible
     */
    asignarBoletos(ordenId: number, boletoIds: number[]): Promise<IOrden>;
}
//# sourceMappingURL=OrdenRepository.d.ts.map