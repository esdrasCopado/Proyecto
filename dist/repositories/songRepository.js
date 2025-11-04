"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongRepository = void 0;
const Song_1 = require("../models/Song");
const database_1 = __importDefault(require("../config/database"));
/**
 * Repositorio para gestión de canciones en la base de datos
 */
class SongRepository {
    /**
     * Guarda una nueva canción en la base de datos
     */
    async save(song) {
        try {
            const nuevaSong = await database_1.default.song.create({
                data: {
                    fontImageUrl: song.fontImageUrl,
                    videoUrl: song.videoUrl,
                    titulo: song.titulo,
                    duracion: song.duracion,
                    albumId: song.albumId,
                },
            });
            return Song_1.Song.fromDatabase(nuevaSong);
        }
        catch (error) {
            throw new Error('Error al guardar la canción: ' + error.message);
        }
    }
    /**
     * Encuentra todas las canciones
     */
    async findMany() {
        try {
            const songs = await database_1.default.song.findMany({
                orderBy: {
                    id: 'asc',
                },
            });
            return songs.map((song) => Song_1.Song.fromDatabase(song));
        }
        catch (error) {
            throw new Error('Error al obtener las canciones: ' + error.message);
        }
    }
    /**
     * Encuentra una canción por ID
     */
    async findById(id) {
        try {
            const song = await database_1.default.song.findUnique({
                where: { id },
            });
            return song ? Song_1.Song.fromDatabase(song) : null;
        }
        catch (error) {
            throw new Error('Error al buscar la canción: ' + error.message);
        }
    }
    /**
     * Encuentra canciones por álbum
     */
    async findByAlbumId(albumId) {
        try {
            const songs = await database_1.default.song.findMany({
                where: { albumId },
                orderBy: {
                    id: 'asc',
                },
            });
            return songs.map((song) => Song_1.Song.fromDatabase(song));
        }
        catch (error) {
            throw new Error('Error al buscar canciones del álbum: ' + error.message);
        }
    }
    /**
     * Busca canciones por título
     */
    async findByTitulo(titulo) {
        try {
            const songs = await database_1.default.song.findMany({
                where: {
                    titulo: {
                        contains: titulo,
                    },
                },
            });
            return songs.map((song) => Song_1.Song.fromDatabase(song));
        }
        catch (error) {
            throw new Error('Error al buscar canciones por título: ' + error.message);
        }
    }
    /**
     * Encuentra canciones con video
     */
    async findWithVideo() {
        try {
            const songs = await database_1.default.song.findMany({
                where: {
                    videoUrl: {
                        not: null,
                    },
                },
            });
            return songs.map((song) => Song_1.Song.fromDatabase(song));
        }
        catch (error) {
            throw new Error('Error al buscar canciones con video: ' + error.message);
        }
    }
    /**
     * Actualiza una canción
     */
    async update(id, datos) {
        try {
            const songActualizada = await database_1.default.song.update({
                where: { id },
                data: datos,
            });
            return Song_1.Song.fromDatabase(songActualizada);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return null;
            }
            throw new Error('Error al actualizar la canción: ' + error.message);
        }
    }
    /**
     * Elimina una canción
     */
    async delete(id) {
        try {
            await database_1.default.song.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new Error('La canción no existe');
            }
            throw new Error('Error al eliminar la canción: ' + error.message);
        }
    }
    /**
     * Cuenta el total de canciones
     */
    async count() {
        try {
            return await database_1.default.song.count();
        }
        catch (error) {
            throw new Error('Error al contar canciones: ' + error.message);
        }
    }
    /**
     * Cuenta canciones por álbum
     */
    async countByAlbum(albumId) {
        try {
            return await database_1.default.song.count({
                where: { albumId },
            });
        }
        catch (error) {
            throw new Error('Error al contar canciones del álbum: ' + error.message);
        }
    }
    /**
     * Obtiene la duración total de un álbum
     */
    async getTotalDuracionByAlbum(albumId) {
        try {
            const result = await database_1.default.song.aggregate({
                where: { albumId },
                _sum: {
                    duracion: true,
                },
            });
            return result._sum.duracion || 0;
        }
        catch (error) {
            throw new Error('Error al calcular duración total: ' + error.message);
        }
    }
}
exports.SongRepository = SongRepository;
//# sourceMappingURL=songRepository.js.map