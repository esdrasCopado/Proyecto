import { IBoleto } from "@/models/Boleto";
export declare class BoletoService {
    private boletoRepository;
    constructor();
    /**
     * Valida que el tipo de boleto sea válido
     */
    private validarTipoBoleto;
    /**
     * Valida los datos del boleto
     */
    private validarDatosBoleto;
    /**
     * Crea un nuevo boleto
     */
    crearBoleto(boletoData: {
        precio: number;
        tipo: string;
        disponible: boolean;
        eventoId: number;
        usuarioId?: number;
        ordenId?: number;
    }): Promise<IBoleto>;
    /**
     * Obtiene un boleto por su ID
     */
    obtenerBoletoPorId(id: number): Promise<IBoleto | null>;
    /**
     * Obtiene todos los boletos
     */
    obtenerTodosLosBoletos(): Promise<IBoleto[]>;
    /**
     * Actualiza datos específicos de un boleto
     */
    actualizarBoleto(id: number, datosActualizar: {
        precio?: number;
        tipo?: string;
        disponible?: boolean;
    }): Promise<IBoleto | null>;
    /**
     * Elimina un boleto
     */
    eliminarBoleto(id: number): Promise<boolean>;
    /**
     * Obtiene boletos por evento
     */
    buscarBoletosPorEvento(eventoId: number): Promise<IBoleto[]>;
    /**
     * Obtiene solo boletos disponibles de un evento
     */
    obtenerBoletosDisponibles(eventoId: number): Promise<IBoleto[]>;
    /**
     * Compra un boleto (asigna a un usuario)
     */
    comprarBoleto(boletoId: number, usuarioId: number): Promise<IBoleto | null>;
    /**
     * Libera un boleto (lo hace disponible nuevamente)
     */
    liberarBoleto(boletoId: number): Promise<IBoleto | null>;
    /**
     * Verifica si hay suficientes boletos disponibles
     */
    verificarDisponibilidad(eventoId: number, cantidad: number): Promise<boolean>;
    /**
     * Elimina todos los boletos de un evento
     */
    eliminarBoletosPorEvento(eventoId: number): Promise<number>;
    /**
     * Obtiene estadísticas de boletos de un evento
     */
    obtenerEstadisticasEvento(eventoId: number): Promise<{
        total: number;
        disponibles: number;
        vendidos: number;
        porTipo: Record<string, number>;
    }>;
    /**
     * Crea boletos en lote para un evento
     * Permite crear cientos o miles de boletos de manera eficiente
     *
     * @param eventoId - ID del evento
     * @param configuraciones - Array de configuraciones de boletos por tipo
     * @returns Cantidad de boletos creados
     *
     * @example
     * crearBoletosEnLote(1, [
     *   { tipo: 'VIP', cantidad: 50, precio: 500 },
     *   { tipo: 'GENERAL', cantidad: 200, precio: 150 }
     * ]) // Crea 250 boletos: 50 VIP y 200 GENERAL
     */
    crearBoletosEnLote(eventoId: number, configuraciones: Array<{
        tipo: string;
        cantidad: number;
        precio: number;
    }>): Promise<{
        totalCreados: number;
        detalles: Array<{
            tipo: string;
            cantidad: number;
            precio: number;
        }>;
    }>;
}
//# sourceMappingURL=BoletoService.d.ts.map