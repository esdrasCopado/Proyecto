import { ISongData } from '../models/Song';
/**
 * Servicio para la gestión de canciones
 * Contiene la lógica de negocio para canciones
 */
export declare class SongService {
    private songRepository;
    constructor();
    /**
     * Valida los datos de la canción
     */
    private validarDatosSong;
    /**
     * Crea una nueva canción
     */
    crearSong(songData: {
        fontImageUrl: string;
        videoUrl?: string | null;
        titulo: string;
        duracion: number;
        albumId: number;
    }): Promise<ISongData>;
    /**
     * Obtiene una canción por su ID
     */
    obtenerSongPorId(id: number): Promise<ISongData | null>;
    /**
     * Obtiene todas las canciones
     */
    obtenerTodasLasSongs(): Promise<ISongData[]>;
    /**
     * Obtiene canciones por álbum
     */
    obtenerSongsPorAlbum(albumId: number): Promise<ISongData[]>;
    /**
     * Busca canciones por título
     */
    buscarSongsPorTitulo(titulo: string): Promise<ISongData[]>;
    /**
     * Obtiene canciones con video
     */
    obtenerSongsConVideo(): Promise<ISongData[]>;
    /**
     * Actualiza una canción
     */
    actualizarSong(id: number, datosActualizar: {
        fontImageUrl?: string;
        videoUrl?: string | null;
        titulo?: string;
        duracion?: number;
        albumId?: number;
    }): Promise<ISongData | null>;
    /**
     * Elimina una canción
     */
    eliminarSong(id: number): Promise<boolean>;
    /**
     * Cuenta el total de canciones
     */
    contarSongs(): Promise<number>;
    /**
     * Cuenta canciones por álbum
     */
    contarSongsPorAlbum(albumId: number): Promise<number>;
    /**
     * Obtiene la duración total de un álbum
     */
    obtenerDuracionTotalAlbum(albumId: number): Promise<number>;
}
//# sourceMappingURL=songService.d.ts.map