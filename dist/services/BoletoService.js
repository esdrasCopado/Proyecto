"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoletoService = void 0;
const boletoRepository_1 = require("@/repositories/boletoRepository");
const Boleto_1 = require("@/models/Boleto");
const enums_1 = require("@/types/enums");
class BoletoService {
    constructor() {
        this.boletoRepository = new boletoRepository_1.BoletoRepository();
    }
    /**
     * Valida que el tipo de boleto sea válido
     */
    validarTipoBoleto(tipo) {
        const tiposValidos = Object.values(enums_1.TipoBoleto);
        if (!tiposValidos.includes(tipo)) {
            throw new Error(`Tipo de boleto inválido. Tipos válidos: ${tiposValidos.join(', ')}`);
        }
    }
    /**
     * Valida los datos del boleto
     */
    validarDatosBoleto(boletoData) {
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
    async crearBoleto(boletoData) {
        // Validar datos de entrada
        this.validarDatosBoleto(boletoData);
        const boleto = new Boleto_1.Boleto({
            precio: boletoData.precio,
            tipo: boletoData.tipo,
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
    async obtenerBoletoPorId(id) {
        if (id <= 0) {
            throw new Error('El ID del boleto debe ser válido');
        }
        return this.boletoRepository.obtenerPorId(id);
    }
    /**
     * Obtiene todos los boletos
     */
    async obtenerTodosLosBoletos() {
        return this.boletoRepository.obtenerTodos();
    }
    /**
     * Actualiza datos específicos de un boleto
     */
    async actualizarBoleto(id, datosActualizar) {
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
        const boletoActualizado = {
            ...boletoActual,
            precio: datosActualizar.precio ?? boletoActual.precio,
            tipo: datosActualizar.tipo ?? boletoActual.tipo,
            disponible: datosActualizar.disponible ?? boletoActual.disponible,
        };
        return this.boletoRepository.actualizar(id, boletoActualizado);
    }
    /**
     * Elimina un boleto
     */
    async eliminarBoleto(id) {
        if (id <= 0) {
            throw new Error('El ID del boleto debe ser válido');
        }
        return this.boletoRepository.eliminar(id);
    }
    /**
     * Obtiene boletos por evento
     */
    async buscarBoletosPorEvento(eventoId) {
        if (eventoId <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }
        return this.boletoRepository.buscarPorEvento(eventoId);
    }
    /**
     * Obtiene solo boletos disponibles de un evento
     */
    async obtenerBoletosDisponibles(eventoId) {
        const boletos = await this.buscarBoletosPorEvento(eventoId);
        return boletos.filter(boleto => boleto.disponible);
    }
    /**
     * Compra un boleto (asigna a un usuario)
     */
    async comprarBoleto(boletoId, usuarioId) {
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
        const boletoActualizado = {
            ...boleto,
            usuarioId,
            disponible: false,
        };
        return this.boletoRepository.actualizar(boletoId, boletoActualizado);
    }
    /**
     * Libera un boleto (lo hace disponible nuevamente)
     */
    async liberarBoleto(boletoId) {
        if (boletoId <= 0) {
            throw new Error('ID de boleto inválido');
        }
        const boleto = await this.boletoRepository.obtenerPorId(boletoId);
        if (!boleto) {
            throw new Error('Boleto no encontrado');
        }
        const boletoActualizado = {
            ...boleto,
            usuarioId: undefined,
            disponible: true,
        };
        return this.boletoRepository.actualizar(boletoId, boletoActualizado);
    }
    /**
     * Verifica si hay suficientes boletos disponibles
     */
    async verificarDisponibilidad(eventoId, cantidad) {
        const boletosDisponibles = await this.obtenerBoletosDisponibles(eventoId);
        return boletosDisponibles.length >= cantidad;
    }
    /**
     * Elimina todos los boletos de un evento
     */
    async eliminarBoletosPorEvento(eventoId) {
        if (eventoId <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }
        return this.boletoRepository.eliminarPorEvento(eventoId);
    }
    /**
     * Obtiene estadísticas de boletos de un evento
     */
    async obtenerEstadisticasEvento(eventoId) {
        const boletos = await this.buscarBoletosPorEvento(eventoId);
        const estadisticas = {
            total: boletos.length,
            disponibles: boletos.filter(b => b.disponible).length,
            vendidos: boletos.filter(b => !b.disponible).length,
            porTipo: {},
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
    async crearBoletosEnLote(eventoId, configuraciones) {
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
        const boletos = [];
        for (const config of configuraciones) {
            for (let i = 0; i < config.cantidad; i++) {
                const boleto = new Boleto_1.Boleto({
                    precio: config.precio,
                    tipo: config.tipo,
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
exports.BoletoService = BoletoService;
//# sourceMappingURL=BoletoService.js.map