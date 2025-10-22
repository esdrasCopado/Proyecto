import { BoletoRepository } from "@/repositories/boletoRepository";
import { Boleto, IBoleto } from "@/models/Boleto";
import { TipoBoleto } from "@/types/enums";

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
    }): Promise<IBoleto> {
        // Validar datos de entrada
        this.validarDatosBoleto(boletoData);

        const boleto = new Boleto({
            precio: boletoData.precio,
            tipo: boletoData.tipo as TipoBoleto,
            disponible: boletoData.disponible,
            eventoId: boletoData.eventoId,
            usuarioId: boletoData.usuarioId,
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
}

