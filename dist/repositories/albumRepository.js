"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumRepository = void 0;
const Album_1 = require("../models/Album");
const database_1 = __importDefault(require("../config/database"));
/**
 * Repositorio para gestión de álbumes en la base de datos
 */
class AlbumRepository {
    /**
     * Guarda un nuevo álbum en la base de datos
     */
    async save(album) {
        try {
            const nuevoAlbum = await database_1.default.album.create({
                data: {
                    fontImageUrl: album.fontImageUrl,
                    titulo: album.titulo,
                    lanzamiento: album.lanzamiento,
                    genero: album.genero,
                    artistaId: album.artistaId,
                },
            });
            return Album_1.Album.fromDatabase(nuevoAlbum);
        }
        catch (error) {
            throw new Error('Error al guardar el álbum: ' + error.message);
        }
    }
    /**
     * Encuentra todos los álbumes
     */
    async findMany() {
        try {
            const albums = await database_1.default.album.findMany({
                orderBy: {
                    lanzamiento: 'desc',
                },
            });
            return albums.map((album) => Album_1.Album.fromDatabase(album));
        }
        catch (error) {
            throw new Error('Error al obtener los álbumes: ' + error.message);
        }
    }
    /**
     * Encuentra un álbum por ID
     */
    async findById(id) {
        try {
            const album = await database_1.default.album.findUnique({
                where: { id },
            });
            return album ? Album_1.Album.fromDatabase(album) : null;
        }
        catch (error) {
            throw new Error('Error al buscar el álbum: ' + error.message);
        }
    }
    /**
     * Encuentra álbumes por artista
     */
    async findByArtistaId(artistaId) {
        try {
            const albums = await database_1.default.album.findMany({
                where: { artistaId },
                orderBy: {
                    lanzamiento: 'desc',
                },
            });
            return albums.map((album) => Album_1.Album.fromDatabase(album));
        }
        catch (error) {
            throw new Error('Error al buscar álbumes del artista: ' + error.message);
        }
    }
    /**
     * Encuentra álbumes por género
     */
    async findByGenero(genero) {
        try {
            const albums = await database_1.default.album.findMany({
                where: {
                    genero: {
                        contains: genero,
                    },
                },
                orderBy: {
                    lanzamiento: 'desc',
                },
            });
            return albums.map((album) => Album_1.Album.fromDatabase(album));
        }
        catch (error) {
            throw new Error('Error al buscar álbumes por género: ' + error.message);
        }
    }
    /**
     * Actualiza un álbum
     */
    async update(id, datos) {
        try {
            const albumActualizado = await database_1.default.album.update({
                where: { id },
                data: datos,
            });
            return Album_1.Album.fromDatabase(albumActualizado);
        }
        catch (error) {
            if (error.code === 'P2025') {
                return null;
            }
            throw new Error('Error al actualizar el álbum: ' + error.message);
        }
    }
    /**
     * Elimina un álbum
     */
    async delete(id) {
        try {
            await database_1.default.album.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new Error('El álbum no existe');
            }
            throw new Error('Error al eliminar el álbum: ' + error.message);
        }
    }
    /**
     * Cuenta el total de álbumes
     */
    async count() {
        try {
            return await database_1.default.album.count();
        }
        catch (error) {
            throw new Error('Error al contar álbumes: ' + error.message);
        }
    }
    /**
     * Cuenta álbumes por artista
     */
    async countByArtista(artistaId) {
        try {
            return await database_1.default.album.count({
                where: { artistaId },
            });
        }
        catch (error) {
            throw new Error('Error al contar álbumes del artista: ' + error.message);
        }
    }
}
exports.AlbumRepository = AlbumRepository;
//# sourceMappingURL=albumRepository.js.map