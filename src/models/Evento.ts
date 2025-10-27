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

export class Evento {
    private _id?: number;
    private _nombre: string;
    private _descripcion: string;
    private _fecha: Date;
    private _ubicacion: string;
    private _organizadorId: number;
    private _imagenUrl: string;

    constructor(data: IEvento) {
        this._id = data.id;
        this._nombre = data.nombre;
        this._descripcion = data.descripcion || '';
        this._fecha = data.fecha instanceof Date ? data.fecha : new Date(data.fecha);
        this._ubicacion = data.ubicacion;
        this._organizadorId = data.organizadorId;
        this._imagenUrl = data.imagenUrl || '';
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

    get organizadorId(): number {
        return this._organizadorId;
    }

    get imagenUrl(): string {
        return this._imagenUrl;
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

    set organizadorId(value: number) {
        if (!Evento.validarId(value)) {
            throw new Error('ID de organizador inválido');
        }
        this._organizadorId = value;
    }

    set imagenUrl(value: string) {
        if (!Evento.validarImagenUrl(value)) {
            throw new Error('URL de imagen inválida');
        }
        this._imagenUrl = value.trim();
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
        if (!Evento.validarId(this._organizadorId)) {
            throw new Error('ID de organizador inválido');
        }
    }
    private static validarNombre(nombre: string): boolean {
        return typeof nombre === 'string' && nombre.trim().length > 0 && nombre.length <= 200;

    }
    private static validarDescripcion(descripcion: string): boolean {
        // Permitir descripción vacía (es opcional) o hasta 2000 caracteres
        return typeof descripcion === 'string' && descripcion.length <= 2000;

    }
    private static validarFecha(fecha: Date): boolean {
        return fecha instanceof Date && !isNaN(fecha.getTime());

    }
    private static validarUbicacion(ubicacion: string): boolean {
        return typeof ubicacion === 'string' && ubicacion.trim().length > 0 && ubicacion.length <= 300;

    }

    private static validarId(id: number): boolean {
        return typeof id === 'number' && id > 0 && Number.isInteger(id);
    }

    private static validarImagenUrl(imagenUrl: string): boolean {
        // Permitir URL vacía (es opcional) o hasta 500 caracteres
        return typeof imagenUrl === 'string' && imagenUrl.length <= 500;
    }

    // ==================== CONVERSORES ====================
    public static fromDatabase(data: any): Evento {
        return new Evento({
            id: data.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            fecha: data.fecha,
            ubicacion: data.ubicacion,
            organizadorId: data.organizadorId || data.organizador_id,
            imagenUrl: data.imagenUrl || data.imagen_url
        });
    }

    public toJSON(): IEvento {
        return {
            id: this._id,
            nombre: this._nombre,
            descripcion: this._descripcion,
            fecha: this._fecha,
            ubicacion: this._ubicacion,
            organizadorId: this._organizadorId,
            imagenUrl: this._imagenUrl
        };
    }
}

