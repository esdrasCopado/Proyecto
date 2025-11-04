import { Request, Response } from 'express';
import { SongService } from '../services/songService';

/**
 * Controlador para gestión de canciones
 */
export class SongController {
  private songService: SongService;

  constructor() {
    this.songService = new SongService();
  }

  /**
   * Formato de respuesta estándar para éxito
   */
  private successResponse(res: Response, data: any, message?: string, statusCode: number = 200): Response {
    return res.status(statusCode).json({
      success: true,
      message: message || 'Operación exitosa',
      data,
    });
  }

  /**
   * Formato de respuesta estándar para error
   */
  private errorResponse(res: Response, error: any, statusCode: number = 500): Response {
    let code = statusCode;
    let message = error.message || 'Error en la operación';

    if (message.includes('no encontrado') || message.includes('no encontrada')) {
      code = 404;
    } else if (message.includes('no existe')) {
      code = 404;
    } else if (message.includes('inválido') || message.includes('requerido')) {
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
  private validarNumero(valor: string, nombreCampo: string): number {
    const numero = parseInt(valor, 10);
    if (isNaN(numero) || numero <= 0) {
      throw new Error(`${nombreCampo} debe ser un número válido y mayor a 0`);
    }
    return numero;
  }

  /**
   * POST /api/songs
   * Crea una nueva canción
   */
  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { fontImageUrl, videoUrl, titulo, duracion, albumId } = req.body;

      if (!fontImageUrl || !titulo || !duracion || !albumId) {
        return this.errorResponse(
          res,
          new Error('Faltan campos requeridos: fontImageUrl, titulo, duracion, albumId'),
          400
        );
      }

      const nuevaSong = await this.songService.crearSong({
        fontImageUrl,
        videoUrl,
        titulo,
        duracion: parseInt(duracion),
        albumId: parseInt(albumId),
      });

      return this.successResponse(res, nuevaSong, 'Canción creada exitosamente', 201);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * GET /api/songs/:id
   * Obtiene una canción por su ID
   */
  public findById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const songId = this.validarNumero(req.params.id, 'ID de la canción');
      const song = await this.songService.obtenerSongPorId(songId);

      if (!song) {
        return this.errorResponse(res, new Error('Canción no encontrada'), 404);
      }

      return this.successResponse(res, song);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * GET /api/songs
   * Obtiene todas las canciones
   */
  public findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const songs = await this.songService.obtenerTodasLasSongs();
      return this.successResponse(res, songs, `${songs.length} canciones encontradas`);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * GET /api/songs/album/:albumId
   * Obtiene canciones de un álbum
   */
  public findByAlbum = async (req: Request, res: Response): Promise<Response> => {
    try {
      const albumId = this.validarNumero(req.params.albumId, 'ID del álbum');
      const songs = await this.songService.obtenerSongsPorAlbum(albumId);

      return this.successResponse(res, songs, `${songs.length} canciones encontradas`);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * GET /api/songs/buscar/:titulo
   * Busca canciones por título
   */
  public searchByTitulo = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { titulo } = req.params;
      const songs = await this.songService.buscarSongsPorTitulo(titulo);

      return this.successResponse(res, songs, `${songs.length} canciones encontradas`);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * GET /api/songs/con-video
   * Obtiene canciones con video
   */
  public findWithVideo = async (req: Request, res: Response): Promise<Response> => {
    try {
      const songs = await this.songService.obtenerSongsConVideo();
      return this.successResponse(res, songs, `${songs.length} canciones con video encontradas`);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * PUT /api/songs/:id
   * Actualiza una canción
   */
  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const songId = this.validarNumero(req.params.id, 'ID de la canción');
      const { fontImageUrl, videoUrl, titulo, duracion, albumId } = req.body;

      if (!fontImageUrl && !titulo && !duracion && !albumId && videoUrl === undefined) {
        return this.errorResponse(
          res,
          new Error('Debe proporcionar al menos un campo para actualizar'),
          400
        );
      }

      const datosActualizar: any = {};
      if (fontImageUrl) datosActualizar.fontImageUrl = fontImageUrl;
      if (videoUrl !== undefined) datosActualizar.videoUrl = videoUrl;
      if (titulo) datosActualizar.titulo = titulo;
      if (duracion) datosActualizar.duracion = parseInt(duracion);
      if (albumId) datosActualizar.albumId = parseInt(albumId);

      const songActualizada = await this.songService.actualizarSong(songId, datosActualizar);

      if (!songActualizada) {
        return this.errorResponse(res, new Error('Canción no encontrada'), 404);
      }

      return this.successResponse(res, songActualizada, 'Canción actualizada exitosamente');
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * DELETE /api/songs/:id
   * Elimina una canción
   */
  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const songId = this.validarNumero(req.params.id, 'ID de la canción');
      const eliminado = await this.songService.eliminarSong(songId);

      if (!eliminado) {
        return this.errorResponse(res, new Error('Canción no encontrada'), 404);
      }

      return this.successResponse(res, null, 'Canción eliminada exitosamente');
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * GET /api/songs/count
   * Obtiene el conteo total de canciones
   */
  public getCount = async (req: Request, res: Response): Promise<Response> => {
    try {
      const total = await this.songService.contarSongs();
      return this.successResponse(res, { total }, `Total de canciones: ${total}`);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };
}
