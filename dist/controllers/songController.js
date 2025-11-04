"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongController = void 0;
const songService_1 = require("../services/songService");
/**
 * Controlador para gestión de canciones
 */
class SongController {
    constructor() {
        /**
         * POST /api/songs
         * Crea una nueva canción
         */
        this.create = async (req, res) => {
            try {
                const { fontImageUrl, videoUrl, titulo, duracion, albumId } = req.body;
                if (!fontImageUrl || !titulo || !duracion || !albumId) {
                    return this.errorResponse(res, new Error('Faltan campos requeridos: fontImageUrl, titulo, duracion, albumId'), 400);
                }
                const nuevaSong = await this.songService.crearSong({
                    fontImageUrl,
                    videoUrl,
                    titulo,
                    duracion: parseInt(duracion),
                    albumId: parseInt(albumId),
                });
                return this.successResponse(res, nuevaSong, 'Canción creada exitosamente', 201);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/songs/:id
         * Obtiene una canción por su ID
         */
        this.findById = async (req, res) => {
            try {
                const songId = this.validarNumero(req.params.id, 'ID de la canción');
                const song = await this.songService.obtenerSongPorId(songId);
                if (!song) {
                    return this.errorResponse(res, new Error('Canción no encontrada'), 404);
                }
                return this.successResponse(res, song);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/songs
         * Obtiene todas las canciones
         */
        this.findAll = async (req, res) => {
            try {
                const songs = await this.songService.obtenerTodasLasSongs();
                return this.successResponse(res, songs, `${songs.length} canciones encontradas`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/songs/album/:albumId
         * Obtiene canciones de un álbum
         */
        this.findByAlbum = async (req, res) => {
            try {
                const albumId = this.validarNumero(req.params.albumId, 'ID del álbum');
                const songs = await this.songService.obtenerSongsPorAlbum(albumId);
                return this.successResponse(res, songs, `${songs.length} canciones encontradas`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/songs/buscar/:titulo
         * Busca canciones por título
         */
        this.searchByTitulo = async (req, res) => {
            try {
                const { titulo } = req.params;
                const songs = await this.songService.buscarSongsPorTitulo(titulo);
                return this.successResponse(res, songs, `${songs.length} canciones encontradas`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/songs/con-video
         * Obtiene canciones con video
         */
        this.findWithVideo = async (req, res) => {
            try {
                const songs = await this.songService.obtenerSongsConVideo();
                return this.successResponse(res, songs, `${songs.length} canciones con video encontradas`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * PUT /api/songs/:id
         * Actualiza una canción
         */
        this.update = async (req, res) => {
            try {
                const songId = this.validarNumero(req.params.id, 'ID de la canción');
                const { fontImageUrl, videoUrl, titulo, duracion, albumId } = req.body;
                if (!fontImageUrl && !titulo && !duracion && !albumId && videoUrl === undefined) {
                    return this.errorResponse(res, new Error('Debe proporcionar al menos un campo para actualizar'), 400);
                }
                const datosActualizar = {};
                if (fontImageUrl)
                    datosActualizar.fontImageUrl = fontImageUrl;
                if (videoUrl !== undefined)
                    datosActualizar.videoUrl = videoUrl;
                if (titulo)
                    datosActualizar.titulo = titulo;
                if (duracion)
                    datosActualizar.duracion = parseInt(duracion);
                if (albumId)
                    datosActualizar.albumId = parseInt(albumId);
                const songActualizada = await this.songService.actualizarSong(songId, datosActualizar);
                if (!songActualizada) {
                    return this.errorResponse(res, new Error('Canción no encontrada'), 404);
                }
                return this.successResponse(res, songActualizada, 'Canción actualizada exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * DELETE /api/songs/:id
         * Elimina una canción
         */
        this.delete = async (req, res) => {
            try {
                const songId = this.validarNumero(req.params.id, 'ID de la canción');
                const eliminado = await this.songService.eliminarSong(songId);
                if (!eliminado) {
                    return this.errorResponse(res, new Error('Canción no encontrada'), 404);
                }
                return this.successResponse(res, null, 'Canción eliminada exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/songs/count
         * Obtiene el conteo total de canciones
         */
        this.getCount = async (req, res) => {
            try {
                const total = await this.songService.contarSongs();
                return this.successResponse(res, { total }, `Total de canciones: ${total}`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        this.songService = new songService_1.SongService();
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
        if (message.includes('no encontrado') || message.includes('no encontrada')) {
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
exports.SongController = SongController;
//# sourceMappingURL=songController.js.map