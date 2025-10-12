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

export class ArtistaEvento {
  private _id?: number;
  private _artistaId: number;
  private _eventoId: number;
  private _rol: RolArtista;
  private _compensacion: number;
  private _fechaConfirmacion: Date;

  constructor(data: IArtistaEvento) {
    this._id = data.id;
    this._artistaId = data.artistaId;
    this._eventoId = data.eventoId;
    this._rol = data.rol || RolArtista.INVITADO;
    this._compensacion = data.compensacion || 0;

    if (data.fechaConfirmacion) {
      this._fechaConfirmacion = typeof data.fechaConfirmacion === 'string'
        ? new Date(data.fechaConfirmacion)
        : data.fechaConfirmacion;
    } else {
      this._fechaConfirmacion = new Date();
    }

    this.validar();
  }

  // ==================== GETTERS ====================

  get id(): number | undefined {
    return this._id;
  }

  get artistaId(): number {
    return this._artistaId;
  }

  get eventoId(): number {
    return this._eventoId;
  }

  get rol(): RolArtista {
    return this._rol;
  }

  get compensacion(): number {
    return this._compensacion;
  }

  get fechaConfirmacion(): Date {
    return this._fechaConfirmacion;
  }

  // ==================== SETTERS ====================

  set artistaId(value: number) {
    if (!ArtistaEvento.validarId(value)) {
      throw new Error('ID de artista invalido');
    }
    this._artistaId = value;
  }

  set eventoId(value: number) {
    if (!ArtistaEvento.validarId(value)) {
      throw new Error('ID de evento invalido');
    }
    this._eventoId = value;
  }

  set rol(value: RolArtista) {
    this._rol = value;
  }

  set compensacion(value: number) {
    if (!ArtistaEvento.validarCompensacion(value)) {
      throw new Error('Compensacion invalida');
    }
    this._compensacion = value;
  }

  set fechaConfirmacion(value: Date | string) {
    const fecha = typeof value === 'string' ? new Date(value) : value;
    if (!ArtistaEvento.validarFecha(fecha)) {
      throw new Error('Fecha de confirmacion invalida');
    }
    this._fechaConfirmacion = fecha;
  }

  // ==================== VALIDACIONES ====================

  private validar(): void {
    if (!ArtistaEvento.validarId(this._artistaId)) {
      throw new Error('ID de artista invalido');
    }
    if (!ArtistaEvento.validarId(this._eventoId)) {
      throw new Error('ID de evento invalido');
    }
    if (!ArtistaEvento.validarCompensacion(this._compensacion)) {
      throw new Error('Compensacion invalida');
    }
    if (!ArtistaEvento.validarFecha(this._fechaConfirmacion)) {
      throw new Error('Fecha de confirmacion invalida');
    }
  }

  private static validarId(id: number): boolean {
    return typeof id === 'number' && id > 0 && Number.isInteger(id);
  }

  private static validarCompensacion(compensacion: number): boolean {
    return typeof compensacion === 'number' && compensacion >= 0;
  }

  private static validarFecha(fecha: Date): boolean {
    if (!(fecha instanceof Date)) {
      return false;
    }
    return !isNaN(fecha.getTime());
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Verifica si el artista es el headliner (artista principal)
   * @returns true si el rol es HEADLINER
   */
  public esHeadliner(): boolean {
    return this._rol === RolArtista.HEADLINER;
  }

  /**
   * Verifica si el artista es telonero (acto de apertura)
   * @returns true si el rol es TELONERO
   */
  public esTelonero(): boolean {
    return this._rol === RolArtista.TELONERO;
  }

  /**
   * Verifica si el artista es invitado
   * @returns true si el rol es INVITADO
   */
  public esInvitado(): boolean {
    return this._rol === RolArtista.INVITADO;
  }

  /**
   * Verifica si el artista es colaborador
   * @returns true si el rol es COLABORADOR
   */
  public esColaborador(): boolean {
    return this._rol === RolArtista.COLABORADOR;
  }

  public tieneCompensacion(): boolean {
    return this._compensacion > 0;
  }

  public getCompensacionFormateada(): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(this._compensacion);
  }

  public getFechaConfirmacionFormateada(): string {
    return this._fechaConfirmacion.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  public getDiasDesdeConfirmacion(): number {
    const hoy = new Date();
    const diferencia = hoy.getTime() - this._fechaConfirmacion.getTime();
    return Math.floor(diferencia / (1000 * 3600 * 24));
  }

  public esConfirmacionReciente(): boolean {
    return this.getDiasDesdeConfirmacion() <= 7;
  }

  /**
   * Obtiene el rol formateado en español
   * @returns Nombre del rol en español
   */
  public getRolFormateado(): string {
    const roles: Record<RolArtista, string> = {
      [RolArtista.HEADLINER]: 'Headliner',
      [RolArtista.TELONERO]: 'Telonero',
      [RolArtista.INVITADO]: 'Invitado',
      [RolArtista.COLABORADOR]: 'Colaborador'
    };
    return roles[this._rol];
  }

  // ==================== CONVERSIÓN DE DATOS ====================

  public toJSON(): IArtistaEvento {
    return {
      id: this._id,
      artistaId: this._artistaId,
      eventoId: this._eventoId,
      rol: this._rol,
      compensacion: this._compensacion,
      fechaConfirmacion: this._fechaConfirmacion,
    };
  }

  public static fromDatabase(data: any): ArtistaEvento {
    return new ArtistaEvento({
      id: data.id,
      artistaId: data.artista_id || data.artistaId,
      eventoId: data.evento_id || data.eventoId,
      rol: data.rol as RolArtista,
      compensacion: data.compensacion ? Number(data.compensacion) : 0,
      fechaConfirmacion: data.fecha_confirmacion || data.fechaConfirmacion,
    });
  }

  public clone(): ArtistaEvento {
    return new ArtistaEvento(this.toJSON());
  }

  public toString(): string {
    return `Artista ${this._artistaId} - Evento ${this._eventoId} (${this._rol})`;
  }

  // ==================== MÉTODOS DE COMPARACIÓN ====================

  public equals(otro: ArtistaEvento): boolean {
    return this._id !== undefined && this._id === otro._id;
  }

  public mismosArtistaYEvento(otro: ArtistaEvento): boolean {
    return this._artistaId === otro._artistaId && this._eventoId === otro._eventoId;
  }

  public estaPersistido(): boolean {
    return this._id !== undefined && this._id > 0;
  }
}