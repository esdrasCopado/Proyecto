import { SongRepository } from '../repositories/songRepository';
import { Song, ISongData } from '../models/Song';

/**
 * Servicio para la gestión de canciones
 * Contiene la lógica de negocio para canciones
 */
export class SongService {
  private songRepository: SongRepository;

  constructor() {
    this.songRepository = new SongRepository();
  }

  /**
   * Valida los datos de la canción
   */
  private validarDatosSong(songData: {
    fontImageUrl: string;
    videoUrl?: string | null;
    titulo: string;
    duracion: number;
    albumId: number;
  }): void {
    if (!songData.fontImageUrl || songData.fontImageUrl.trim().length === 0) {
      throw new Error('La URL de la imagen es requerida');
    }

    if (songData.fontImageUrl.length > 500) {
      throw new Error('La URL de la imagen no puede exceder 500 caracteres');
    }

    if (!songData.titulo || songData.titulo.trim().length === 0) {
      throw new Error('El título de la canción es requerido');
    }

    if (songData.titulo.length > 200) {
      throw new Error('El título no puede exceder 200 caracteres');
    }

    if (!songData.duracion || songData.duracion <= 0) {
      throw new Error('La duración debe ser mayor a 0 segundos');
    }

    if (songData.duracion > 7200) {
      throw new Error('La duración no puede exceder 7200 segundos (2 horas)');
    }

    if (!songData.albumId || songData.albumId <= 0) {
      throw new Error('El ID del álbum es requerido y debe ser válido');
    }

    if (songData.videoUrl && songData.videoUrl.length > 500) {
      throw new Error('La URL del video no puede exceder 500 caracteres');
    }
  }

  /**
   * Crea una nueva canción
   */
  async crearSong(songData: {
    fontImageUrl: string;
    videoUrl?: string | null;
    titulo: string;
    duracion: number;
    albumId: number;
  }): Promise<ISongData> {
    // Validar datos
    this.validarDatosSong(songData);

    // Crear instancia de Song
    const song = new Song({
      fontImageUrl: songData.fontImageUrl,
      videoUrl: songData.videoUrl,
      titulo: songData.titulo,
      duracion: songData.duracion,
      albumId: songData.albumId,
    });

    // Guardar en el repositorio
    const songCreada = await this.songRepository.save(song);
    return songCreada.toJSON();
  }

  /**
   * Obtiene una canción por su ID
   */
  async obtenerSongPorId(id: number): Promise<ISongData | null> {
    if (id <= 0) {
      throw new Error('El ID de la canción debe ser válido');
    }

    const song = await this.songRepository.findById(id);
    return song ? song.toJSON() : null;
  }

  /**
   * Obtiene todas las canciones
   */
  async obtenerTodasLasSongs(): Promise<ISongData[]> {
    const songs = await this.songRepository.findMany();
    return songs.map((song) => song.toJSON());
  }

  /**
   * Obtiene canciones por álbum
   */
  async obtenerSongsPorAlbum(albumId: number): Promise<ISongData[]> {
    if (albumId <= 0) {
      throw new Error('El ID del álbum debe ser válido');
    }

    const songs = await this.songRepository.findByAlbumId(albumId);
    return songs.map((song) => song.toJSON());
  }

  /**
   * Busca canciones por título
   */
  async buscarSongsPorTitulo(titulo: string): Promise<ISongData[]> {
    if (!titulo || titulo.trim().length === 0) {
      throw new Error('El título es requerido para la búsqueda');
    }

    const songs = await this.songRepository.findByTitulo(titulo);
    return songs.map((song) => song.toJSON());
  }

  /**
   * Obtiene canciones con video
   */
  async obtenerSongsConVideo(): Promise<ISongData[]> {
    const songs = await this.songRepository.findWithVideo();
    return songs.map((song) => song.toJSON());
  }

  /**
   * Actualiza una canción
   */
  async actualizarSong(
    id: number,
    datosActualizar: {
      fontImageUrl?: string;
      videoUrl?: string | null;
      titulo?: string;
      duracion?: number;
      albumId?: number;
    }
  ): Promise<ISongData | null> {
    if (id <= 0) {
      throw new Error('El ID de la canción debe ser válido');
    }

    // Obtener canción actual
    const songActual = await this.songRepository.findById(id);
    if (!songActual) {
      return null;
    }

    // Validar cambios si se proporcionan
    if (datosActualizar.fontImageUrl !== undefined) {
      if (datosActualizar.fontImageUrl.trim().length === 0) {
        throw new Error('La URL de la imagen no puede estar vacía');
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

    if (datosActualizar.duracion !== undefined) {
      if (datosActualizar.duracion <= 0) {
        throw new Error('La duración debe ser mayor a 0 segundos');
      }
      if (datosActualizar.duracion > 7200) {
        throw new Error('La duración no puede exceder 7200 segundos (2 horas)');
      }
    }

    if (datosActualizar.albumId !== undefined && datosActualizar.albumId <= 0) {
      throw new Error('El ID del álbum debe ser válido');
    }

    if (datosActualizar.videoUrl !== undefined && datosActualizar.videoUrl && datosActualizar.videoUrl.length > 500) {
      throw new Error('La URL del video no puede exceder 500 caracteres');
    }

    // Preparar datos para actualizar
    const datosParaActualizar: any = {};

    if (datosActualizar.fontImageUrl !== undefined) {
      datosParaActualizar.fontImageUrl = datosActualizar.fontImageUrl;
    }
    if (datosActualizar.videoUrl !== undefined) {
      datosParaActualizar.videoUrl = datosActualizar.videoUrl;
    }
    if (datosActualizar.titulo !== undefined) {
      datosParaActualizar.titulo = datosActualizar.titulo;
    }
    if (datosActualizar.duracion !== undefined) {
      datosParaActualizar.duracion = datosActualizar.duracion;
    }
    if (datosActualizar.albumId !== undefined) {
      datosParaActualizar.albumId = datosActualizar.albumId;
    }

    const resultado = await this.songRepository.update(id, datosParaActualizar);
    if (!resultado) {
      return null;
    }
    return resultado.toJSON();
  }

  /**
   * Elimina una canción
   */
  async eliminarSong(id: number): Promise<boolean> {
    if (id <= 0) {
      throw new Error('El ID de la canción debe ser válido');
    }

    const song = await this.songRepository.findById(id);
    if (!song) {
      return false;
    }

    await this.songRepository.delete(id);
    return true;
  }

  /**
   * Cuenta el total de canciones
   */
  async contarSongs(): Promise<number> {
    return await this.songRepository.count();
  }

  /**
   * Cuenta canciones por álbum
   */
  async contarSongsPorAlbum(albumId: number): Promise<number> {
    if (albumId <= 0) {
      throw new Error('El ID del álbum debe ser válido');
    }

    return await this.songRepository.countByAlbum(albumId);
  }

  /**
   * Obtiene la duración total de un álbum
   */
  async obtenerDuracionTotalAlbum(albumId: number): Promise<number> {
    if (albumId <= 0) {
      throw new Error('El ID del álbum debe ser válido');
    }

    return await this.songRepository.getTotalDuracionByAlbum(albumId);
  }
}
