import { AlbumRepository } from '../repositories/albumRepository';
import { Album, IAlbumData } from '../models/Album';

/**
 * Servicio para la gestión de álbumes
 * Contiene la lógica de negocio para álbumes
 */
export class AlbumService {
  private albumRepository: AlbumRepository;

  constructor() {
    this.albumRepository = new AlbumRepository();
  }

  /**
   * Valida los datos del álbum
   */
  private validarDatosAlbum(albumData: {
    fontImageUrl: string;
    titulo: string;
    lanzamiento: Date | string;
    genero: string;
    artistaId: number;
  }): void {
    if (!albumData.fontImageUrl || albumData.fontImageUrl.trim().length === 0) {
      throw new Error('La URL de la imagen de portada es requerida');
    }

    if (albumData.fontImageUrl.length > 500) {
      throw new Error('La URL de la imagen no puede exceder 500 caracteres');
    }

    if (!albumData.titulo || albumData.titulo.trim().length === 0) {
      throw new Error('El título del álbum es requerido');
    }

    if (albumData.titulo.length > 200) {
      throw new Error('El título no puede exceder 200 caracteres');
    }

    if (!albumData.lanzamiento) {
      throw new Error('La fecha de lanzamiento es requerida');
    }

    const fecha = typeof albumData.lanzamiento === 'string' ? new Date(albumData.lanzamiento) : albumData.lanzamiento;
    if (isNaN(fecha.getTime())) {
      throw new Error('La fecha de lanzamiento no es válida');
    }

    if (!albumData.genero || albumData.genero.trim().length === 0) {
      throw new Error('El género es requerido');
    }

    if (albumData.genero.length > 100) {
      throw new Error('El género no puede exceder 100 caracteres');
    }

    if (!albumData.artistaId || albumData.artistaId <= 0) {
      throw new Error('El ID del artista es requerido y debe ser válido');
    }
  }

  /**
   * Crea un nuevo álbum
   */
  async crearAlbum(albumData: {
    fontImageUrl: string;
    titulo: string;
    lanzamiento: Date | string;
    genero: string;
    artistaId: number;
  }): Promise<IAlbumData> {
    // Validar datos
    this.validarDatosAlbum(albumData);

    // Crear instancia de Album
    const album = new Album({
      fontImageUrl: albumData.fontImageUrl,
      titulo: albumData.titulo,
      lanzamiento: typeof albumData.lanzamiento === 'string' ? new Date(albumData.lanzamiento) : albumData.lanzamiento,
      genero: albumData.genero,
      artistaId: albumData.artistaId,
    });

    // Guardar en el repositorio
    const albumCreado = await this.albumRepository.save(album);
    return albumCreado.toJSON();
  }

  /**
   * Obtiene un álbum por su ID
   */
  async obtenerAlbumPorId(id: number): Promise<IAlbumData | null> {
    if (id <= 0) {
      throw new Error('El ID del álbum debe ser válido');
    }

    const album = await this.albumRepository.findById(id);
    return album ? album.toJSON() : null;
  }

  /**
   * Obtiene todos los álbumes
   */
  async obtenerTodosLosAlbums(): Promise<IAlbumData[]> {
    const albums = await this.albumRepository.findMany();
    return albums.map((album) => album.toJSON());
  }

  /**
   * Obtiene álbumes por artista
   */
  async obtenerAlbumsPorArtista(artistaId: number): Promise<IAlbumData[]> {
    if (artistaId <= 0) {
      throw new Error('El ID del artista debe ser válido');
    }

    const albums = await this.albumRepository.findByArtistaId(artistaId);
    return albums.map((album) => album.toJSON());
  }

  /**
   * Obtiene álbumes por género
   */
  async obtenerAlbumsPorGenero(genero: string): Promise<IAlbumData[]> {
    if (!genero || genero.trim().length === 0) {
      throw new Error('El género es requerido');
    }

    const albums = await this.albumRepository.findByGenero(genero);
    return albums.map((album) => album.toJSON());
  }

