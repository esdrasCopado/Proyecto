"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistaRepository = void 0;
const Artista_1 = require("../models/Artista");
const database_1 = __importDefault(require("../config/database"));
class ArtistaRepository {
    async save(artista) {
        try {
            const exist = await database_1.default.artista.findFirst({
                where: { nombre: artista.nombre }
            });
            if (exist) {
                throw new Error('El artista ya existe');
            }
            const newArtista = await database_1.default.artista.create({
                data: {
                    nombre: artista.nombre,
                    genero: artista.genero,
                    contacto: artista.contacto,
                    paisOrigen: artista.paisOrigen,
                    fechaDebut: artista.fechaDebut,
                    disquera: artista.disquera,
                }
            });
            return Artista_1.Artista.fromDatabase(newArtista);
        }
        catch (error) {
            throw new Error("Error al guardar el artista: " + error.message);
        }
    }
    async findMany() {
        const artistas = await database_1.default.artista.findMany();
        return artistas.map(artista => Artista_1.Artista.fromDatabase(artista));
    }
    async findById(id) {
        const artista = await database_1.default.artista.findUnique({
            where: { id }
        });
        return artista ? Artista_1.Artista.fromDatabase(artista) : null;
    }
    async update(id, artista) {
        try {
            const updatedArtista = await database_1.default.artista.update({
                where: { id },
                data: {
                    ...artista
                }
            });
            return Artista_1.Artista.fromDatabase(updatedArtista);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return null;
            }
            throw new Error("Error al actualizar el artista: " + error.message);
        }
    }
    async delete(id) {
        try {
            await database_1.default.artista.delete({
                where: { id }
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new Error('El artista no existe');
            }
            throw new Error("Error al eliminar el artista: " + error.message);
        }
    }
}
exports.ArtistaRepository = ArtistaRepository;
//# sourceMappingURL=artistaRepository.js.map