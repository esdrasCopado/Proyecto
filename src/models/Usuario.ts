/**
 * Entidad Usuario
 * Representa un usuario del sistema que puede comprar boletos y realizar órdenes
 */

import { Role } from '../types/enums';

export interface IUsuario {
  id?: number;
  email: string;
  password: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  fechaRegistro?: Date | string;
  rol?: Role;
}

export class Usuario {
  private _id?: number;
  private _email: string;
  private _password: string;
  private _nombre: string;
  private _apellidos: string;
  private _telefono: string;
  private _fechaRegistro: Date;
  private _rol: Role;

  constructor(data: IUsuario) {
    this._id = data.id;
    this._email = data.email;
    this._password = data.password;
    this._nombre = data.nombre;
    this._apellidos = data.apellidos;
    this._telefono = data.telefono;
    this._rol = data.rol || Role.USER;

    // Convertir fechaRegistro a Date si viene como string
    if (data.fechaRegistro) {
      this._fechaRegistro = typeof data.fechaRegistro === 'string'
        ? new Date(data.fechaRegistro)
        : data.fechaRegistro;
    } else {
      this._fechaRegistro = new Date();
    }

    this.validar();
  }

  // ==================== GETTERS ====================

  get id(): number | undefined {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get nombre(): string {
    return this._nombre;
  }

  get apellidos(): string {
    return this._apellidos;
  }

  get telefono(): string {
    return this._telefono;
  }

  get fechaRegistro(): Date {
    return this._fechaRegistro;
  }

  get rol(): Role {
    return this._rol;
  }

  // ==================== SETTERS ====================

  set email(value: string) {
    if (!Usuario.validarEmail(value)) {
      throw new Error('Email inválido');
    }
    this._email = value.trim();
  }

  set password(value: string) {
    if (!Usuario.validarPassword(value)) {
      throw new Error('Contraseña inválida. Debe tener al menos 6 caracteres');
    }
    this._password = value;
  }

  set nombre(value: string) {
    if (!Usuario.validarNombre(value)) {
      throw new Error('Nombre inválido');
    }
    this._nombre = value.trim();
  }

  set apellidos(value: string) {
    if (!Usuario.validarNombre(value)) {
      throw new Error('Apellidos inválidos');
    }
    this._apellidos = value.trim();
  }

  set telefono(value: string) {
    if (!Usuario.validarTelefono(value)) {
      throw new Error('Teléfono inválido');
    }
    this._telefono = value.trim();
  }

  set fechaRegistro(value: Date | string) {
    const fecha = typeof value === 'string' ? new Date(value) : value;
    if (!Usuario.validarFecha(fecha)) {
      throw new Error('Fecha inválida');
    }
    this._fechaRegistro = fecha;
  }

  set rol(value: Role) {
    this._rol = value;
  }

  // ==================== VALIDACIONES ====================

  /**
   * Valida la instancia completa del usuario
   * @throws Error si algún dato es inválido
   */
  private validar(): void {
    if (!Usuario.validarEmail(this._email)) {
      throw new Error('Email inválido');
    }
    if (!Usuario.validarPassword(this._password)) {
      throw new Error('Contraseña inválida. Debe tener al menos 6 caracteres');
    }
    if (!Usuario.validarNombre(this._nombre)) {
      throw new Error('Nombre inválido');
    }
    if (!Usuario.validarNombre(this._apellidos)) {
      throw new Error('Apellidos inválidos');
    }
    if (!Usuario.validarTelefono(this._telefono)) {
      throw new Error('Teléfono inválido');
    }
    if (!Usuario.validarFecha(this._fechaRegistro)) {
      throw new Error('Fecha de registro inválida');
    }
  }

  /**
   * Valida el formato de un email
   * @param email - Email a validar
   * @returns true si el email es válido
   */
  private static validarEmail(email: string): boolean {
    if (!email || email.trim().length === 0) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida una contraseña
   * @param password - Contraseña a validar
   * @returns true si la contraseña es válida
   */
  private static validarPassword(password: string): boolean {
    if (!password || password.length === 0) {
      return false;
    }
    // Mínimo 6 caracteres
    return password.length >= 6;
  }

  /**
   * Valida un nombre o apellido
   * @param nombre - Nombre a validar
   * @returns true si el nombre es válido
   */
  private static validarNombre(nombre: string): boolean {
    if (!nombre || nombre.trim().length === 0) {
      return false;
    }
    if (nombre.length < 2 || nombre.length > 100) {
      return false;
    }
    // Solo letras, espacios, acentos y ñ
    const nombreRegex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/;
    return nombreRegex.test(nombre);
  }

  /**
   * Valida un número de teléfono
   * @param telefono - Teléfono a validar
   * @returns true si el teléfono es válido
   */
  private static validarTelefono(telefono: string): boolean {
    if (!telefono || telefono.trim().length === 0) {
      return false;
    }
    // Eliminar espacios, guiones y paréntesis
    const telefonoLimpio = telefono.replace(/[\s\-()]/g, '');
    // Validar que tenga 10 dígitos
    const telefonoRegex = /^\d{10}$/;
    return telefonoRegex.test(telefonoLimpio);
  }

  /**
   * Valida una fecha
   * @param fecha - Fecha a validar
   * @returns true si la fecha es válida
   */
  private static validarFecha(fecha: Date): boolean {
    if (!(fecha instanceof Date)) {
      return false;
    }
    return !isNaN(fecha.getTime());
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Obtiene el nombre completo del usuario
   * @returns Nombre y apellidos concatenados
   */
  public getNombreCompleto(): string {
    return `${this._nombre} ${this._apellidos}`;
  }

  /**
   * Obtiene las iniciales del usuario
   * @returns Iniciales en mayúsculas
   */
  public getIniciales(): string {
    const inicialNombre = this._nombre.charAt(0).toUpperCase();
    const inicialApellido = this._apellidos.charAt(0).toUpperCase();
    return `${inicialNombre}${inicialApellido}`;
  }

  /**
   * Calcula cuántos días lleva registrado el usuario
   * @returns Número de días desde el registro
   */
  public getDiasRegistrado(): number {
    const hoy = new Date();
    const diferencia = hoy.getTime() - this._fechaRegistro.getTime();
    return Math.floor(diferencia / (1000 * 3600 * 24));
  }

  /**
   * Obtiene la fecha de registro formateada
   * @returns Fecha en formato legible
   */
  public getFechaRegistroFormateada(): string {
    return this._fechaRegistro.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /**
   * Verifica si el usuario es nuevo (menos de 30 días registrado)
   * @returns true si el usuario es nuevo
   */
  public esUsuarioNuevo(): boolean {
    return this.getDiasRegistrado() <= 30;
  }

  /**
   * Verifica si el usuario tiene rol de usuario normal
   * @returns true si el rol es USER
   */
  public esUsuarioNormal(): boolean {
    return this._rol === Role.USER;
  }

  /**
   * Verifica si el usuario tiene rol de artista
   * @returns true si el rol es ARTISTA
   */
  public esArtista(): boolean {
    return this._rol === Role.ARTISTA;
  }

  /**
   * Verifica si el usuario tiene rol de organizador
   * @returns true si el rol es ORGANIZADOR
   */
  public esOrganizador(): boolean {
    return this._rol === Role.ORGANIZADOR;
  }

  /**
   * Verifica si el usuario tiene rol de administrador
   * @returns true si el rol es ADMIN
   */
  public esAdmin(): boolean {
    return this._rol === Role.ADMIN;
  }

  // ==================== CONVERSIÓN DE DATOS ====================

  /**
   * Convierte el usuario a un objeto plano para persistencia
   * @returns Objeto con los datos del usuario
   */
  public toJSON(): IUsuario {
    return {
      id: this._id,
      email: this._email,
      password: this._password,
      nombre: this._nombre,
      apellidos: this._apellidos,
      telefono: this._telefono,
      fechaRegistro: this._fechaRegistro,
      rol: this._rol,
    };
  }

  /**
   * Crea una instancia de Usuario desde datos de base de datos
   * @param data - Datos del usuario desde la BD
   * @returns Nueva instancia de Usuario
   */
  public static fromDatabase(data: any): Usuario {
    return new Usuario({
      id: data.id,
      email: data.email,
      password: data.password,
      nombre: data.nombre,
      apellidos: data.apellidos,
      telefono: data.telefono,
      fechaRegistro: data.fechaRegistro || data.fecha_registro,
      rol: data.rol,
    });
  }

  /**
   * Crea una copia independiente del usuario
   * @returns Nueva instancia con los mismos datos
   */
  public clone(): Usuario {
    return new Usuario(this.toJSON());
  }

  /**
   * Convierte el usuario a string representativo
   * @returns Representación en texto del usuario
   */
  public toString(): string {
    return `${this.getNombreCompleto()} (${this._email})`;
  }

  // ==================== MÉTODOS DE COMPARACIÓN ====================

  /**
   * Compara si dos usuarios son iguales (por ID)
   * @param otro - Otro usuario a comparar
   * @returns true si son el mismo usuario
   */
  public equals(otro: Usuario): boolean {
    return this._id !== undefined && this._id === otro._id;
  }

  /**
   * Verifica si el usuario tiene un ID asignado
   * @returns true si el usuario ha sido persistido en BD
   */
  public estaPersistido(): boolean {
    return this._id !== undefined && this._id > 0;
  }
}