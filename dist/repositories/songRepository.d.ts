import { Song, ISongData } from '../models/Song';
/**
 * Repositorio para gestión de canciones en la base de datos
 */
export declare class SongRepository {
    /**
     * Guarda una nueva canción en la base de datos
     */
    save(song: Song): Promise<Song>;
    /**
     * Encuentra todas las canciones
     */
    findMany(): Promise<Song[]>;
    /**
     * Encuentra una canción por ID
     */
    findById(id: number): Promise<Song | null>;
    /**
     * Encuentra canciones por álbum
     */
    findByAlbumId(albumId: number): Promise<Song[]>;
    /**
     * Busca canciones por título
     */
    findByTitulo(titulo: string): Promise<Song[]>;
    /**
     * Encuentra canciones con video
     */
    findWithVideo(): Promise<Song[]>;
    /**
     * Actualiza una canción
     */
    update(id: number, datos: Partial<ISongData>): Promise<Song | null>;
    /**
     * Elimina una canción
     */
    delete(id: number): Promise<void>;
    /**
     * Cuenta el total de canciones
     */
    count(): Promise<number>;
    /**
     * Cuenta canciones por álbum
     */
    countByAlbum(albumId: number): Promise<number>;
    /**
     * Obtiene la duración total de un álbum
     */
    getTotalDuracionByAlbum(albumId: number): Promise<number>;
}
//# sourceMappingURL=songRepository.d.ts.map