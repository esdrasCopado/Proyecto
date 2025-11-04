/**
 * Entidad Album
 * Representa un álbum musical de un artista
 *
 * @author Tu Nombre
 * @version 1.0.0
 */
export interface IAlbumData {
    id?: number;
    fontImageUrl: string;
    titulo: string;
    lanzamiento: Date;
    genero: string;
    artistaId: number;
}
export declare class Album {
    private _id?;
    private _fontImageUrl;
    private _titulo;
    private _lanzamiento;
    private _genero;
    private _artistaId;
    /**
     * Constructor de la clase Album
     * @param data - Datos del álbum
     * @throws Error si los datos son inválidos
     */
    constructor(data: IAlbumData);
    get id(): number | undefined;
    get fontImageUrl(): string;
    get titulo(): string;
    get lanzamiento(): Date;
    get genero(): string;
    get artistaId(): number;
    set fontImageUrl(value: string);
    set titulo(value: string);
    set lanzamiento(value: Date);
    set genero(value: string);
    set artistaId(value: number);
    private validar;
    /**
     * Verifica si el álbum pertenece a un género específico
     */
    esGenero(genero: string): boolean;
    /**
     * Obtiene el año de lanzamiento
     */
    getAnioLanzamiento(): number;
    /**
     * Verifica si el álbum fue lanzado en un año específico
     */
    fuelanzadoEnAnio(anio: number): boolean;
    /**
     * Verifica si el álbum es de un artista específico
     */
    perteneceArtista(artistaId: number): boolean;
    /**
     * Convierte el álbum a un objeto plano para persistencia en BD
     */
    toJSON(): IAlbumData;
    /**
     * Crea una instancia de Album desde datos de base de datos
     */
    static fromDatabase(data: any): Album;
    /**
     * Crea una copia independiente del álbum
     */
    clone(): Album;
    /**
     * Convierte el álbum a string representativo
     */
    toString(): string;
    /**
     * Compara si dos álbumes son iguales (por ID)
     */
    equals(otro: Album): boolean;
    /**
     * Verifica si el álbum tiene un ID asignado
     */
    estaPersistido(): boolean;
}
//# sourceMappingURL=Album.d.ts.map