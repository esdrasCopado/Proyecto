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
    artistaId?: number | null;
    organizadorId?: number | null;
}
export declare class Usuario {
    private _id?;
    private _email;
    private _password;
    private _nombre;
    private _apellidos;
    private _telefono;
    private _fechaRegistro;
    private _rol;
    private _artistaId?;
    private _organizadorId?;
    constructor(data: IUsuario);
    get id(): number | undefined;
    get email(): string;
    get password(): string;
    get nombre(): string;
    get apellidos(): string;
    get telefono(): string;
    get fechaRegistro(): Date;
    get rol(): Role;
    get artistaId(): number | null | undefined;
    get organizadorId(): number | null | undefined;
    set email(value: string);
    set password(value: string);
    set nombre(value: string);
    set apellidos(value: string);
    set telefono(value: string);
    set fechaRegistro(value: Date | string);
    set rol(value: Role);
    /**
     * Valida la instancia completa del usuario
     * @throws Error si algún dato es inválido
     */
    private validar;
    /**
     * Valida el formato de un email
     * @param email - Email a validar
     * @returns true si el email es válido
     */
    private static validarEmail;
    /**
     * Valida una contraseña
     * @param password - Contraseña a validar
     * @returns true si la contraseña es válida
     */
    private static validarPassword;
    /**
     * Valida un nombre o apellido
     * @param nombre - Nombre a validar
     * @returns true si el nombre es válido
     */
    private static validarNombre;
    /**
     * Valida un número de teléfono
     * @param telefono - Teléfono a validar
     * @returns true si el teléfono es válido
     */
    private static validarTelefono;
    /**
     * Valida una fecha
     * @param fecha - Fecha a validar
     * @returns true si la fecha es válida
     */
    private static validarFecha;
    /**
     * Obtiene el nombre completo del usuario
     * @returns Nombre y apellidos concatenados
     */
    getNombreCompleto(): string;
    /**
     * Obtiene las iniciales del usuario
     * @returns Iniciales en mayúsculas
     */
    getIniciales(): string;
    /**
     * Calcula cuántos días lleva registrado el usuario
     * @returns Número de días desde el registro
     */
    getDiasRegistrado(): number;
    /**
     * Obtiene la fecha de registro formateada
     * @returns Fecha en formato legible
     */
    getFechaRegistroFormateada(): string;
    /**
     * Verifica si el usuario es nuevo (menos de 30 días registrado)
     * @returns true si el usuario es nuevo
     */
    esUsuarioNuevo(): boolean;
    /**
     * Verifica si el usuario tiene rol de usuario normal
     * @returns true si el rol es USER
     */
    esUsuarioNormal(): boolean;
    /**
     * Verifica si el usuario tiene rol de artista
     * @returns true si el rol es ARTISTA
     */
    esArtista(): boolean;
    /**
     * Verifica si el usuario tiene rol de organizador
     * @returns true si el rol es ORGANIZADOR
     */
    esOrganizador(): boolean;
    /**
     * Verifica si el usuario tiene rol de administrador
     * @returns true si el rol es ADMIN
     */
    esAdmin(): boolean;
    /**
     * Convierte el usuario a un objeto plano para persistencia
     * @returns Objeto con los datos del usuario
     */
    toJSON(): IUsuario;
    /**
     * Crea una instancia de Usuario desde datos de base de datos
     * @param data - Datos del usuario desde la BD
     * @returns Nueva instancia de Usuario
     */
    static fromDatabase(data: any): Usuario;
    /**
     * Crea una copia independiente del usuario
     * @returns Nueva instancia con los mismos datos
     */
    clone(): Usuario;
    /**
     * Convierte el usuario a string representativo
     * @returns Representación en texto del usuario
     */
    toString(): string;
    /**
     * Compara si dos usuarios son iguales (por ID)
     * @param otro - Otro usuario a comparar
     * @returns true si son el mismo usuario
     */
    equals(otro: Usuario): boolean;
    /**
     * Verifica si el usuario tiene un ID asignado
     * @returns true si el usuario ha sido persistido en BD
     */
    estaPersistido(): boolean;
}
//# sourceMappingURL=Usuario.d.ts.map