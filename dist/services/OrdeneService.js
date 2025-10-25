"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenService = void 0;
const OrdenRepository_1 = require("../repositories/OrdenRepository");
const Orden_1 = require("../models/Orden");
const enums_1 = require("../types/enums");
const database_1 = __importDefault(require("../config/database"));
class OrdenService {
    constructor() {
        this.ordenRepository = new OrdenRepository_1.OrdenRepository();
    }
    /**
     * Crea una nueva orden
     * Calcula el total automáticamente basado en los boletos
     */
    async crearOrden(ordenData) {
        // Validar datos de entrada
        if (!ordenData.usuarioId || ordenData.usuarioId <= 0) {
            throw new Error('El ID del usuario es requerido y debe ser válido');
        }
        if (!ordenData.boletoIds || ordenData.boletoIds.length === 0) {
            throw new Error('Debe proporcionar al menos un boleto');
        }
        // Obtener información de los boletos para calcular el total
        const boletos = await database_1.default.boleto.findMany({
            where: { id: { in: ordenData.boletoIds } },
        });
        if (boletos.length !== ordenData.boletoIds.length) {
            throw new Error('Algunos boletos especificados no existen');
        }
        // Verificar que todos los boletos están disponibles
        const boletosNoDisponibles = boletos.filter(b => !b.disponible);
        if (boletosNoDisponibles.length > 0) {
            throw new Error('Algunos boletos no están disponibles para compra');
        }
        // Calcular el total
        const total = boletos.reduce((sum, boleto) => sum + Number(boleto.precio), 0);
        // Crear la orden
        const orden = new Orden_1.Orden({
            total,
            fechaCompra: new Date(),
            usuarioId: ordenData.usuarioId,
            boletos: ordenData.boletoIds,
            estado: enums_1.EstadoOrden.PENDIENTE,
        });
        const ordenCreada = await this.ordenRepository.createOrden(orden.toJSON());
        // Asignar los boletos a la orden
        await this.ordenRepository.asignarBoletos(ordenCreada.id, ordenData.boletoIds);
        // Obtener y retornar la orden con todos los datos
        return await this.ordenRepository.getOrdenById(ordenCreada.id);
    }
    /**
     * Obtiene una orden por ID
     */
    async obtenerOrdenPorId(id) {
        if (id <= 0) {
            throw new Error('El ID de la orden debe ser válido');
        }
        return this.ordenRepository.getOrdenById(id);
    }
    /**
     * Obtiene todas las órdenes
     */
    async obtenerTodasLasOrdenes() {
        return this.ordenRepository.listOrdenes();
    }
    /**
     * Obtiene órdenes de un usuario
     */
    async obtenerOrdenesPorUsuario(usuarioId) {
        if (usuarioId <= 0) {
            throw new Error('El ID del usuario debe ser válido');
        }
        return this.ordenRepository.getOrdenesByUsuario(usuarioId);
    }
    /**
     * Obtiene órdenes por estado
     */
    async obtenerOrdenesPorEstado(estado) {
        const estadosValidos = Object.values(enums_1.EstadoOrden);
        if (!estadosValidos.includes(estado)) {
            throw new Error(`Estado inválido. Estados válidos: ${estadosValidos.join(', ')}`);
        }
        return this.ordenRepository.getOrdenesByEstado(estado);
    }
    /**
     * Actualiza el estado de una orden
     */
    async actualizarEstadoOrden(id, nuevoEstado) {
        if (id <= 0) {
            throw new Error('El ID de la orden debe ser válido');
        }
        const estadosValidos = Object.values(enums_1.EstadoOrden);
        if (!estadosValidos.includes(nuevoEstado)) {
            throw new Error(`Estado inválido. Estados válidos: ${estadosValidos.join(', ')}`);
        }
        const ordenActual = await this.ordenRepository.getOrdenById(id);
        if (!ordenActual) {
            throw new Error('Orden no encontrada');
        }
        // Validar transiciones de estado válidas
        this.validarTransicionEstado(ordenActual.estado, nuevoEstado);
        const ordenActualizada = new Orden_1.Orden({
            ...ordenActual,
            estado: nuevoEstado,
        });
        return this.ordenRepository.updateOrden(ordenActualizada.toJSON());
    }
    /**
     * Marca una orden como pagada
     */
    async marcarComoPagada(id) {
        return this.actualizarEstadoOrden(id, enums_1.EstadoOrden.PAGADO);
    }
    /**
     * Cancela una orden
     * Libera los boletos asociados
     */
    async cancelarOrden(id) {
        const orden = await this.ordenRepository.getOrdenById(id);
        if (!orden) {
            throw new Error('Orden no encontrada');
        }
        // No se pueden cancelar órdenes ya pagadas sin reembolso
        if (orden.estado === enums_1.EstadoOrden.PAGADO) {
            throw new Error('No se puede cancelar una orden pagada. Use el proceso de reembolso');
        }
        // Liberar los boletos
        if (orden.boletos && orden.boletos.length > 0) {
            await database_1.default.boleto.updateMany({
                where: { ordenId: id },
                data: {
                    ordenId: null,
                    disponible: true,
                    usuarioId: null,
                },
            });
        }
        // Actualizar estado de la orden
        return this.actualizarEstadoOrden(id, enums_1.EstadoOrden.CANCELADO);
    }
    /**
     * Procesa un reembolso para una orden pagada
     * Libera los boletos asociados
     */
    async reembolsarOrden(id) {
        const orden = await this.ordenRepository.getOrdenById(id);
        if (!orden) {
            throw new Error('Orden no encontrada');
        }
        // Solo se pueden reembolsar órdenes pagadas
        if (orden.estado !== enums_1.EstadoOrden.PAGADO) {
            throw new Error('Solo se pueden reembolsar órdenes que han sido pagadas');
        }
        // Liberar los boletos
        if (orden.boletos && orden.boletos.length > 0) {
            await database_1.default.boleto.updateMany({
                where: { ordenId: id },
                data: {
                    ordenId: null,
                    disponible: true,
                    usuarioId: null,
                },
            });
        }
        // Actualizar estado de la orden
        return this.actualizarEstadoOrden(id, enums_1.EstadoOrden.REEMBOLSADO);
    }
    /**
     * Elimina una orden
     * Solo se pueden eliminar órdenes en estado PENDIENTE o CANCELADO
     */
    async eliminarOrden(id) {
        const orden = await this.ordenRepository.getOrdenById(id);
        if (!orden) {
            throw new Error('Orden no encontrada');
        }
        // No permitir eliminar órdenes pagadas o reembolsadas
        if (orden.estado === enums_1.EstadoOrden.PAGADO || orden.estado === enums_1.EstadoOrden.REEMBOLSADO) {
            throw new Error('No se pueden eliminar órdenes pagadas o reembolsadas. Use el proceso de cancelación o reembolso');
        }
        // Liberar los boletos si existen
        if (orden.boletos && orden.boletos.length > 0) {
            await database_1.default.boleto.updateMany({
                where: { ordenId: id },
                data: {
                    ordenId: null,
                    disponible: true,
                    usuarioId: null,
                },
            });
        }
        return this.ordenRepository.deleteOrden(id);
    }
    /**
     * Obtiene estadísticas de órdenes
     */
    async obtenerEstadisticas() {
        const todasLasOrdenes = await this.ordenRepository.listOrdenes();
        return {
            total: todasLasOrdenes.length,
            pendientes: todasLasOrdenes.filter(o => o.estado === enums_1.EstadoOrden.PENDIENTE).length,
            pagadas: todasLasOrdenes.filter(o => o.estado === enums_1.EstadoOrden.PAGADO).length,
            canceladas: todasLasOrdenes.filter(o => o.estado === enums_1.EstadoOrden.CANCELADO).length,
            reembolsadas: todasLasOrdenes.filter(o => o.estado === enums_1.EstadoOrden.REEMBOLSADO).length,
            totalRecaudado: todasLasOrdenes
                .filter(o => o.estado === enums_1.EstadoOrden.PAGADO)
                .reduce((sum, o) => sum + Number(o.total), 0),
        };
    }
    /**
     * Valida que la transición de estado sea válida
     */
    validarTransicionEstado(estadoActual, nuevoEstado) {
        const transicionesValidas = {
            [enums_1.EstadoOrden.PENDIENTE]: [enums_1.EstadoOrden.PAGADO, enums_1.EstadoOrden.CANCELADO],
            [enums_1.EstadoOrden.PAGADO]: [enums_1.EstadoOrden.REEMBOLSADO],
            [enums_1.EstadoOrden.CANCELADO]: [], // No se puede cambiar desde cancelado
            [enums_1.EstadoOrden.REEMBOLSADO]: [], // No se puede cambiar desde reembolsado
        };
        const estadosPermitidos = transicionesValidas[estadoActual] || [];
        if (!estadosPermitidos.includes(nuevoEstado)) {
            throw new Error(`Transición de estado inválida: no se puede cambiar de ${estadoActual} a ${nuevoEstado}`);
        }
    }
}
exports.OrdenService = OrdenService;
//# sourceMappingURL=OrdeneService.js.map