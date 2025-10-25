import { IOrden } from "../models/Orden";
import { EstadoOrden } from "../types/enums";
export declare class OrdenService {
    private ordenRepository;
    constructor();
    /**
     * Crea una nueva orden
     * Calcula el total automáticamente basado en los boletos
     */
    crearOrden(ordenData: {
        usuarioId: number;
        boletoIds: number[];
    }): Promise<IOrden>;
    /**
     * Obtiene una orden por ID
     */
    obtenerOrdenPorId(id: number): Promise<IOrden | null>;
    /**
     * Obtiene todas las órdenes
     */
    obtenerTodasLasOrdenes(): Promise<IOrden[]>;
    /**
     * Obtiene órdenes de un usuario
     */
    obtenerOrdenesPorUsuario(usuarioId: number): Promise<IOrden[]>;
    /**
     * Obtiene órdenes por estado
     */
    obtenerOrdenesPorEstado(estado: EstadoOrden): Promise<IOrden[]>;
    /**
     * Actualiza el estado de una orden
     */
    actualizarEstadoOrden(id: number, nuevoEstado: EstadoOrden): Promise<IOrden>;
    /**
     * Marca una orden como pagada
     */
    marcarComoPagada(id: number): Promise<IOrden>;
    /**
     * Cancela una orden
     * Libera los boletos asociados
     */
    cancelarOrden(id: number): Promise<IOrden>;
    /**
     * Procesa un reembolso para una orden pagada
     * Libera los boletos asociados
     */
    reembolsarOrden(id: number): Promise<IOrden>;
    /**
     * Elimina una orden
     * Solo se pueden eliminar órdenes en estado PENDIENTE o CANCELADO
     */
    eliminarOrden(id: number): Promise<void>;
    /**
     * Obtiene estadísticas de órdenes
     */
    obtenerEstadisticas(): Promise<{
        total: number;
        pendientes: number;
        pagadas: number;
        canceladas: number;
        reembolsadas: number;
        totalRecaudado: number;
    }>;
    /**
     * Valida que la transición de estado sea válida
     */
    private validarTransicionEstado;
}
//# sourceMappingURL=OrdeneService.d.ts.map