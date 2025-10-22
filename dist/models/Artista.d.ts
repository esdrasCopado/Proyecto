/**
 * Entidad Artista
 * Representa un artista que puede participar en eventos
 *
 * @author Tu Nombre
 * @version 1.0.0
 */
export interface IArtistaData {
    id?: number;
    nombre: string;
    genero: string;
    contacto: string;
    paisOrigen: string;
    fechaDebut: Date;
    disquera?: string | null;
    usuarioId?: number | null;
}
export declare class Artista {
    private _id?;
    private _nombre;
    private _genero;
    private _contacto;
    private _paisOrigen;
    private _fechaDebut;
    private _disquera?;
    private _usuarioId?;
    /**
     * Constructor de la clase Artista
     * @param data - Datos del artista
     * @throws Error si los datos son inválidos
     */
    constructor(data: IArtistaData);
    /**
     * Obtiene el ID del artista
     * @returns ID del artista o undefined si no está asignado
     */
    get id(): number | undefined;
    /**
     * Obtiene el nombre del artista
     * @returns Nombre del artista
     */
    get nombre(): string;
    /**
     * Obtiene el género musical del artista
     * @returns Género musical
     */
    get genero(): string;
    /**
     * Obtiene el contacto del artista
     * @returns Información de contacto o null/undefined si no está disponible
     */
    get contacto(): string;
    get paisOrigen(): string;
    get fechaDebut(): Date;
    get disquera(): string | null | undefined;
    /**
     * Obtiene el ID del usuario asociado
     * @returns ID del usuario o null/undefined si no está asociado
     */
    get usuarioId(): number | null | undefined;
    /**
     * Establece el nombre del artista
     * @param value - Nuevo nombre
     * @throws Error si el nombre es inválido
     */
    set nombre(value: string);
    /**
     * Establece el género musical del artista
     * @param value - Nuevo género musical
     * @throws Error si el género es inválido
     */
    set genero(value: string);
    /**
     * Establece la información de contacto del artista
     * @param value - Nueva información de contacto
     */
    set contacto(value: string);
    set paisOrigen(value: string);
    set fechaDebut(value: Date);
    set disquera(value: string | null | undefined);
    /**
     * Establece el ID del usuario asociado
     * @param value - ID del usuario o null para desasociar
     */
    set usuarioId(value: number | null | undefined);
    /**
     * Valida la instancia completa del artista
     * @throws Error si algún dato es inválido
     * @private
     */
    private validar;
    /**
     * Valida si un nombre de artista es válido
     * @param nombre - Nombre a validar
     * @returns true si el nombre es válido, false en caso contrario
     */
    static validarNombre(nombre: string): boolean;
    /**
     * Valida si un género musical es válido
     * @param genero - Género a validar
     * @returns true si el género es válido, false en caso contrario
     */
    static validarGenero(genero: string): boolean;
    /**
     * Verifica si el artista tiene información de contacto disponible
     * @returns true si tiene contacto, false en caso contrario
     */
    tieneContacto(): boolean;
    /**
     * Obtiene la información completa del artista en formato texto
     * @returns String con nombre, género y contacto (si existe)
     */
    getInformacionCompleta(): string;
    /**
     * Verifica si el artista pertenece a un género específico
     * @param genero - Género a verificar
     * @returns true si el artista es de ese género (ignora mayúsculas/minúsculas)
     */
    esGenero(genero: string): boolean;
    /**
     * Obtiene solo las iniciales del nombre del artista
     * @returns Iniciales en mayúsculas
     */
    getIniciales(): string;
    /**
     * Verifica si el nombre del artista contiene una palabra específica
     * @param palabra - Palabra a buscar
     * @returns true si el nombre contiene la palabra
     */
    nombreContiene(palabra: string): boolean;
    /**
     * Verifica si el artista tiene un usuario asociado
     * @returns true si tiene usuarioId asignado
     */
    tieneUsuarioAsociado(): boolean;
    /**
     * Asocia el artista a un usuario
     * @param usuarioId - ID del usuario a asociar
     * @throws Error si el ID es inválido
     */
    asociarUsuario(usuarioId: number): void;
    /**
     * Desasocia el artista del usuario
     */
    desasociarUsuario(): void;
    /**
     * Verifica si el artista está asociado a un usuario específico
     * @param usuarioId - ID del usuario a verificar
     * @returns true si está asociado a ese usuario
     */
    estaAsociadoAUsuario(usuarioId: number): boolean;
    /**
     * Convierte el artista a un objeto plano para persistencia en BD
     * @returns Objeto con los datos del artista
     */
    toJSON(): IArtistaData;
    /**
     * Crea una instancia de Artista desde datos de base de datos
     * @param data - Datos del artista desde la BD
     * @returns Nueva instancia de Artista
     */
    static fromDatabase(data: any): Artista;
    /**
     * Crea una copia independiente del artista
     * @returns Nueva instancia con los mismos datos
     */
    clone(): Artista;
    /**
     * Convierte el artista a string representativo
     * @returns Representación en texto del artista
     */
    toString(): string;
    /**
     * Compara si dos artistas son iguales (por ID)
     * @param otro - Otro artista a comparar
     * @returns true si son el mismo artista
     */
    equals(otro: Artista): boolean;
    /**
     * Verifica si el artista tiene un ID asignado
     * @returns true si el artista ha sido persistido en BD
     */
    estaPersistido(): boolean;
}
//# sourceMappingURL=Artista.d.ts.map