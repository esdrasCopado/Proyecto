/**
 * Entidad ArtistaEvento
 * Representa la relación entre un artista y un evento
 * Define el rol y la compensación del artista en un evento específico
 */

export interface IArtistaEvento {
  id?: number;
  artistaId: number;
  eventoId: number;
  rol?: string;
  compensacion?: number;
  fechaConfirmacion?: Date | string;
}

export class ArtistaEvento {
  private _id?: number;
  private _artistaId: number;
  private _eventoId: number;
  private _rol: string;
  private _compensacion: number;
  private _fechaConfirmacion: Date;

  constructor(data: IArtistaEvento) {
    this._id = data.id;
    this._artistaId = data.artistaId;
    this._eventoId = data.eventoId;
    this._rol = data.rol || 'Artista Principal';
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

  get rol(): string {
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

  set rol(value: string) {
    if (!ArtistaEvento.validarRol(value)) {
      throw new Error('Rol invalido');
    }
    this._rol = value.trim();
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
    if (!ArtistaEvento.validarRol(this._rol)) {
      throw new Error('Rol invalido');
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

  private static validarRol(rol: string): boolean {
    if (!rol || rol.trim().length === 0) {
      return false;
    }
    if (rol.length > 100) {
      return false;
    }
    return true;
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

  public esArtistaPrincipal(): boolean {
    return this._rol.toLowerCase().includes('principal');
  }

  public esInvitado(): boolean {
    return this._rol.toLowerCase().includes('invitado');
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
      rol: data.rol,
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