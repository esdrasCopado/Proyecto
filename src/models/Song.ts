/**
 * Entidad Song
 * Representa una canción de un álbum
 *
 * @author Tu Nombre
 * @version 1.0.0
 */

export interface ISongData {
  id?: number;
  fontImageUrl: string;
  videoUrl?: string | null;
  titulo: string;
  duracion: number; // duración en segundos
  albumId: number;
}

export class Song {
  private _id?: number;
  private _fontImageUrl: string;
  private _videoUrl?: string | null;
  private _titulo: string;
  private _duracion: number;
  private _albumId: number;

  /**
   * Constructor de la clase Song
   * @param data - Datos de la canción
   * @throws Error si los datos son inválidos
   */
  constructor(data: ISongData) {
    this._id = data.id;
    this._fontImageUrl = data.fontImageUrl;
    this._videoUrl = data.videoUrl;
    this._titulo = data.titulo;
    this._duracion = data.duracion;
    this._albumId = data.albumId;

    this.validar();
  }

  // ==================== GETTERS ====================

  get id(): number | undefined {
    return this._id;
  }

  get fontImageUrl(): string {
    return this._fontImageUrl;
  }

  get videoUrl(): string | null | undefined {
    return this._videoUrl;
  }

  get titulo(): string {
    return this._titulo;
  }

  get duracion(): number {
    return this._duracion;
  }

  get albumId(): number {
    return this._albumId;
  }

  // ==================== SETTERS ====================

  set fontImageUrl(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('La URL de la imagen es requerida');
    }
    if (value.length > 500) {
      throw new Error('La URL de la imagen no puede exceder 500 caracteres');
    }
    this._fontImageUrl = value.trim();
  }

  set videoUrl(value: string | null | undefined) {
    if (value && value.trim().length === 0) {
      this._videoUrl = null;
    } else if (value && value.length > 500) {
      throw new Error('La URL del video no puede exceder 500 caracteres');
    } else {
      this._videoUrl = value;
    }
  }

  set titulo(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('El título de la canción es requerido');
    }
    if (value.length > 200) {
      throw new Error('El título no puede exceder 200 caracteres');
    }
    this._titulo = value.trim();
  }

  set duracion(value: number) {
    if (!value || value <= 0 || !Number.isInteger(value)) {
      throw new Error('La duración debe ser un número entero positivo (en segundos)');
    }
    if (value > 7200) { // máximo 2 horas
      throw new Error('La duración no puede exceder 7200 segundos (2 horas)');
    }
    this._duracion = value;
  }

  set albumId(value: number) {
    if (!value || value <= 0 || !Number.isInteger(value)) {
      throw new Error('El ID del álbum debe ser un número entero positivo');
    }
    this._albumId = value;
  }

  // ==================== VALIDACIONES ====================

  private validar(): void {
    if (!this._fontImageUrl || this._fontImageUrl.trim().length === 0 || this._fontImageUrl.length > 500) {
      throw new Error('La URL de la imagen es inválida');
    }
    if (!this._titulo || this._titulo.trim().length === 0 || this._titulo.length > 200) {
      throw new Error('El título de la canción es inválido');
    }
    if (!this._duracion || this._duracion <= 0 || !Number.isInteger(this._duracion) || this._duracion > 7200) {
      throw new Error('La duración es inválida');
    }
    if (!this._albumId || this._albumId <= 0 || !Number.isInteger(this._albumId)) {
      throw new Error('El ID del álbum es inválido');
    }
    if (this._videoUrl && this._videoUrl.length > 500) {
      throw new Error('La URL del video es inválida');
    }
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Verifica si la canción tiene video
   */
  public tieneVideo(): boolean {
    return this._videoUrl !== null && this._videoUrl !== undefined && this._videoUrl.trim().length > 0;
  }

  /**
   * Obtiene la duración en formato MM:SS
   */
  public getDuracionFormateada(): string {
    const minutos = Math.floor(this._duracion / 60);
    const segundos = this._duracion % 60;
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  }

  /**
   * Obtiene la duración en minutos (redondeado)
   */
  public getDuracionEnMinutos(): number {
    return Math.round(this._duracion / 60);
  }

  /**
   * Verifica si la canción pertenece a un álbum específico
   */
  public perteneceAlbum(albumId: number): boolean {
    return this._albumId === albumId;
  }

  /**
   * Verifica si la canción es larga (más de 5 minutos)
   */
  public esLarga(): boolean {
    return this._duracion > 300;
  }

  // ==================== CONVERSIÓN DE DATOS ====================

  /**
   * Convierte la canción a un objeto plano para persistencia en BD
   */
  public toJSON(): ISongData {
    return {
      id: this._id,
      fontImageUrl: this._fontImageUrl,
      videoUrl: this._videoUrl,
      titulo: this._titulo,
      duracion: this._duracion,
      albumId: this._albumId,
    };
  }

  /**
   * Crea una instancia de Song desde datos de base de datos
   */
  public static fromDatabase(data: any): Song {
    return new Song({
      id: data.id,
      fontImageUrl: data.fontImageUrl || data.font_image_url,
      videoUrl: data.videoUrl || data.video_url,
      titulo: data.titulo,
      duracion: data.duracion,
      albumId: data.albumId || data.album_id,
    });
  }

  /**
   * Crea una copia independiente de la canción
   */
  public clone(): Song {
    return new Song(this.toJSON());
  }

  /**
   * Convierte la canción a string representativo
   */
  public toString(): string {
    return `${this._titulo} (${this.getDuracionFormateada()})`;
  }

  // ==================== MÉTODOS DE COMPARACIÓN ====================

  /**
   * Compara si dos canciones son iguales (por ID)
   */
  public equals(otra: Song): boolean {
    return this._id !== undefined && this._id === otra._id;
  }

  /**
   * Verifica si la canción tiene un ID asignado
   */
  public estaPersistida(): boolean {
    return this._id !== undefined && this._id > 0;
  }
}
