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

export class Boleto {
  private _id?: number;
  private _precio: number;
  private _tipo: TipoBoleto;
  private _disponible: boolean;
  private _eventoId: number;
  private _usuarioId?: number | null;
  private _ordenId?: number | null;

  constructor(data: IBoleto) {
    this._id = data.id;
    this._precio = data.precio;
    this._tipo = data.tipo || TipoBoleto.GENERAL;
    this._disponible = data.disponible;
    this._eventoId = data.eventoId;
    this._usuarioId = data.usuarioId;
    this._ordenId = data.ordenId;

    this.validar();
  }

  // ==================== GETTERS ====================

  get id(): number | undefined {
    return this._id;
  }

  get precio(): number {
    return this._precio;
  }

  get tipo(): TipoBoleto {
    return this._tipo;
  }

  get disponible(): boolean {
    return this._disponible;
  }

  get eventoId(): number {
    return this._eventoId;
  }

  get usuarioId(): number | null | undefined {
    return this._usuarioId;
  }

  get ordenId(): number | null | undefined {
    return this._ordenId;
  }

  // ==================== SETTERS ====================

  set precio(value: number) {
    if (!Boleto.validarPrecio(value)) {
      throw new Error('Precio inválido. Debe ser mayor a 0');
    }
    this._precio = value;
  }

  set tipo(value: TipoBoleto) {
    this._tipo = value;
  }

  set disponible(value: boolean) {
    this._disponible = value;
  }

  set eventoId(value: number) {
    if (!Boleto.validarId(value)) {
      throw new Error('ID de evento inválido');
    }
    this._eventoId = value;
  }

  set usuarioId(value: number | null | undefined) {
    if (value !== null && value !== undefined && !Boleto.validarId(value)) {
      throw new Error('ID de usuario inválido');
    }
    this._usuarioId = value;
  }
  set ordenId(value: number | null | undefined) {
    if (value !== null && value !== undefined && !Boleto.validarId(value)) {
      throw new Error('ID de orden inválido');
    }
    this._ordenId = value;
  }

  // ==================== VALIDACIONES ====================

  /**
   * Valida la instancia completa del boleto
   * @throws Error si algún dato es inválido
   */
  private validar(): void {
    if (!Boleto.validarPrecio(this._precio)) {
      throw new Error('Precio inválido. Debe ser mayor a 0');
    }
    if (!Boleto.validarId(this._eventoId)) {
      throw new Error('ID de evento inválido');
    }
    if (this._usuarioId !== null && this._usuarioId !== undefined) {
      if (!Boleto.validarId(this._usuarioId)) {
        throw new Error('ID de usuario inválido');
      }
    }
    if (this._ordenId !== null && this._ordenId !== undefined) {
      if (!Boleto.validarId(this._ordenId)) {
        throw new Error('ID de orden inválido');
      }
    }
  }

  /**
   * Valida un precio
   * @param precio - Precio a validar
   * @returns true si el precio es válido
   */
  private static validarPrecio(precio: number): boolean {
    return typeof precio === 'number' && precio > 0 && !isNaN(precio);
  }

  /**
   * Valida un ID
   * @param id - ID a validar
   * @returns true si el ID es válido
   */
  private static validarId(id: number): boolean {
    return typeof id === 'number' && id > 0 && Number.isInteger(id);
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Verifica si el boleto está disponible para compra
   * @returns true si está disponible
   */
  public estaDisponible(): boolean {
    return this._disponible && this._usuarioId === null;
  }

  /**
   * Verifica si el boleto ya fue vendido/asignado
   * @returns true si tiene usuario asignado
   */
  public estaVendido(): boolean {
    return this._usuarioId !== null && this._usuarioId !== undefined;
  }

  /**
   * Marca el boleto como vendido asignándolo a un usuario
   * @param usuarioId - ID del usuario comprador
   * @throws Error si el boleto no está disponible
   */
  public vender(usuarioId: number): void {
    if (!this.estaDisponible()) {
      throw new Error('El boleto no está disponible para venta');
    }
    if (!Boleto.validarId(usuarioId)) {
      throw new Error('ID de usuario inválido');
    }
    this._usuarioId = usuarioId;
    this._disponible = false;
  }

  /**
   * Libera el boleto (elimina la asignación de usuario)
   */
  public liberar(): void {
    this._usuarioId = null;
    this._disponible = true;
  }

  /**
   * Obtiene el precio formateado en moneda
   * @returns Precio formateado
   */
  public getPrecioFormateado(): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(this._precio);
  }

