import { BoletoRepository } from "../repositories/boletoRepository";
import { Boleto, IBoleto } from "../models/Boleto";
import { TipoBoleto } from "../types/enums";

export class BoletoService {
    private boletoRepository: BoletoRepository;

    constructor() {
        this.boletoRepository = new BoletoRepository();
    }

    /**
     * Valida que el tipo de boleto sea válido
     */
    private validarTipoBoleto(tipo: string): void {
        const tiposValidos = Object.values(TipoBoleto);
        if (!tiposValidos.includes(tipo as TipoBoleto)) {
            throw new Error(`Tipo de boleto inválido. Tipos válidos: ${tiposValidos.join(', ')}`);
        }
    }

    /**
     * Valida los datos del boleto
     */
    private validarDatosBoleto(boletoData: {
        precio: number;
        tipo: string;
        disponible: boolean;
        eventoId: number;
    }): void {
        if (boletoData.precio <= 0) {
            throw new Error('El precio del boleto debe ser mayor a 0');
        }

        this.validarTipoBoleto(boletoData.tipo);

        if (!boletoData.eventoId || boletoData.eventoId <= 0) {
            throw new Error('El ID del evento es requerido y debe ser válido');
        }
    }

    /**
     * Crea un nuevo boleto
     */
    async crearBoleto(boletoData: {
        precio: number;
        tipo: string;
        disponible: boolean;
        eventoId: number;
        usuarioId?: number;
        ordenId?: number;
    }): Promise<IBoleto> {
        // Validar datos de entrada
        this.validarDatosBoleto(boletoData);

        const boleto = new Boleto({
            precio: boletoData.precio,
            tipo: boletoData.tipo as TipoBoleto,
            disponible: boletoData.disponible,
            eventoId: boletoData.eventoId,
            usuarioId: boletoData.usuarioId,
            ordenId: boletoData.ordenId,
        });

        // El repositorio maneja sus propios errores
        return this.boletoRepository.crear(boleto);
    }

    /**
     * Obtiene un boleto por su ID
     */
    async obtenerBoletoPorId(id: number): Promise<IBoleto | null> {
        if (id <= 0) {
            throw new Error('El ID del boleto debe ser válido');
        }
        return this.boletoRepository.obtenerPorId(id);
    }

    /**
     * Obtiene todos los boletos
     */
    async obtenerTodosLosBoletos(): Promise<IBoleto[]> {
        return this.boletoRepository.obtenerTodos();
    }

    /**
     * Actualiza datos específicos de un boleto
     */
    async actualizarBoleto(id: number, datosActualizar: {
        precio?: number;
        tipo?: string;
        disponible?: boolean;
    }): Promise<IBoleto | null> {
        if (id <= 0) {
            throw new Error('El ID del boleto debe ser válido');
        }

        // Obtener boleto actual
        const boletoActual = await this.boletoRepository.obtenerPorId(id);
        if (!boletoActual) {
            return null;
        }

        // Validar cambios
        if (datosActualizar.precio !== undefined && datosActualizar.precio <= 0) {
            throw new Error('El precio del boleto debe ser mayor a 0');
        }

        if (datosActualizar.tipo) {
            this.validarTipoBoleto(datosActualizar.tipo);
        }

        // Crear objeto actualizado
        const boletoActualizado: IBoleto = {
            ...boletoActual,
            precio: datosActualizar.precio ?? boletoActual.precio,
            tipo: (datosActualizar.tipo as TipoBoleto) ?? boletoActual.tipo,
            disponible: datosActualizar.disponible ?? boletoActual.disponible,
        };

        return this.boletoRepository.actualizar(id, boletoActualizado);
    }

    /**
     * Elimina un boleto
     */
    async eliminarBoleto(id: number): Promise<boolean> {
        if (id <= 0) {
            throw new Error('El ID del boleto debe ser válido');
        }
        return this.boletoRepository.eliminar(id);
    }

    /**
     * Obtiene boletos por evento
     */
    async buscarBoletosPorEvento(eventoId: number): Promise<IBoleto[]> {
        if (eventoId <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }
        return this.boletoRepository.buscarPorEvento(eventoId);
    }

    /**
     * Obtiene solo boletos disponibles de un evento
     */
    async obtenerBoletosDisponibles(eventoId: number): Promise<IBoleto[]> {
        const boletos = await this.buscarBoletosPorEvento(eventoId);
        return boletos.filter(boleto => boleto.disponible);
    }

