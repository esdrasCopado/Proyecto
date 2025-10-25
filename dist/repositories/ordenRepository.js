"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenRepository = void 0;
const Orden_1 = require("../models/Orden");
const database_1 = __importDefault(require("../config/database"));
class OrdenRepository {
    /**
     * Convierte un IOrden a datos para Prisma
     * Nota: fecha se mapea automáticamente, no se incluye fechaCompra en el data
     */
    toOrdenData(orden) {
        return {
            total: orden.total,
            usuarioId: orden.usuarioId,
            estado: orden.estado,
        };
    }
    /**
     * Crea una nueva orden con boletos asociados
     */
    async createOrden(orden) {
        try {
            // Validar que el usuario existe
            const usuarioExiste = await database_1.default.usuario.findUnique({
                where: { id: orden.usuarioId },
            });
            if (!usuarioExiste) {
                throw new Error('El usuario especificado no existe');
            }
            // Validar que todos los boletos existen y están disponibles
            if (orden.boletos && orden.boletos.length > 0) {
                const boletosExistentes = await database_1.default.boleto.findMany({
                    where: {
                        id: { in: orden.boletos },
                    },
                });
                if (boletosExistentes.length !== orden.boletos.length) {
                    throw new Error('Algunos boletos especificados no existen');
                }
                // Verificar que todos los boletos están disponibles
                const boletosNoDisponibles = boletosExistentes.filter(b => !b.disponible);
                if (boletosNoDisponibles.length > 0) {
                    throw new Error('Algunos boletos no están disponibles');
                }
            }
            const createdOrden = await database_1.default.orden.create({
                data: this.toOrdenData(orden),
                include: {
                    boletos: true,
                    usuario: {
                        select: {
                            id: true,
                            nombre: true,
                            email: true,
                        },
                    },
                },
            });
            return Orden_1.Orden.fromDatabase(createdOrden);
        }
        catch (error) {
            if (error.code === 'P2003') {
                throw new Error('El usuario especificado no existe');
            }
            throw error;
        }
    }
    /**
     * Obtiene una orden por ID con sus relaciones
     */
    async getOrdenById(id) {
        try {
            const orden = await database_1.default.orden.findUnique({
                where: { id },
                include: {
                    boletos: true,
                    usuario: {
                        select: {
                            id: true,
                            nombre: true,
                            email: true,
                        },
                    },
                },
            });
            return orden ? Orden_1.Orden.fromDatabase(orden) : null;
        }
        catch (error) {
            throw new Error(`Error al obtener la orden: ${error.message}`);
        }
    }
    /**
     * Actualiza una orden (principalmente el estado)
     */
    async updateOrden(orden) {
        try {
            const updatedOrden = await database_1.default.orden.update({
                where: { id: orden.id },
                data: {
                    total: orden.total,
                    estado: orden.estado,
                },
                include: {
                    boletos: true,
                    usuario: {
                        select: {
                            id: true,
                            nombre: true,
                            email: true,
                        },
                    },
                },
            });
            return Orden_1.Orden.fromDatabase(updatedOrden);
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new Error('Orden no encontrada');
            }
            throw new Error(`Error al actualizar la orden: ${error.message}`);
        }
    }
    /**
     * Elimina una orden
     */
    async deleteOrden(id) {
        try {
            await database_1.default.orden.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new Error('Orden no encontrada');
            }
            throw new Error(`Error al eliminar la orden: ${error.message}`);
        }
    }
    /**
     * Lista todas las ordenes
     */
    async listOrdenes() {
        try {
            const ordenes = await database_1.default.orden.findMany({
                include: {
                    boletos: true,
                    usuario: {
                        select: {
                            id: true,
                            nombre: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    fecha: 'desc',
                },
            });
            return ordenes.map(Orden_1.Orden.fromDatabase);
        }
        catch (error) {
            throw new Error(`Error al listar las ordenes: ${error.message}`);
        }
    }
    /**
     * Obtiene ordenes por usuario
     */
    async getOrdenesByUsuario(usuarioId) {
        try {
            const ordenes = await database_1.default.orden.findMany({
                where: { usuarioId },
                include: {
                    boletos: true,
                    usuario: {
                        select: {
                            id: true,
                            nombre: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    fecha: 'desc',
                },
            });
            return ordenes.map(Orden_1.Orden.fromDatabase);
        }
        catch (error) {
            throw new Error(`Error al obtener ordenes por usuario: ${error.message}`);
        }
    }
    /**
     * Obtiene ordenes por estado
     */
    async getOrdenesByEstado(estado) {
        try {
            const ordenes = await database_1.default.orden.findMany({
                where: { estado },
                include: {
                    boletos: true,
                    usuario: {
                        select: {
                            id: true,
                            nombre: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    fecha: 'desc',
                },
            });
            return ordenes.map(Orden_1.Orden.fromDatabase);
        }
        catch (error) {
            throw new Error(`Error al obtener ordenes por estado: ${error.message}`);
        }
    }
    /**
     * Asigna boletos a una orden
     */
    async asignarBoletos(ordenId, boletoIds) {
        try {
            // Validar que los boletos existen y están disponibles
            const boletos = await database_1.default.boleto.findMany({
                where: { id: { in: boletoIds } },
            });
            if (boletos.length !== boletoIds.length) {
                throw new Error('Algunos boletos no existen');
            }
            const boletosNoDisponibles = boletos.filter(b => !b.disponible || b.ordenId);
            if (boletosNoDisponibles.length > 0) {
                throw new Error('Algunos boletos no están disponibles o ya están asignados');
            }
            // Asignar los boletos a la orden
            await database_1.default.boleto.updateMany({
                where: { id: { in: boletoIds } },
                data: {
                    ordenId,
                    disponible: false,
                },
            });
            // Obtener y retornar la orden actualizada
            const orden = await this.getOrdenById(ordenId);
            if (!orden) {
                throw new Error('Orden no encontrada');
            }
            return orden;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.OrdenRepository = OrdenRepository;
//# sourceMappingURL=OrdenRepository.js.map