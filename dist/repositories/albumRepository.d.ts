import { Album, IAlbumData } from '../models/Album';
/**
 * Repositorio para gestión de álbumes en la base de datos
 */
export declare class AlbumRepository {
    /**
     * Guarda un nuevo álbum en la base de datos
     */
    save(album: Album): Promise<Album>;
    /**
     * Encuentra todos los álbumes
     */
    findMany(): Promise<Album[]>;
    /**
     * Encuentra un álbum por ID
     */
    findById(id: number): Promise<Album | null>;
    /**
     * Encuentra álbumes por artista
     */
    findByArtistaId(artistaId: number): Promise<Album[]>;
    /**
     * Encuentra álbumes por género
     */
    findByGenero(genero: string): Promise<Album[]>;
    /**
     * Actualiza un álbum
     */
    update(id: number, datos: Partial<IAlbumData>): Promise<Album | null>;
    /**
     * Elimina un álbum
     */
    delete(id: number): Promise<void>;
    /**
     * Cuenta el total de álbumes
     */
    count(): Promise<number>;
    /**
     * Cuenta álbumes por artista
     */
    countByArtista(artistaId: number): Promise<number>;
}
//# sourceMappingURL=albumRepository.d.ts.map