    /**
     * Compra un boleto (asigna a un usuario)
     */
    async comprarBoleto(boletoId: number, usuarioId: number): Promise<IBoleto | null> {
        if (boletoId <= 0 || usuarioId <= 0) {
            throw new Error('IDs inválidos');
        }

        const boleto = await this.boletoRepository.obtenerPorId(boletoId);

        if (!boleto) {
            throw new Error('Boleto no encontrado');
        }

        if (!boleto.disponible) {
            throw new Error('El boleto no está disponible');
        }

        if (boleto.usuarioId) {
            throw new Error('El boleto ya está asignado a otro usuario');
        }

        const boletoActualizado: IBoleto = {
            ...boleto,
            usuarioId,
            disponible: false,
        };

        return this.boletoRepository.actualizar(boletoId, boletoActualizado);
    }

    /**
     * Libera un boleto (lo hace disponible nuevamente)
     */
    async liberarBoleto(boletoId: number): Promise<IBoleto | null> {
        if (boletoId <= 0) {
            throw new Error('ID de boleto inválido');
        }

        const boleto = await this.boletoRepository.obtenerPorId(boletoId);

        if (!boleto) {
            throw new Error('Boleto no encontrado');
        }

        const boletoActualizado: IBoleto = {
            ...boleto,
            usuarioId: undefined,
            disponible: true,
        };

        return this.boletoRepository.actualizar(boletoId, boletoActualizado);
    }

    /**
     * Verifica si hay suficientes boletos disponibles
     */
    async verificarDisponibilidad(eventoId: number, cantidad: number): Promise<boolean> {
        const boletosDisponibles = await this.obtenerBoletosDisponibles(eventoId);
        return boletosDisponibles.length >= cantidad;
    }

    /**
     * Elimina todos los boletos de un evento
     */
    async eliminarBoletosPorEvento(eventoId: number): Promise<number> {
        if (eventoId <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }
        return this.boletoRepository.eliminarPorEvento(eventoId);
    }

    /**
     * Obtiene estadísticas de boletos de un evento
     */
    async obtenerEstadisticasEvento(eventoId: number): Promise<{
        total: number;
        disponibles: number;
        vendidos: number;
        porTipo: Record<string, number>;
    }> {
        const boletos = await this.buscarBoletosPorEvento(eventoId);

        const estadisticas = {
            total: boletos.length,
            disponibles: boletos.filter(b => b.disponible).length,
            vendidos: boletos.filter(b => !b.disponible).length,
            porTipo: {} as Record<string, number>,
        };

        // Contar por tipo
        boletos.forEach(boleto => {
            const tipo = boleto.tipo ?? 'UNKNOWN';
            estadisticas.porTipo[tipo] = (estadisticas.porTipo[tipo] || 0) + 1;
        });

        return estadisticas;
    }

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
    async crearBoletosEnLote(
        eventoId: number,
        configuraciones: Array<{
            tipo: string;
            cantidad: number;
            precio: number;
        }>
    ): Promise<{
        totalCreados: number;
        detalles: Array<{
            tipo: string;
            cantidad: number;
            precio: number;
        }>;
    }> {
        // Validar evento
        if (eventoId <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }

        // Validar que haya configuraciones
        if (!configuraciones || configuraciones.length === 0) {
            throw new Error('Debe proporcionar al menos una configuración de boletos');
        }

        // Validar cada configuración
        configuraciones.forEach((config, index) => {
            if (!config.tipo || !config.cantidad || !config.precio) {
                throw new Error(`Configuración ${index + 1}: Faltan campos requeridos (tipo, cantidad, precio)`);
            }

            if (config.cantidad <= 0) {
                throw new Error(`Configuración ${index + 1}: La cantidad debe ser mayor a 0`);
            }

            if (config.precio <= 0) {
                throw new Error(`Configuración ${index + 1}: El precio debe ser mayor a 0`);
            }

            // Validar tipo de boleto
            this.validarTipoBoleto(config.tipo);
        });

        // Calcular total de boletos a crear
        const totalBoletos = configuraciones.reduce((sum, config) => sum + config.cantidad, 0);

        // Validar límite razonable (prevenir creación masiva accidental)
        if (totalBoletos > 100000) {
            throw new Error(`No se pueden crear más de 100,000 boletos a la vez. Solicitó: ${totalBoletos}`);
        }

        // Generar array de boletos
        const boletos: IBoleto[] = [];

        for (const config of configuraciones) {
            for (let i = 0; i < config.cantidad; i++) {
                const boleto = new Boleto({
                    precio: config.precio,
                    tipo: config.tipo as TipoBoleto,
                    disponible: true,
                    eventoId: eventoId,
                });
                boletos.push(boleto);
            }
        }

        // Crear boletos en lote usando el repositorio
        const cantidadCreada = await this.boletoRepository.crearEnLote(boletos);

        return {
            totalCreados: cantidadCreada,
            detalles: configuraciones.map(config => ({
                tipo: config.tipo,
                cantidad: config.cantidad,
                precio: config.precio,
            })),
        };
    }
}

