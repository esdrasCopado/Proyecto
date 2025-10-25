import { IArtistaData } from '../models/Artista';
/**
 * Servicio para la gestión de artistas
 * Contiene la lógica de negocio para artistas
 */
export declare class ArtistaService {
    private artistaRepository;
    constructor();
    /**
     * Valida los datos del artista
     */
    private validarDatosArtista;
    /**
     * Crea un nuevo artista
     */
    crearArtista(artistaData: {
        nombre: string;
        genero: string;
        contacto: string;
        paisOrigen: string;
        fechaDebut: Date | string;
        disquera?: string | null;
        usuarioId?: number | null;
    }): Promise<IArtistaData>;
    /**
     * Obtiene un artista por su ID
     */
    obtenerArtistaPorId(id: number): Promise<IArtistaData | null>;
    /**
     * Obtiene todos los artistas
     */
    obtenerTodosLosArtistas(): Promise<IArtistaData[]>;
    /**
     * Actualiza un artista
     */
    actualizarArtista(id: number, datosActualizar: {
        nombre?: string;
        genero?: string;
        contacto?: string;
        paisOrigen?: string;
        fechaDebut?: Date | string;
        disquera?: string | null;
        usuarioId?: number | null;
    }): Promise<IArtistaData | null>;
    /**
     * Elimina un artista
     */
    eliminarArtista(id: number): Promise<boolean>;
}
//# sourceMappingURL=ArtistaService.d.ts.map