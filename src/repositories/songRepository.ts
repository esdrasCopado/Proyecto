import { Song, ISongData } from '../models/Song';
import prisma from '../config/database';

/**
 * Repositorio para gestión de canciones en la base de datos
 */
export class SongRepository {
  /**
   * Guarda una nueva canción en la base de datos
   */
  async save(song: Song): Promise<Song> {
    try {
      const nuevaSong = await prisma.song.create({
        data: {
          fontImageUrl: song.fontImageUrl,
          videoUrl: song.videoUrl,
          titulo: song.titulo,
          duracion: song.duracion,
          albumId: song.albumId,
        },
      });
      return Song.fromDatabase(nuevaSong);
    } catch (error: any) {
      throw new Error('Error al guardar la canción: ' + error.message);
    }
  }

  /**
   * Encuentra todas las canciones
   */
  async findMany(): Promise<Song[]> {
    try {
      const songs = await prisma.song.findMany({
        orderBy: {
          id: 'asc',
        },
      });
      return songs.map((song) => Song.fromDatabase(song));
    } catch (error: any) {
      throw new Error('Error al obtener las canciones: ' + error.message);
    }
  }

  /**
   * Encuentra una canción por ID
   */
  async findById(id: number): Promise<Song | null> {
    try {
      const song = await prisma.song.findUnique({
        where: { id },
      });
      return song ? Song.fromDatabase(song) : null;
    } catch (error: any) {
      throw new Error('Error al buscar la canción: ' + error.message);
    }
  }

  /**
   * Encuentra canciones por álbum
   */
  async findByAlbumId(albumId: number): Promise<Song[]> {
    try {
      const songs = await prisma.song.findMany({
        where: { albumId },
        orderBy: {
          id: 'asc',
        },
      });
      return songs.map((song) => Song.fromDatabase(song));
    } catch (error: any) {
      throw new Error('Error al buscar canciones del álbum: ' + error.message);
    }
  }

  /**
   * Busca canciones por título
   */
  async findByTitulo(titulo: string): Promise<Song[]> {
    try {
      const songs = await prisma.song.findMany({
        where: {
          titulo: {
            contains: titulo,
          },
        },
      });
      return songs.map((song) => Song.fromDatabase(song));
    } catch (error: any) {
      throw new Error('Error al buscar canciones por título: ' + error.message);
    }
  }

  /**
   * Encuentra canciones con video
   */
  async findWithVideo(): Promise<Song[]> {
    try {
      const songs = await prisma.song.findMany({
        where: {
          videoUrl: {
            not: null,
          },
        },
      });
      return songs.map((song) => Song.fromDatabase(song));
    } catch (error: any) {
      throw new Error('Error al buscar canciones con video: ' + error.message);
    }
  }

  /**
   * Actualiza una canción
   */
  async update(id: number, datos: Partial<ISongData>): Promise<Song | null> {
    try {
      const songActualizada = await prisma.song.update({
        where: { id },
        data: datos,
      });
      return Song.fromDatabase(songActualizada);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return null;
      }
      throw new Error('Error al actualizar la canción: ' + error.message);
    }
  }

  /**
   * Elimina una canción
   */
  async delete(id: number): Promise<void> {
    try {
      await prisma.song.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('La canción no existe');
      }
      throw new Error('Error al eliminar la canción: ' + error.message);
    }
  }

  /**
   * Cuenta el total de canciones
   */
  async count(): Promise<number> {
    try {
      return await prisma.song.count();
    } catch (error: any) {
      throw new Error('Error al contar canciones: ' + error.message);
    }
  }

  /**
   * Cuenta canciones por álbum
   */
  async countByAlbum(albumId: number): Promise<number> {
    try {
      return await prisma.song.count({
        where: { albumId },
      });
    } catch (error: any) {
      throw new Error('Error al contar canciones del álbum: ' + error.message);
    }
  }

  /**
   * Obtiene la duración total de un álbum
   */
  async getTotalDuracionByAlbum(albumId: number): Promise<number> {
    try {
      const result = await prisma.song.aggregate({
        where: { albumId },
        _sum: {
          duracion: true,
        },
      });
      return result._sum.duracion || 0;
    } catch (error: any) {
      throw new Error('Error al calcular duración total: ' + error.message);
    }
  }
}
