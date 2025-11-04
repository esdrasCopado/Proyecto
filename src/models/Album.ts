/**
 * Entidad Album
 * Representa un álbum musical de un artista
 *
 * @author Tu Nombre
 * @version 1.0.0
 */

export interface IAlbumData {
  id?: number;
  fontImageUrl: string;
  titulo: string;
  lanzamiento: Date;
  genero: string;
  artistaId: number;
}

export class Album {
  private _id?: number;
  private _fontImageUrl: string;
  private _titulo: string;
  private _lanzamiento: Date;
  private _genero: string;
  private _artistaId: number;

  /**
   * Constructor de la clase Album
   * @param data - Datos del álbum
   * @throws Error si los datos son inválidos
   */
  constructor(data: IAlbumData) {
    this._id = data.id;
    this._fontImageUrl = data.fontImageUrl;
    this._titulo = data.titulo;
    this._lanzamiento = data.lanzamiento;
    this._genero = data.genero;
    this._artistaId = data.artistaId;

    this.validar();
  }

  // ==================== GETTERS ====================

  get id(): number | undefined {
    return this._id;
  }

  get fontImageUrl(): string {
    return this._fontImageUrl;
  }

  get titulo(): string {
    return this._titulo;
  }

  get lanzamiento(): Date {
    return this._lanzamiento;
  }

  get genero(): string {
    return this._genero;
  }

  get artistaId(): number {
    return this._artistaId;
  }

  // ==================== SETTERS ====================

  set fontImageUrl(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('La URL de la imagen de portada es requerida');
    }
    if (value.length > 500) {
      throw new Error('La URL de la imagen no puede exceder 500 caracteres');
    }
    this._fontImageUrl = value.trim();
  }

  set titulo(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('El título del álbum es requerido');
    }
    if (value.length > 200) {
      throw new Error('El título no puede exceder 200 caracteres');
    }
    this._titulo = value.trim();
  }

  set lanzamiento(value: Date) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error('La fecha de lanzamiento es inválida');
    }
    this._lanzamiento = value;
  }

  set genero(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('El género es requerido');
    }
    if (value.length > 100) {
      throw new Error('El género no puede exceder 100 caracteres');
    }
    this._genero = value.trim();
  }

  set artistaId(value: number) {
    if (!value || value <= 0 || !Number.isInteger(value)) {
      throw new Error('El ID del artista debe ser un número entero positivo');
    }
    this._artistaId = value;
  }

  // ==================== VALIDACIONES ====================

  private validar(): void {
    if (!this._fontImageUrl || this._fontImageUrl.trim().length === 0 || this._fontImageUrl.length > 500) {
      throw new Error('La URL de la imagen de portada es inválida');
    }
    if (!this._titulo || this._titulo.trim().length === 0 || this._titulo.length > 200) {
      throw new Error('El título del álbum es inválido');
    }
    if (!(this._lanzamiento instanceof Date) || isNaN(this._lanzamiento.getTime())) {
      throw new Error('La fecha de lanzamiento es inválida');
    }
    if (!this._genero || this._genero.trim().length === 0 || this._genero.length > 100) {
      throw new Error('El género es inválido');
    }
    if (!this._artistaId || this._artistaId <= 0 || !Number.isInteger(this._artistaId)) {
      throw new Error('El ID del artista es inválido');
    }
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Verifica si el álbum pertenece a un género específico
   */
  public esGenero(genero: string): boolean {
    return this._genero.toLowerCase() === genero.toLowerCase();
  }

  /**
   * Obtiene el año de lanzamiento
   */
  public getAnioLanzamiento(): number {
    return this._lanzamiento.getFullYear();
  }

  /**
   * Verifica si el álbum fue lanzado en un año específico
   */
  public fuelanzadoEnAnio(anio: number): boolean {
    return this.getAnioLanzamiento() === anio;
  }

  /**
   * Verifica si el álbum es de un artista específico
   */
  public perteneceArtista(artistaId: number): boolean {
    return this._artistaId === artistaId;
  }

  // ==================== CONVERSIÓN DE DATOS ====================

  /**
   * Convierte el álbum a un objeto plano para persistencia en BD
   */
  public toJSON(): IAlbumData {
    return {
      id: this._id,
      fontImageUrl: this._fontImageUrl,
      titulo: this._titulo,
      lanzamiento: this._lanzamiento,
      genero: this._genero,
      artistaId: this._artistaId,
    };
  }

  /**
   * Crea una instancia de Album desde datos de base de datos
   */
  public static fromDatabase(data: any): Album {
    return new Album({
      id: data.id,
      fontImageUrl: data.fontImageUrl || data.font_image_url,
      titulo: data.titulo,
      lanzamiento: new Date(data.lanzamiento),
      genero: data.genero,
      artistaId: data.artistaId || data.artista_id,
    });
  }

  /**
   * Crea una copia independiente del álbum
   */
  public clone(): Album {
    return new Album(this.toJSON());
  }

  /**
   * Convierte el álbum a string representativo
   */
  public toString(): string {
    return `${this._titulo} (${this.getAnioLanzamiento()}) - ${this._genero}`;
  }

  // ==================== MÉTODOS DE COMPARACIÓN ====================

  /**
   * Compara si dos álbumes son iguales (por ID)
   */
  public equals(otro: Album): boolean {
    return this._id !== undefined && this._id === otro._id;
  }

  /**
   * Verifica si el álbum tiene un ID asignado
   */
  public estaPersistido(): boolean {
    return this._id !== undefined && this._id > 0;
  }
}
