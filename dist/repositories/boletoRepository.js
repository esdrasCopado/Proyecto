"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoletoRepository = void 0;
const Boleto_1 = require("../models/Boleto");
const database_1 = __importDefault(require("../config/database"));
class BoletoRepository {
    toBoletoData(boleto) {
        return {
            precio: boleto.precio,
            tipo: boleto.tipo,
            disponible: boleto.disponible,
            eventoId: boleto.eventoId,
            usuarioId: boleto.usuarioId || null,
            ordenId: boleto.ordenId || null,
        };
    }
    async crear(boleto) {
        try {
            const boletoCreado = await database_1.default.boleto.create({
                data: this.toBoletoData(boleto)
            });
            return Boleto_1.Boleto.fromDatabase(boletoCreado);
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new Error('El boleto ya existe (violación de restricción única)');
            }
            if (error.code === 'P2003') {
                throw new Error('El evento o usuario especificado no existe');
            }
            throw new Error(`Error al crear el boleto: ${error.message}`);
        }
    }
    async obtenerPorId(id) {
        try {
            const boleto = await database_1.default.boleto.findUnique({
                where: { id }
            });
            return boleto ? Boleto_1.Boleto.fromDatabase(boleto) : null;
        }
        catch (error) {
            throw new Error(`Error al obtener el boleto: ${error.message}`);
        }
    }
    async obtenerTodos() {
        try {
            const boletos = await database_1.default.boleto.findMany();
            return boletos.map(Boleto_1.Boleto.fromDatabase);
        }
        catch (error) {
            throw new Error(`Error al obtener los boletos: ${error.message}`);
        }
    }
    async actualizar(id, boleto) {
        try {
            const boletoActualizado = await database_1.default.boleto.update({
                where: { id },
                data: this.toBoletoData(boleto)
            });
            return Boleto_1.Boleto.fromDatabase(boletoActualizado);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return null; // Boleto no encontrado
            }
            if (error.code === 'P2003') {
                throw new Error('El evento o usuario especificado no existe');
            }
            throw new Error(`Error al actualizar el boleto: ${error.message}`);
        }
    }
    async eliminar(id) {
        try {
            await database_1.default.boleto.delete({
                where: { id }
            });
            return true;
        }
        catch (error) {
            if (error.code === 'P2025') {
                return false; // Boleto no encontrado
            }
            throw new Error(`Error al eliminar el boleto: ${error.message}`);
        }
    }
    async buscarPorEvento(eventoId) {
        try {
            const boletos = await database_1.default.boleto.findMany({
                where: { eventoId }
            });
            return boletos.map(Boleto_1.Boleto.fromDatabase);
        }
        catch (error) {
            throw new Error(`Error al buscar boletos por evento: ${error.message}`);
        }
    }
    async eliminarPorEvento(eventoId) {
        try {
            const result = await database_1.default.boleto.deleteMany({
                where: { eventoId }
            });
            return result.count;
        }
        catch (error) {
            throw new Error(`Error al eliminar boletos por evento: ${error.message}`);
        }
    }
    /**
     * Crea múltiples boletos en lote (para eventos con muchos boletos)
     * Usa createMany para optimizar la creación masiva
     */
    async crearEnLote(boletos) {
        try {
            const boletosData = boletos.map(boleto => this.toBoletoData(boleto));
            const result = await database_1.default.boleto.createMany({
                data: boletosData,
                skipDuplicates: false, // No permitir duplicados
            });
            return result.count;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new Error('Algunos boletos ya existen (violación de restricción única)');
            }
            if (error.code === 'P2003') {
                throw new Error('El evento especificado no existe');
            }
            throw new Error(`Error al crear boletos en lote: ${error.message}`);
        }
    }
}
exports.BoletoRepository = BoletoRepository;
//# sourceMappingURL=boletoRepository.js.map