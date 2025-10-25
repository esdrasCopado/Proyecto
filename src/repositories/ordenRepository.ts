import { Orden } from "../models/Orden";
import { IOrden } from "../models/Orden";
import { IOrdenRepository } from "../interfaces/IOrdenRepository";
import { EstadoOrden } from "../types/enums";
import prisma from "../config/database";

export class OrdenRepository implements IOrdenRepository {
    /**
     * Convierte un IOrden a datos para Prisma
     * Nota: fecha se mapea automáticamente, no se incluye fechaCompra en el data
     */
    private toOrdenData(orden: IOrden) {
        return {
            total: orden.total,
            usuarioId: orden.usuarioId,
            estado: orden.estado as EstadoOrden,
        };
    }

    /**
     * Crea una nueva orden con boletos asociados
     */
    async createOrden(orden: IOrden): Promise<IOrden> {
        try {
            // Validar que el usuario existe
            const usuarioExiste = await prisma.usuario.findUnique({
                where: { id: orden.usuarioId },
            });

            if (!usuarioExiste) {
                throw new Error('El usuario especificado no existe');
            }

            // Validar que todos los boletos existen y están disponibles
            if (orden.boletos && orden.boletos.length > 0) {
                const boletosExistentes = await prisma.boleto.findMany({
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

            const createdOrden = await prisma.orden.create({
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

            return Orden.fromDatabase(createdOrden);
        } catch (error: any) {
            if (error.code === 'P2003') {
                throw new Error('El usuario especificado no existe');
            }
            throw error;
        }
    }

    /**
     * Obtiene una orden por ID con sus relaciones
     */
    async getOrdenById(id: number): Promise<IOrden | null> {
        try {
            const orden = await prisma.orden.findUnique({
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
            return orden ? Orden.fromDatabase(orden) : null;
        } catch (error: any) {
            throw new Error(`Error al obtener la orden: ${error.message}`);
        }
    }

    /**
     * Actualiza una orden (principalmente el estado)
     */
    async updateOrden(orden: IOrden): Promise<IOrden> {
        try {
            const updatedOrden = await prisma.orden.update({
                where: { id: orden.id },
                data: {
                    total: orden.total,
                    estado: orden.estado as EstadoOrden,
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
            return Orden.fromDatabase(updatedOrden);
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new Error('Orden no encontrada');
            }
            throw new Error(`Error al actualizar la orden: ${error.message}`);
        }
    }

    /**
     * Elimina una orden
     */
    async deleteOrden(id: number): Promise<void> {
        try {
            await prisma.orden.delete({
                where: { id },
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new Error('Orden no encontrada');
            }
            throw new Error(`Error al eliminar la orden: ${error.message}`);
        }
    }

    /**
     * Lista todas las ordenes
     */
    async listOrdenes(): Promise<IOrden[]> {
        try {
            const ordenes = await prisma.orden.findMany({
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
            return ordenes.map(Orden.fromDatabase);
        } catch (error: any) {
            throw new Error(`Error al listar las ordenes: ${error.message}`);
        }
    }

    /**
     * Obtiene ordenes por usuario
     */
    async getOrdenesByUsuario(usuarioId: number): Promise<IOrden[]> {
        try {
            const ordenes = await prisma.orden.findMany({
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
            return ordenes.map(Orden.fromDatabase);
        } catch (error: any) {
            throw new Error(`Error al obtener ordenes por usuario: ${error.message}`);
        }
    }

    /**
     * Obtiene ordenes por estado
     */
    async getOrdenesByEstado(estado: EstadoOrden): Promise<IOrden[]> {
        try {
            const ordenes = await prisma.orden.findMany({
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
            return ordenes.map(Orden.fromDatabase);
        } catch (error: any) {
            throw new Error(`Error al obtener ordenes por estado: ${error.message}`);
        }
    }

    /**
     * Asigna boletos a una orden
     */
    async asignarBoletos(ordenId: number, boletoIds: number[]): Promise<IOrden> {
        try {
            // Validar que los boletos existen y están disponibles
            const boletos = await prisma.boleto.findMany({
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
            await prisma.boleto.updateMany({
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
        } catch (error: any) {
            throw error;
        }
    }
}