/**
 * Entidad Evento
 */

export interface IEvento {
    id?: number;
    nombre?: string;
    descripcion?: string;
    fecha?: Date;
    ubicacion?: string;
}
export class Evento {
    private _id?: number;
    private _nombre: string;
    private _descripcion: string;
    private _fecha: Date;
    private _ubicacion: string;

    constructor(data: IEvento) {
        this._id = data.id;
        this._nombre = data.nombre || 'Evento Sin Nombre';
        this._descripcion = data.descripcion || '';
        this._fecha = data.fecha ? new Date(data.fecha) : new Date();
        this._ubicacion = data.ubicacion || 'Ubicación No Especificada';
        this.validar();
    }
    // ==================== GETTERS ====================

    get id(): number | undefined {
        return this._id;
    }

    get nombre(): string {
        return this._nombre;
    }

    get descripcion(): string {
        return this._descripcion;
    }

    get fecha(): Date {
        return this._fecha;
    }

    get ubicacion(): string {
        return this._ubicacion;
    }
    // ==================== SETTERS ====================

    set nombre(value: string) {
        if (!Evento.validarNombre(value)) {
            throw new Error('Nombre invalido');
        }
        this._nombre = value.trim();
    }

    set descripcion(value: string) {
        if (!Evento.validarDescripcion(value)) {
            throw new Error('Descripción invalida');
        }
        this._descripcion = value.trim();
    }

    set fecha(value: Date | string) {
        const fecha = typeof value === 'string' ? new Date(value) : value;
        if (!Evento.validarFecha(fecha)) {
            throw new Error('Fecha invalida');
        }
        this._fecha = fecha;
    }

    set ubicacion(value: string) {
        if (!Evento.validarUbicacion(value)) {
            throw new Error('Ubicación invalida');
        }
        this._ubicacion = value.trim();
    }
    // ==================== VALIDACIONES ====================
    private validar(): void {
        if (!Evento.validarNombre(this._nombre)) {
            throw new Error('Nombre invalido');
        }
        if (!Evento.validarFecha(this._fecha)) {
            throw new Error('Fecha invalida');
        }
        if (!Evento.validarUbicacion(this._ubicacion)) {
            throw new Error('Ubicación invalida');
        }
        if (!Evento.validarDescripcion(this._descripcion)) {
            throw new Error('Descripción invalida');
        }
    }
    private static validarNombre(nombre: string): boolean {
        return typeof nombre === 'string' && nombre.trim().length > 0 && nombre.length <= 200;

    }
    private static validarDescripcion(descripcion: string): boolean {
        return typeof descripcion === 'string' && descripcion.trim().length > 0 && descripcion.length <= 500;

    }
    private static validarFecha(fecha: Date): boolean {
        return fecha instanceof Date && !isNaN(fecha.getTime());

    }
    private static validarUbicacion(ubicacion: string): boolean {
        return typeof ubicacion === 'string' && ubicacion.trim().length > 0 && ubicacion.length <= 300;

    }

    // ==================== CONVERSORES ====================
    public static fromDatabase(data: any): Evento {
        return new Evento({
            id: data.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            fecha: data.fecha,
            ubicacion: data.ubicacion
        });
    }
}

