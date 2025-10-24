/**
 * Entidad Boleto
 * Representa un boleto de entrada a un evento
 */
import { TipoBoleto } from '../types/enums';
export interface IBoleto {
    id?: number;
    precio: number;
    tipo?: TipoBoleto;
    disponible: boolean;
    eventoId: number;
    usuarioId?: number | null;
    ordenId?: number | null;
}
export declare class Boleto {
    private _id?;
    private _precio;
    private _tipo;
    private _disponible;
    private _eventoId;
    private _usuarioId?;
    private _ordenId?;
    constructor(data: IBoleto);
    get id(): number | undefined;
    get precio(): number;
    get tipo(): TipoBoleto;
    get disponible(): boolean;
    get eventoId(): number;
    get usuarioId(): number | null | undefined;
    get ordenId(): number | null | undefined;
    set precio(value: number);
    set tipo(value: TipoBoleto);
    set disponible(value: boolean);
    set eventoId(value: number);
    set usuarioId(value: number | null | undefined);
    set ordenId(value: number | null | undefined);
    /**
     * Valida la instancia completa del boleto
     * @throws Error si algún dato es inválido
     */
    private validar;
    /**
     * Valida un precio
     * @param precio - Precio a validar
     * @returns true si el precio es válido
     */
    private static validarPrecio;
    /**
     * Valida un ID
     * @param id - ID a validar
     * @returns true si el ID es válido
     */
    private static validarId;
    /**
     * Verifica si el boleto está disponible para compra
     * @returns true si está disponible
     */
    estaDisponible(): boolean;
    /**
     * Verifica si el boleto ya fue vendido/asignado
     * @returns true si tiene usuario asignado
     */
    estaVendido(): boolean;
    /**
     * Marca el boleto como vendido asignándolo a un usuario
     * @param usuarioId - ID del usuario comprador
     * @throws Error si el boleto no está disponible
     */
    vender(usuarioId: number): void;
    /**
     * Libera el boleto (elimina la asignación de usuario)
     */
    liberar(): void;
    /**
     * Obtiene el precio formateado en moneda
     * @returns Precio formateado
     */
    getPrecioFormateado(): string;
    /**
     * Obtiene el tipo de boleto en formato legible
     * @returns Nombre del tipo de boleto
     */
    getTipoFormateado(): string;
    /**
     * Verifica si el boleto es de tipo VIP
     * @returns true si es VIP
     */
    esVIP(): boolean;
    /**
     * Verifica si el boleto es de tipo General
     * @returns true si es General
     */
    esGeneral(): boolean;
    /**
     * Verifica si el boleto es de tipo Platino
     * @returns true si es Platino
     */
    esPlatino(): boolean;
    /**
     * Verifica si el boleto es de tipo Oro
     * @returns true si es Oro
     */
    esOro(): boolean;
    /**
     * Aplica un descuento al precio del boleto
     * @param porcentaje - Porcentaje de descuento (0-100)
     * @returns Nuevo precio con descuento
     */
    aplicarDescuento(porcentaje: number): number;
    /**
     * Convierte el boleto a un objeto plano para persistencia
     * @returns Objeto con los datos del boleto
     */
    toJSON(): IBoleto;
    /**
     * Crea una instancia de Boleto desde datos de base de datos
     * @param data - Datos del boleto desde la BD
     * @returns Nueva instancia de Boleto
     */
    static fromDatabase(data: any): Boleto;
    /**
     * Crea una copia independiente del boleto
     * @returns Nueva instancia con los mismos datos
     */
    clone(): Boleto;
    /**
     * Convierte el boleto a string representativo
     * @returns Representación en texto del boleto
     */
    toString(): string;
    /**
     * Compara si dos boletos son iguales (por ID)
     * @param otro - Otro boleto a comparar
     * @returns true si son el mismo boleto
     */
    equals(otro: Boleto): boolean;
    /**
     * Verifica si el boleto tiene un ID asignado
     * @returns true si el boleto ha sido persistido en BD
     */
    estaPersistido(): boolean;
    /**
     * Verifica si el boleto pertenece a un evento específico
     * @param eventoId - ID del evento a verificar
     * @returns true si pertenece al evento
     */
    perteneceAEvento(eventoId: number): boolean;
    /**
     * Verifica si el boleto está asignado a un usuario específico
     * @param usuarioId - ID del usuario a verificar
     * @returns true si está asignado al usuario
     */
    perteneceAUsuario(usuarioId: number): boolean;
}
//# sourceMappingURL=Boleto.d.ts.map