  /**
   * Obtiene el tipo de boleto en formato legible
   * @returns Nombre del tipo de boleto
   */
  public getTipoFormateado(): string {
    const tipos: Record<TipoBoleto, string> = {
      [TipoBoleto.VIP]: 'VIP',
      [TipoBoleto.GENERAL]: 'General',
      [TipoBoleto.PLATINO]: 'Platino',
      [TipoBoleto.ORO]: 'Oro',
    };
    return tipos[this._tipo];
  }

  /**
   * Verifica si el boleto es de tipo VIP
   * @returns true si es VIP
   */
  public esVIP(): boolean {
    return this._tipo === TipoBoleto.VIP;
  }

  /**
   * Verifica si el boleto es de tipo General
   * @returns true si es General
   */
  public esGeneral(): boolean {
    return this._tipo === TipoBoleto.GENERAL;
  }

  /**
   * Verifica si el boleto es de tipo Platino
   * @returns true si es Platino
   */
  public esPlatino(): boolean {
    return this._tipo === TipoBoleto.PLATINO;
  }

  /**
   * Verifica si el boleto es de tipo Oro
   * @returns true si es Oro
   */
  public esOro(): boolean {
    return this._tipo === TipoBoleto.ORO;
  }

  /**
   * Aplica un descuento al precio del boleto
   * @param porcentaje - Porcentaje de descuento (0-100)
   * @returns Nuevo precio con descuento
   */
  public aplicarDescuento(porcentaje: number): number {
    if (porcentaje < 0 || porcentaje > 100) {
      throw new Error('El porcentaje debe estar entre 0 y 100');
    }
    const descuento = this._precio * (porcentaje / 100);
    return this._precio - descuento;
  }

  // ==================== CONVERSIÓN DE DATOS ====================

  /**
   * Convierte el boleto a un objeto plano para persistencia
   * @returns Objeto con los datos del boleto
   */
  public toJSON(): IBoleto {
    return {
      id: this._id,
      precio: this._precio,
      tipo: this._tipo,
      disponible: this._disponible,
      eventoId: this._eventoId,
      usuarioId: this._usuarioId,
    };
  }

  /**
   * Crea una instancia de Boleto desde datos de base de datos
   * @param data - Datos del boleto desde la BD
   * @returns Nueva instancia de Boleto
   */
  public static fromDatabase(data: any): Boleto {
    return new Boleto({
      id: data.id,
      precio: Number(data.precio),
      tipo: data.tipo as TipoBoleto,
      disponible: data.disponible,
      eventoId: data.eventoId || data.evento_id,
      usuarioId: data.usuarioId || data.usuario_id,
    });
  }

  /**
   * Crea una copia independiente del boleto
   * @returns Nueva instancia con los mismos datos
   */
  public clone(): Boleto {
    return new Boleto(this.toJSON());
  }

  /**
   * Convierte el boleto a string representativo
   * @returns Representación en texto del boleto
   */
  public toString(): string {
    return `Boleto ${this.getTipoFormateado()} - ${this.getPrecioFormateado()} (${
      this.estaDisponible() ? 'Disponible' : 'No disponible'
    })`;
  }

  // ==================== MÉTODOS DE COMPARACIÓN ====================

  /**
   * Compara si dos boletos son iguales (por ID)
   * @param otro - Otro boleto a comparar
   * @returns true si son el mismo boleto
   */
  public equals(otro: Boleto): boolean {
    return this._id !== undefined && this._id === otro._id;
  }

  /**
   * Verifica si el boleto tiene un ID asignado
   * @returns true si el boleto ha sido persistido en BD
   */
  public estaPersistido(): boolean {
    return this._id !== undefined && this._id > 0;
  }

  /**
   * Verifica si el boleto pertenece a un evento específico
   * @param eventoId - ID del evento a verificar
   * @returns true si pertenece al evento
   */
  public perteneceAEvento(eventoId: number): boolean {
    return this._eventoId === eventoId;
  }

  /**
   * Verifica si el boleto está asignado a un usuario específico
   * @param usuarioId - ID del usuario a verificar
   * @returns true si está asignado al usuario
   */
  public perteneceAUsuario(usuarioId: number): boolean {
    return this._usuarioId === usuarioId;
  }
}
