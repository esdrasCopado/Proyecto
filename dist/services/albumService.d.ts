import { IAlbumData } from '../models/Album';
/**
 * Servicio para la gestión de álbumes
 * Contiene la lógica de negocio para álbumes
 */
export declare class AlbumService {
    private albumRepository;
    constructor();
    /**
     * Valida los datos del álbum
     */
    private validarDatosAlbum;
    /**
     * Crea un nuevo álbum
     */
    crearAlbum(albumData: {
        fontImageUrl: string;
        titulo: string;
        lanzamiento: Date | string;
        genero: string;
        artistaId: number;
    }): Promise<IAlbumData>;
    /**
     * Obtiene un álbum por su ID
     */
    obtenerAlbumPorId(id: number): Promise<IAlbumData | null>;
    /**
     * Obtiene todos los álbumes
     */
    obtenerTodosLosAlbums(): Promise<IAlbumData[]>;
    /**
     * Obtiene álbumes por artista
     */
    obtenerAlbumsPorArtista(artistaId: number): Promise<IAlbumData[]>;
    /**
     * Obtiene álbumes por género
     */
    obtenerAlbumsPorGenero(genero: string): Promise<IAlbumData[]>;
    /**
     * Actualiza un álbum
     */
    actualizarAlbum(id: number, datosActualizar: {
        fontImageUrl?: string;
        titulo?: string;
        lanzamiento?: Date | string;
        genero?: string;
        artistaId?: number;
    }): Promise<IAlbumData | null>;
    /**
     * Elimina un álbum
     */
    eliminarAlbum(id: number): Promise<boolean>;
    /**
     * Cuenta el total de álbumes
     */
    contarAlbums(): Promise<number>;
    /**
     * Cuenta álbumes por artista
     */
    contarAlbumsPorArtista(artistaId: number): Promise<number>;
}
//# sourceMappingURL=albumService.d.ts.map