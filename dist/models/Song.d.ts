/**
 * Entidad Song
 * Representa una canción de un álbum
 *
 * @author Tu Nombre
 * @version 1.0.0
 */
export interface ISongData {
    id?: number;
    fontImageUrl: string;
    videoUrl?: string | null;
    titulo: string;
    duracion: number;
    albumId: number;
}
export declare class Song {
    private _id?;
    private _fontImageUrl;
    private _videoUrl?;
    private _titulo;
    private _duracion;
    private _albumId;
    /**
     * Constructor de la clase Song
     * @param data - Datos de la canción
     * @throws Error si los datos son inválidos
     */
    constructor(data: ISongData);
    get id(): number | undefined;
    get fontImageUrl(): string;
    get videoUrl(): string | null | undefined;
    get titulo(): string;
    get duracion(): number;
    get albumId(): number;
    set fontImageUrl(value: string);
    set videoUrl(value: string | null | undefined);
    set titulo(value: string);
    set duracion(value: number);
    set albumId(value: number);
    private validar;
    /**
     * Verifica si la canción tiene video
     */
    tieneVideo(): boolean;
    /**
     * Obtiene la duración en formato MM:SS
     */
    getDuracionFormateada(): string;
    /**
     * Obtiene la duración en minutos (redondeado)
     */
    getDuracionEnMinutos(): number;
    /**
     * Verifica si la canción pertenece a un álbum específico
     */
    perteneceAlbum(albumId: number): boolean;
    /**
     * Verifica si la canción es larga (más de 5 minutos)
     */
    esLarga(): boolean;
    /**
     * Convierte la canción a un objeto plano para persistencia en BD
     */
    toJSON(): ISongData;
    /**
     * Crea una instancia de Song desde datos de base de datos
     */
    static fromDatabase(data: any): Song;
    /**
     * Crea una copia independiente de la canción
     */
    clone(): Song;
    /**
     * Convierte la canción a string representativo
     */
    toString(): string;
    /**
     * Compara si dos canciones son iguales (por ID)
     */
    equals(otra: Song): boolean;
    /**
     * Verifica si la canción tiene un ID asignado
     */
    estaPersistida(): boolean;
}
//# sourceMappingURL=Song.d.ts.map