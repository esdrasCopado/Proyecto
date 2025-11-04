"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumController = void 0;
const albumService_1 = require("../services/albumService");
/**
 * Controlador para gestión de álbumes
 */
class AlbumController {
    constructor() {
        /**
         * POST /api/albums
         * Crea un nuevo álbum
         */
        this.create = async (req, res) => {
            try {
                const { fontImageUrl, titulo, lanzamiento, genero, artistaId } = req.body;
                if (!fontImageUrl || !titulo || !lanzamiento || !genero || !artistaId) {
                    return this.errorResponse(res, new Error('Faltan campos requeridos: fontImageUrl, titulo, lanzamiento, genero, artistaId'), 400);
                }
                const nuevoAlbum = await this.albumService.crearAlbum({
                    fontImageUrl,
                    titulo,
                    lanzamiento,
                    genero,
                    artistaId: parseInt(artistaId),
                });
                return this.successResponse(res, nuevoAlbum, 'Álbum creado exitosamente', 201);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/albums/:id
         * Obtiene un álbum por su ID
         */
        this.findById = async (req, res) => {
            try {
                const albumId = this.validarNumero(req.params.id, 'ID del álbum');
                const album = await this.albumService.obtenerAlbumPorId(albumId);
                if (!album) {
                    return this.errorResponse(res, new Error('Álbum no encontrado'), 404);
                }
                return this.successResponse(res, album);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/albums
         * Obtiene todos los álbumes
         */
        this.findAll = async (req, res) => {
            try {
                const albums = await this.albumService.obtenerTodosLosAlbums();
                return this.successResponse(res, albums, `${albums.length} álbumes encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/albums/artista/:artistaId
         * Obtiene álbumes de un artista
         */
        this.findByArtista = async (req, res) => {
            try {
                const artistaId = this.validarNumero(req.params.artistaId, 'ID del artista');
                const albums = await this.albumService.obtenerAlbumsPorArtista(artistaId);
                return this.successResponse(res, albums, `${albums.length} álbumes encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/albums/genero/:genero
         * Obtiene álbumes por género
         */
        this.findByGenero = async (req, res) => {
            try {
                const { genero } = req.params;
                const albums = await this.albumService.obtenerAlbumsPorGenero(genero);
                return this.successResponse(res, albums, `${albums.length} álbumes encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * PUT /api/albums/:id
         * Actualiza un álbum
         */
        this.update = async (req, res) => {
            try {
                const albumId = this.validarNumero(req.params.id, 'ID del álbum');
                const { fontImageUrl, titulo, lanzamiento, genero, artistaId } = req.body;
                if (!fontImageUrl && !titulo && !lanzamiento && !genero && !artistaId) {
                    return this.errorResponse(res, new Error('Debe proporcionar al menos un campo para actualizar'), 400);
                }
                const datosActualizar = {};
                if (fontImageUrl)
                    datosActualizar.fontImageUrl = fontImageUrl;
                if (titulo)
                    datosActualizar.titulo = titulo;
                if (lanzamiento)
                    datosActualizar.lanzamiento = lanzamiento;
                if (genero)
                    datosActualizar.genero = genero;
                if (artistaId)
                    datosActualizar.artistaId = parseInt(artistaId);
                const albumActualizado = await this.albumService.actualizarAlbum(albumId, datosActualizar);
                if (!albumActualizado) {
                    return this.errorResponse(res, new Error('Álbum no encontrado'), 404);
                }
                return this.successResponse(res, albumActualizado, 'Álbum actualizado exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * DELETE /api/albums/:id
         * Elimina un álbum
         */
        this.delete = async (req, res) => {
            try {
                const albumId = this.validarNumero(req.params.id, 'ID del álbum');
                const eliminado = await this.albumService.eliminarAlbum(albumId);
                if (!eliminado) {
                    return this.errorResponse(res, new Error('Álbum no encontrado'), 404);
                }
                return this.successResponse(res, null, 'Álbum eliminado exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/albums/count
         * Obtiene el conteo total de álbumes
         */
        this.getCount = async (req, res) => {
            try {
                const total = await this.albumService.contarAlbums();
                return this.successResponse(res, { total }, `Total de álbumes: ${total}`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        this.albumService = new albumService_1.AlbumService();
    }
    /**
     * Formato de respuesta estándar para éxito
     */
    successResponse(res, data, message, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message: message || 'Operación exitosa',
            data,
        });
    }
    /**
     * Formato de respuesta estándar para error
     */
    errorResponse(res, error, statusCode = 500) {
        let code = statusCode;
        let message = error.message || 'Error en la operación';
        if (message.includes('no encontrado')) {
            code = 404;
        }
        else if (message.includes('no existe')) {
            code = 404;
        }
        else if (message.includes('inválido') || message.includes('requerido')) {
            code = 400;
        }
        return res.status(code).json({
            success: false,
            message,
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
    }
    /**
     * Valida que un parámetro sea un número válido
     */
    validarNumero(valor, nombreCampo) {
        const numero = parseInt(valor, 10);
        if (isNaN(numero) || numero <= 0) {
            throw new Error(`${nombreCampo} debe ser un número válido y mayor a 0`);
        }
        return numero;
    }
}
exports.AlbumController = AlbumController;
//# sourceMappingURL=albumController.js.map