  /**
   * Actualiza un álbum
   */
  async actualizarAlbum(
    id: number,
    datosActualizar: {
      fontImageUrl?: string;
      titulo?: string;
      lanzamiento?: Date | string;
      genero?: string;
      artistaId?: number;
    }
  ): Promise<IAlbumData | null> {
    if (id <= 0) {
      throw new Error('El ID del álbum debe ser válido');
    }

    // Obtener álbum actual
    const albumActual = await this.albumRepository.findById(id);
    if (!albumActual) {
      return null;
    }

    // Validar cambios si se proporcionan
    if (datosActualizar.fontImageUrl !== undefined) {
      if (datosActualizar.fontImageUrl.trim().length === 0) {
        throw new Error('La URL de la imagen de portada no puede estar vacía');
      }
      if (datosActualizar.fontImageUrl.length > 500) {
        throw new Error('La URL de la imagen no puede exceder 500 caracteres');
      }
    }

    if (datosActualizar.titulo !== undefined) {
      if (datosActualizar.titulo.trim().length === 0) {
        throw new Error('El título no puede estar vacío');
      }
      if (datosActualizar.titulo.length > 200) {
        throw new Error('El título no puede exceder 200 caracteres');
      }
    }

    if (datosActualizar.lanzamiento !== undefined) {
      const fecha =
        typeof datosActualizar.lanzamiento === 'string'
          ? new Date(datosActualizar.lanzamiento)
          : datosActualizar.lanzamiento;
      if (isNaN(fecha.getTime())) {
        throw new Error('La fecha de lanzamiento no es válida');
      }
    }

    if (datosActualizar.genero !== undefined) {
      if (datosActualizar.genero.trim().length === 0) {
        throw new Error('El género no puede estar vacío');
      }
      if (datosActualizar.genero.length > 100) {
        throw new Error('El género no puede exceder 100 caracteres');
      }
    }

    if (datosActualizar.artistaId !== undefined && datosActualizar.artistaId <= 0) {
      throw new Error('El ID del artista debe ser válido');
    }

    // Preparar datos para actualizar
    const datosParaActualizar: any = {};

    if (datosActualizar.fontImageUrl !== undefined) {
      datosParaActualizar.fontImageUrl = datosActualizar.fontImageUrl;
    }
    if (datosActualizar.titulo !== undefined) {
      datosParaActualizar.titulo = datosActualizar.titulo;
    }
    if (datosActualizar.lanzamiento !== undefined) {
      datosParaActualizar.lanzamiento =
        typeof datosActualizar.lanzamiento === 'string'
          ? new Date(datosActualizar.lanzamiento)
          : datosActualizar.lanzamiento;
    }
    if (datosActualizar.genero !== undefined) {
      datosParaActualizar.genero = datosActualizar.genero;
    }
    if (datosActualizar.artistaId !== undefined) {
      datosParaActualizar.artistaId = datosActualizar.artistaId;
    }

    const resultado = await this.albumRepository.update(id, datosParaActualizar);
    if (!resultado) {
      return null;
    }
    return resultado.toJSON();
  }

  /**
   * Elimina un álbum
   */
  async eliminarAlbum(id: number): Promise<boolean> {
    if (id <= 0) {
      throw new Error('El ID del álbum debe ser válido');
    }

    const album = await this.albumRepository.findById(id);
    if (!album) {
      return false;
    }

    await this.albumRepository.delete(id);
    return true;
  }

  /**
   * Cuenta el total de álbumes
   */
  async contarAlbums(): Promise<number> {
    return await this.albumRepository.count();
  }

  /**
   * Cuenta álbumes por artista
   */
  async contarAlbumsPorArtista(artistaId: number): Promise<number> {
    if (artistaId <= 0) {
      throw new Error('El ID del artista debe ser válido');
    }

    return await this.albumRepository.countByArtista(artistaId);
  }
}
