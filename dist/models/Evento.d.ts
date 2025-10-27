/**
 * Entidad Evento
 */
export interface IEvento {
    id?: number;
    nombre: string;
    descripcion?: string;
    fecha: Date;
    ubicacion: string;
    organizadorId: number;
    imagenUrl?: string;
}
export declare class Evento {
    private _id?;
    private _nombre;
    private _descripcion;
    private _fecha;
    private _ubicacion;
    private _organizadorId;
    private _imagenUrl;
    constructor(data: IEvento);
    get id(): number | undefined;
    get nombre(): string;
    get descripcion(): string;
    get fecha(): Date;
    get ubicacion(): string;
    get organizadorId(): number;
    get imagenUrl(): string;
    set nombre(value: string);
    set descripcion(value: string);
    set fecha(value: Date | string);
    set ubicacion(value: string);
    set organizadorId(value: number);
    set imagenUrl(value: string);
    private validar;
    private static validarNombre;
    private static validarDescripcion;
    private static validarFecha;
    private static validarUbicacion;
    private static validarId;
    private static validarImagenUrl;
    static fromDatabase(data: any): Evento;
    toJSON(): IEvento;
}
//# sourceMappingURL=Evento.d.ts.map