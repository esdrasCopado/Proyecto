import { EstadoOrden } from '../types/enums';

export interface IOrden {
    id?: number;
    total: number;
    fechaCompra: Date;
    usuarioId: number;
    boletos: number[];
    estado: EstadoOrden;
}
export class Orden {
    private _id?: number;
    private _total: number;
    private _fechaCompra: Date;
    private _usuarioId: number;
    private _boletos: number[];
    private _estado: EstadoOrden;


    constructor(data: IOrden) {
        this._id = data.id;
        this._total = data.total;
        this._fechaCompra = data.fechaCompra;
        this._usuarioId = data.usuarioId;
        this._boletos = data.boletos;
        this._estado = data.estado;
        this.validar();
    }

    // ==================== GETTERS ====================

    get id(): number | undefined {
        return this._id;
    }

    get total(): number {
        return this._total;
    }

    get fechaCompra(): Date {
        return this._fechaCompra;
    }

    get usuarioId(): number {
        return this._usuarioId;
    }

    get boletos(): number[] {
        return this._boletos;
    }

    get estado(): EstadoOrden {
        return this._estado;
    }

    // ==================== SETTERS ====================

    set total(value: number) {
        if (!Orden.validarTotal(value)) {
            throw new Error('Total inválido');
        }
        this._total = value;
    }

    set fechaCompra(value: Date) {
        if (!(value instanceof Date) || isNaN(value.getTime())) {
            throw new Error('Fecha de compra inválida');
        }
        this._fechaCompra = value;
    }

    set usuarioId(value: number) {
        if (!Orden.validarUsuarioId(value)) {
            throw new Error('ID de usuario inválido');
        }
        this._usuarioId = value;
    }
    set boletos(value: number[]) {
        if (!Array.isArray(value) || value.some(id => !Orden.validarBoletoId(id))) {
            throw new Error('IDs de boletos inválidos');
        }
        this._boletos = value;
    }
    // ==================== VALIDACIONES ====================

    private validar(): void {
        if (!Orden.validarTotal(this._total)) {
            throw new Error('Total inválido');
        }
        if (!(this._fechaCompra instanceof Date) || isNaN(this._fechaCompra.getTime())) {
            throw new Error('Fecha de compra inválida');
        }
        if (!Orden.validarUsuarioId(this._usuarioId)) {
            throw new Error('ID de usuario inválido');
        }
        if (!Array.isArray(this._boletos) || this._boletos.some(id => !Orden.validarBoletoId(id))) {
            throw new Error('IDs de boletos inválidos');
        }
        if (!Object.values(EstadoOrden).includes(this._estado)) {
            throw new Error('Estado de orden inválido');
        }
    }

    private static validarTotal(total: number): boolean {
        return typeof total === 'number' && total >= 0 && !isNaN(total);
    }

    private static validarUsuarioId(id: number): boolean {
        return Number.isInteger(id) && id > 0;
    }

    private static validarBoletoId(id: number): boolean {
        return Number.isInteger(id) && id > 0;
    }
    // conversión de datos

    public toJSON(): IOrden {
        return {
            id: this._id,
            total: this._total,
            fechaCompra: this._fechaCompra,
            usuarioId: this._usuarioId,
            boletos: this._boletos,
            estado: this._estado,
        };
    }

    public static fromDatabase(data: any): Orden {
        return new Orden({
            id: data.id,
            total: Number(data.total),
            fechaCompra: new Date(data.fecha || data.fechaCompra), // Prisma usa 'fecha', el modelo usa 'fechaCompra'
            usuarioId: data.usuarioId || data.usuario_id,
            boletos: Array.isArray(data.boletos) ? data.boletos.map((b: any) => {
                // Si el boleto es un objeto, extraer el ID
                return typeof b === 'object' && b.id ? Number(b.id) : Number(b);
            }) : [],
            estado: data.estado as EstadoOrden,
        });
    }

    public clone(): Orden {
        return new Orden(this.toJSON());
    }

    public toString(): string {
        return `Orden #${this._id} - Total: ${this._total} - Fecha: ${this._fechaCompra.toISOString()} - Usuario ID: ${this._usuarioId} - Estado: ${this._estado}`;
    }
}