/**
 * Entidad ArtistaEvento
 * Representa la relación entre un artista y un evento
 * Define el rol y la compensación del artista en un evento específico
 */
import { RolArtista } from '../types/enums';
export interface IArtistaEvento {
    id?: number;
    artistaId: number;
    eventoId: number;
    rol?: RolArtista;
    compensacion?: number;
    fechaConfirmacion?: Date | string;
}
export declare class ArtistaEvento {
    private _id?;
    private _artistaId;
    private _eventoId;
    private _rol;
    private _compensacion;
    private _fechaConfirmacion;
    constructor(data: IArtistaEvento);
    get id(): number | undefined;
    get artistaId(): number;
    get eventoId(): number;
    get rol(): RolArtista;
    get compensacion(): number;
    get fechaConfirmacion(): Date;
    set artistaId(value: number);
    set eventoId(value: number);
    set rol(value: RolArtista);
    set compensacion(value: number);
    set fechaConfirmacion(value: Date | string);
    private validar;
    private static validarId;
    private static validarCompensacion;
    private static validarFecha;
    /**
     * Verifica si el artista es el headliner (artista principal)
     * @returns true si el rol es HEADLINER
     */
    esHeadliner(): boolean;
    /**
     * Verifica si el artista es telonero (acto de apertura)
     * @returns true si el rol es TELONERO
     */
    esTelonero(): boolean;
    /**
     * Verifica si el artista es invitado
     * @returns true si el rol es INVITADO
     */
    esInvitado(): boolean;
    /**
     * Verifica si el artista es colaborador
     * @returns true si el rol es COLABORADOR
     */
    esColaborador(): boolean;
    tieneCompensacion(): boolean;
    getCompensacionFormateada(): string;
    getFechaConfirmacionFormateada(): string;
    getDiasDesdeConfirmacion(): number;
    esConfirmacionReciente(): boolean;
    /**
     * Obtiene el rol formateado en español
     * @returns Nombre del rol en español
     */
    getRolFormateado(): string;
    toJSON(): IArtistaEvento;
    static fromDatabase(data: any): ArtistaEvento;
    clone(): ArtistaEvento;
    toString(): string;
    equals(otro: ArtistaEvento): boolean;
    mismosArtistaYEvento(otro: ArtistaEvento): boolean;
    estaPersistido(): boolean;
}
//# sourceMappingURL=ArtistaEvento.d.ts.map