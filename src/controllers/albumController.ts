import { Request, Response } from 'express';
import { AlbumService } from '../services/albumService';

/**
 * Controlador para gestión de álbumes
 */
export class AlbumController {
  private albumService: AlbumService;

  constructor() {
    this.albumService = new AlbumService();
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

    if (message.includes('no encontrado')) {
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
   * POST /api/albums
   * Crea un nuevo álbum
   */
  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { fontImageUrl, titulo, lanzamiento, genero, artistaId } = req.body;

      if (!fontImageUrl || !titulo || !lanzamiento || !genero || !artistaId) {
        return this.errorResponse(
          res,
          new Error('Faltan campos requeridos: fontImageUrl, titulo, lanzamiento, genero, artistaId'),
          400
        );
      }

      const nuevoAlbum = await this.albumService.crearAlbum({
        fontImageUrl,
        titulo,
        lanzamiento,
        genero,
        artistaId: parseInt(artistaId),
      });

      return this.successResponse(res, nuevoAlbum, 'Álbum creado exitosamente', 201);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * GET /api/albums/:id
   * Obtiene un álbum por su ID
   */
  public findById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const albumId = this.validarNumero(req.params.id, 'ID del álbum');
      const album = await this.albumService.obtenerAlbumPorId(albumId);

      if (!album) {
        return this.errorResponse(res, new Error('Álbum no encontrado'), 404);
      }

      return this.successResponse(res, album);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * GET /api/albums
   * Obtiene todos los álbumes
   */
  public findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const albums = await this.albumService.obtenerTodosLosAlbums();
      return this.successResponse(res, albums, `${albums.length} álbumes encontrados`);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * GET /api/albums/artista/:artistaId
   * Obtiene álbumes de un artista
   */
  public findByArtista = async (req: Request, res: Response): Promise<Response> => {
    try {
      const artistaId = this.validarNumero(req.params.artistaId, 'ID del artista');
      const albums = await this.albumService.obtenerAlbumsPorArtista(artistaId);

      return this.successResponse(res, albums, `${albums.length} álbumes encontrados`);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * GET /api/albums/genero/:genero
   * Obtiene álbumes por género
   */
  public findByGenero = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { genero } = req.params;
      const albums = await this.albumService.obtenerAlbumsPorGenero(genero);

      return this.successResponse(res, albums, `${albums.length} álbumes encontrados`);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * PUT /api/albums/:id
   * Actualiza un álbum
   */
  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const albumId = this.validarNumero(req.params.id, 'ID del álbum');
      const { fontImageUrl, titulo, lanzamiento, genero, artistaId } = req.body;

      if (!fontImageUrl && !titulo && !lanzamiento && !genero && !artistaId) {
        return this.errorResponse(
          res,
          new Error('Debe proporcionar al menos un campo para actualizar'),
          400
        );
      }

      const datosActualizar: any = {};
      if (fontImageUrl) datosActualizar.fontImageUrl = fontImageUrl;
      if (titulo) datosActualizar.titulo = titulo;
      if (lanzamiento) datosActualizar.lanzamiento = lanzamiento;
      if (genero) datosActualizar.genero = genero;
      if (artistaId) datosActualizar.artistaId = parseInt(artistaId);

      const albumActualizado = await this.albumService.actualizarAlbum(albumId, datosActualizar);

      if (!albumActualizado) {
        return this.errorResponse(res, new Error('Álbum no encontrado'), 404);
      }

      return this.successResponse(res, albumActualizado, 'Álbum actualizado exitosamente');
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * DELETE /api/albums/:id
   * Elimina un álbum
   */
  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const albumId = this.validarNumero(req.params.id, 'ID del álbum');
      const eliminado = await this.albumService.eliminarAlbum(albumId);

      if (!eliminado) {
        return this.errorResponse(res, new Error('Álbum no encontrado'), 404);
      }

      return this.successResponse(res, null, 'Álbum eliminado exitosamente');
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };

  /**
   * GET /api/albums/count
   * Obtiene el conteo total de álbumes
   */
  public getCount = async (req: Request, res: Response): Promise<Response> => {
    try {
      const total = await this.albumService.contarAlbums();
      return this.successResponse(res, { total }, `Total de álbumes: ${total}`);
    } catch (error: any) {
      return this.errorResponse(res, error);
    }
  };
}
