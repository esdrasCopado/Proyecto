import { EstadoOrden } from '../types/enums';
export interface IOrden {
    id?: number;
    total: number;
    fechaCompra: Date;
    usuarioId: number;
    boletos: number[];
    estado: EstadoOrden;
}
export declare class Orden {
    private _id?;
    private _total;
    private _fechaCompra;
    private _usuarioId;
    private _boletos;
    private _estado;
    constructor(data: IOrden);
    get id(): number | undefined;
    get total(): number;
    get fechaCompra(): Date;
    get usuarioId(): number;
    get boletos(): number[];
    get estado(): EstadoOrden;
    set total(value: number);
    set fechaCompra(value: Date);
    set usuarioId(value: number);
    set boletos(value: number[]);
    private validar;
    private static validarTotal;
    private static validarUsuarioId;
    private static validarBoletoId;
    toJSON(): IOrden;
    static fromDatabase(data: any): Orden;
    clone(): Orden;
    toString(): string;
}
//# sourceMappingURL=Orden.d.ts.map