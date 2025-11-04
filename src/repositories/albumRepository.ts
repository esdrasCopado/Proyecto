import { Album, IAlbumData } from '../models/Album';
import prisma from '../config/database';

/**
 * Repositorio para gestión de álbumes en la base de datos
 */
export class AlbumRepository {
  /**
   * Guarda un nuevo álbum en la base de datos
   */
  async save(album: Album): Promise<Album> {
    try {
      const nuevoAlbum = await prisma.album.create({
        data: {
          fontImageUrl: album.fontImageUrl,
          titulo: album.titulo,
          lanzamiento: album.lanzamiento,
          genero: album.genero,
          artistaId: album.artistaId,
        },
      });
      return Album.fromDatabase(nuevoAlbum);
    } catch (error: any) {
      throw new Error('Error al guardar el álbum: ' + error.message);
    }
  }

  /**
   * Encuentra todos los álbumes
   */
  async findMany(): Promise<Album[]> {
    try {
      const albums = await prisma.album.findMany({
        orderBy: {
          lanzamiento: 'desc',
        },
      });
      return albums.map((album) => Album.fromDatabase(album));
    } catch (error: any) {
      throw new Error('Error al obtener los álbumes: ' + error.message);
    }
  }

  /**
   * Encuentra un álbum por ID
   */
  async findById(id: number): Promise<Album | null> {
    try {
      const album = await prisma.album.findUnique({
        where: { id },
      });
      return album ? Album.fromDatabase(album) : null;
    } catch (error: any) {
      throw new Error('Error al buscar el álbum: ' + error.message);
    }
  }

  /**
   * Encuentra álbumes por artista
   */
  async findByArtistaId(artistaId: number): Promise<Album[]> {
    try {
      const albums = await prisma.album.findMany({
        where: { artistaId },
        orderBy: {
          lanzamiento: 'desc',
        },
      });
      return albums.map((album) => Album.fromDatabase(album));
    } catch (error: any) {
      throw new Error('Error al buscar álbumes del artista: ' + error.message);
    }
  }

  /**
   * Encuentra álbumes por género
   */
  async findByGenero(genero: string): Promise<Album[]> {
    try {
      const albums = await prisma.album.findMany({
        where: {
          genero: {
            contains: genero,
          },
        },
        orderBy: {
          lanzamiento: 'desc',
        },
      });
      return albums.map((album) => Album.fromDatabase(album));
    } catch (error: any) {
      throw new Error('Error al buscar álbumes por género: ' + error.message);
    }
  }

  /**
   * Actualiza un álbum
   */
  async update(id: number, datos: Partial<IAlbumData>): Promise<Album | null> {
    try {
      const albumActualizado = await prisma.album.update({
        where: { id },
        data: datos,
      });
      return Album.fromDatabase(albumActualizado);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return null;
      }
      throw new Error('Error al actualizar el álbum: ' + error.message);
    }
  }

  /**
   * Elimina un álbum
   */
  async delete(id: number): Promise<void> {
    try {
      await prisma.album.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('El álbum no existe');
      }
      throw new Error('Error al eliminar el álbum: ' + error.message);
    }
  }

  /**
   * Cuenta el total de álbumes
   */
  async count(): Promise<number> {
    try {
      return await prisma.album.count();
    } catch (error: any) {
      throw new Error('Error al contar álbumes: ' + error.message);
    }
  }

  /**
   * Cuenta álbumes por artista
   */
  async countByArtista(artistaId: number): Promise<number> {
    try {
      return await prisma.album.count({
        where: { artistaId },
      });
    } catch (error: any) {
      throw new Error('Error al contar álbumes del artista: ' + error.message);
    }
  }
}
