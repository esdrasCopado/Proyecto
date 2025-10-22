/**
 * UserService
 * Capa de servicio que maneja la lógica de negocio para usuarios
 * Actúa como intermediario entre el controlador y el repositorio
 */
import { Usuario } from '../models/Usuario';
import { Role } from '../types/enums';
export declare class UserService {
    private usuarioRepository;
    constructor();
    /**
     * Obtiene todos los usuarios
     * @returns Lista de todos los usuarios
     */
    getAllUsers(): Promise<Usuario[]>;
    /**
     * Obtiene un usuario por su ID
     * @param id - ID del usuario
     * @returns Usuario encontrado o null
     */
    getUserById(id: number): Promise<Usuario | null>;
    /**
     * Obtiene un usuario por su email
     * @param email - Email del usuario
     * @returns Usuario encontrado o null
     */
    getUserByEmail(email: string): Promise<Usuario | null>;
    /**
     * Busca usuarios por nombre o apellido
     * @param nombre - Nombre o apellido a buscar
     * @returns Lista de usuarios que coinciden
     */
    searchUsersByName(nombre: string): Promise<Usuario[]>;
    /**
     * Obtiene usuarios por rol
     * @param rol - Rol a filtrar
     * @returns Lista de usuarios con ese rol
     */
    getUsersByRole(rol: Role): Promise<Usuario[]>;
    /**
     * Obtiene usuarios registrados en un rango de fechas
     * @param fechaInicio - Fecha de inicio
     * @param fechaFin - Fecha de fin
     * @returns Lista de usuarios registrados en ese rango
     */
    getUsersByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Usuario[]>;
    /**
     * Obtiene usuarios con paginación
     * @param page - Número de página
     * @param pageSize - Tamaño de página
     * @returns Lista de usuarios paginados
     */
    getUsersWithPagination(page: number, pageSize: number): Promise<Usuario[]>;
    /**
     * Crea un nuevo usuario
     * @param userData - Datos del usuario a crear
     * @returns Usuario creado
     */
    createUser(userData: {
        email: string;
        password: string;
        nombre: string;
        apellidos: string;
        telefono: string;
        rol?: Role;
    }): Promise<Usuario>;
    /**
     * Actualiza un usuario existente
     * @param id - ID del usuario a actualizar
     * @param updateData - Datos parciales a actualizar
     * @returns Usuario actualizado
     */
    updateUser(id: number, updateData: Partial<{
        email: string;
        password: string;
        nombre: string;
        apellidos: string;
        telefono: string;
        rol: Role;
    }>): Promise<Usuario>;
    /**
     * Elimina un usuario
     * @param id - ID del usuario a eliminar
     */
    deleteUser(id: number): Promise<void>;
    /**
     * Obtiene el conteo total de usuarios
     * @returns Número total de usuarios
     */
    getUserCount(): Promise<number>;
    /**
     * Verifica si un email está disponible
     * @param email - Email a verificar
     * @returns true si el email está disponible (no existe)
     */
    isEmailAvailable(email: string): Promise<boolean>;
    /**
     * Obtiene estadísticas de usuarios
     * @returns Objeto con estadísticas
     */
    getUserStats(): Promise<{
        total: number;
        porRol: {
            usuarios: number;
            artistas: number;
            organizadores: number;
            admins: number;
        };
        nuevosUltimos30Dias: number;
    }>;
    /**
     * Valida las credenciales de un usuario (para login)
     * @param email - Email del usuario
     * @param password - Contraseña sin encriptar
     * @returns Usuario si las credenciales son válidas, null en caso contrario
     */
    validateCredentials(email: string, password: string): Promise<Usuario | null>;
    /**
     * Cambia el rol de un usuario
     * @param userId - ID del usuario
     * @param newRole - Nuevo rol
     * @returns Usuario actualizado
     */
    changeUserRole(userId: number, newRole: Role): Promise<Usuario>;
    /**
     * Obtiene usuarios nuevos (registrados hace menos de 30 días)
     * @returns Lista de usuarios nuevos
     */
    getNewUsers(): Promise<Usuario[]>;
}
//# sourceMappingURL=userService.d.ts.map