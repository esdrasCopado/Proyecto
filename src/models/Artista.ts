/**
 * Entidad Artista
 * Representa un artista que puede participar en eventos
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */

export interface IArtistaData {
  id?: number;
  nombre: string;
  genero: string;
  contacto?: string | null;
}

export class Artista {
  private _id?: number;
  private _nombre: string;
  private _genero: string;
  private _contacto?: string | null;

  /**
   * Constructor de la clase Artista
   * @param data - Datos del artista
   * @throws Error si los datos son inválidos
   */
  constructor(data: IArtistaData) {
    this._id = data.id;
    this._nombre = data.nombre;
    this._genero = data.genero;
    this._contacto = data.contacto;

    this.validar();
  }

  // ==================== GETTERS ====================

  /**
   * Obtiene el ID del artista
   * @returns ID del artista o undefined si no está asignado
   */
  get id(): number | undefined {
    return this._id;
  }

  /**
   * Obtiene el nombre del artista
   * @returns Nombre del artista
   */
  get nombre(): string {
    return this._nombre;
  }

  /**
   * Obtiene el género musical del artista
   * @returns Género musical
   */
  get genero(): string {
    return this._genero;
  }

  /**
   * Obtiene el contacto del artista
   * @returns Información de contacto o null/undefined si no está disponible
   */
  get contacto(): string | null | undefined {
    return this._contacto;
  }

  // ==================== SETTERS ====================

  /**
   * Establece el nombre del artista
   * @param value - Nuevo nombre
   * @throws Error si el nombre es inválido
   */
  set nombre(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('El nombre del artista es requerido');
    }
    if (value.length > 200) {
      throw new Error('El nombre del artista no puede exceder 200 caracteres');
    }
    this._nombre = value.trim();
  }

  /**
   * Establece el género musical del artista
   * @param value - Nuevo género musical
   * @throws Error si el género es inválido
   */
  set genero(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('El género musical es requerido');
    }
    if (value.length > 100) {
      throw new Error('El género musical no puede exceder 100 caracteres');
    }
    this._genero = value.trim();
  }

  /**
   * Establece la información de contacto del artista
   * @param value - Nueva información de contacto
   */
  set contacto(value: string | null | undefined) {
    if (value && value.trim().length === 0) {
      this._contacto = null;
    } else {
      this._contacto = value;
    }
  }

  // ==================== VALIDACIONES ====================

  /**
   * Valida la instancia completa del artista
   * @throws Error si algún dato es inválido
   * @private
   */
  private validar(): void {
    if (!this._nombre || this._nombre.trim().length === 0) {
      throw new Error('El nombre del artista es requerido');
    }
    if (this._nombre.length > 200) {
      throw new Error('El nombre del artista no puede exceder 200 caracteres');
    }
    if (!this._genero || this._genero.trim().length === 0) {
      throw new Error('El género musical es requerido');
    }
    if (this._genero.length > 100) {
      throw new Error('El género musical no puede exceder 100 caracteres');
    }
  }

  /**
   * Valida si un nombre de artista es válido
   * @param nombre - Nombre a validar
   * @returns true si el nombre es válido, false en caso contrario
   */
  public static validarNombre(nombre: string): boolean {
    return typeof nombre === 'string' && nombre.trim().length > 0 && nombre.length <= 200;
  }

  /**
   * Valida si un género musical es válido
   * @param genero - Género a validar
   * @returns true si el género es válido, false en caso contrario
   */
  public static validarGenero(genero: string): boolean {
    return typeof genero === 'string'&& genero.trim().length > 0 && genero.length <= 100;
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Verifica si el artista tiene información de contacto disponible
   * @returns true si tiene contacto, false en caso contrario
   */
  public tieneContacto(): boolean {
    return this._contacto !== null && 
           this._contacto !== undefined && 
           this._contacto.trim().length > 0;
  }

  /**
   * Obtiene la información completa del artista en formato texto
   * @returns String con nombre, género y contacto (si existe)
   */
  public getInformacionCompleta(): string {
    return `${this._nombre} - ${this._genero}${
      this.tieneContacto() ? ` (${this._contacto})` : ''
    }`;
  }

  /**
   * Verifica si el artista pertenece a un género específico
   * @param genero - Género a verificar
   * @returns true si el artista es de ese género (ignora mayúsculas/minúsculas)
   */
  public esGenero(genero: string): boolean {
    return this._genero.toLowerCase() === genero.toLowerCase();
  }

  /**
   * Obtiene solo las iniciales del nombre del artista
   * @returns Iniciales en mayúsculas
   */
  public getIniciales(): string {
    return this._nombre
      .split(' ')
      .map((palabra) => palabra.charAt(0).toUpperCase())
      .join('');
  }

  /**
   * Verifica si el nombre del artista contiene una palabra específica
   * @param palabra - Palabra a buscar
   * @returns true si el nombre contiene la palabra
   */
  public nombreContiene(palabra: string): boolean {
    return this._nombre.toLowerCase().includes(palabra.toLowerCase());
  }

  // ==================== CONVERSIÓN DE DATOS ====================

  /**
   * Convierte el artista a un objeto plano para persistencia en BD
   * @returns Objeto con los datos del artista
   */
  public toJSON(): IArtistaData {
    return {
      id: this._id,
      nombre: this._nombre,
      genero: this._genero,
      contacto: this._contacto,
    };
  }

  /**
   * Crea una instancia de Artista desde datos de base de datos
   * @param data - Datos del artista desde la BD
   * @returns Nueva instancia de Artista
   */
  public static fromDatabase(data: any): Artista {
    return new Artista({
      id: data.id,
      nombre: data.nombre,
      genero: data.genero,
      contacto: data.contacto,
    });
  }

  /**
   * Crea una copia independiente del artista
   * @returns Nueva instancia con los mismos datos
   */
  public clone(): Artista {
    return new Artista(this.toJSON());
  }

  /**
   * Convierte el artista a string representativo
   * @returns Representación en texto del artista
   */
  public toString(): string {
    return this.getInformacionCompleta();
  }

  // ==================== MÉTODOS DE COMPARACIÓN ====================

  /**
   * Compara si dos artistas son iguales (por ID)
   * @param otro - Otro artista a comparar
   * @returns true si son el mismo artista
   */
  public equals(otro: Artista): boolean {
    return this._id !== undefined && this._id === otro._id;
  }

  /**
   * Verifica si el artista tiene un ID asignado
   * @returns true si el artista ha sido persistido en BD
   */
  public estaPersistido(): boolean {
    return this._id !== undefined && this._id > 0;
  }
}