/**
 * UserService
 * Capa de servicio que maneja la lógica de negocio para usuarios
 * Actúa como intermediario entre el controlador y el repositorio
 */

import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { Usuario } from '../models/Usuario';
import { Role } from '../types/enums';
import { hashPassword, comparePassword } from '../utils/bcrypt';

export class UserService {
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    /**
     * Obtiene todos los usuarios
     * @returns Lista de todos los usuarios
     */
    async getAllUsers(): Promise<Usuario[]> {
        try {
            return await this.usuarioRepository.findMany();
        } catch (error: any) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    /**
     * Obtiene un usuario por su ID
     * @param id - ID del usuario
     * @returns Usuario encontrado o null
     */
    async getUserById(id: number): Promise<Usuario | null> {
        try {
            if (id <= 0) {
                throw new Error('ID inválido');
            }
            return await this.usuarioRepository.findById(id);
        } catch (error: any) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    /**
     * Obtiene un usuario por su email
     * @param email - Email del usuario
     * @returns Usuario encontrado o null
     */
    async getUserByEmail(email: string): Promise<Usuario | null> {
        try {
            if (!email || email.trim() === '') {
                throw new Error('Email no puede estar vacío');
            }
            return await this.usuarioRepository.findByEmail(email);
        } catch (error: any) {
            throw new Error(`Error al obtener usuario por email: ${error.message}`);
        }
    }

    /**
     * Busca usuarios por nombre o apellido
     * @param nombre - Nombre o apellido a buscar
     * @returns Lista de usuarios que coinciden
     */
    async searchUsersByName(nombre: string): Promise<Usuario[]> {
        try {
            if (!nombre || nombre.trim() === '') {
                throw new Error('Nombre no puede estar vacío');
            }
            return await this.usuarioRepository.findByNombre(nombre);
        } catch (error: any) {
            throw new Error(`Error al buscar usuarios por nombre: ${error.message}`);
        }
    }

    /**
     * Obtiene usuarios por rol
     * @param rol - Rol a filtrar
     * @returns Lista de usuarios con ese rol
     */
    async getUsersByRole(rol: Role): Promise<Usuario[]> {
        try {
            return await this.usuarioRepository.findByRol(rol);
        } catch (error: any) {
            throw new Error(`Error al obtener usuarios por rol: ${error.message}`);
        }
    }

    /**
     * Obtiene usuarios registrados en un rango de fechas
     * @param fechaInicio - Fecha de inicio
     * @param fechaFin - Fecha de fin
     * @returns Lista de usuarios registrados en ese rango
     */
    async getUsersByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Usuario[]> {
        try {
            if (fechaInicio > fechaFin) {
                throw new Error('La fecha de inicio no puede ser mayor que la fecha de fin');
            }
            return await this.usuarioRepository.findByRangoFecha(fechaInicio, fechaFin);
        } catch (error: any) {
            throw new Error(`Error al obtener usuarios por rango de fecha: ${error.message}`);
        }
    }

    /**
     * Obtiene usuarios con paginación
     * @param page - Número de página
     * @param pageSize - Tamaño de página
     * @returns Lista de usuarios paginados
     */
    async getUsersWithPagination(page: number, pageSize: number): Promise<Usuario[]> {
        try {
            if (page <= 0) {
                throw new Error('El número de página debe ser mayor a 0');
            }
            if (pageSize <= 0 || pageSize > 100) {
                throw new Error('El tamaño de página debe estar entre 1 y 100');
            }
            return await this.usuarioRepository.findWithPaginatio(page, pageSize);
        } catch (error: any) {
            throw new Error(`Error al obtener usuarios con paginación: ${error.message}`);
        }
    }

    /**
     * Crea un nuevo usuario
     * @param userData - Datos del usuario a crear
     * @returns Usuario creado
     */
    async createUser(userData: {
        email: string;
        password: string;
        nombre: string;
        apellidos: string;
        telefono: string;
        rol?: Role;
    }): Promise<Usuario> {
        try {
            // Validar que el email no exista
            const emailExiste = await this.usuarioRepository.emailExists(userData.email);
            if (emailExiste) {
                throw new Error(`El email ${userData.email} ya está registrado`);
            }

            // Hashear la contraseña antes de crear el usuario
            const hashedPassword = await hashPassword(userData.password);

            // Crear instancia del modelo Usuario (valida automáticamente)
            const usuario = new Usuario({
                email: userData.email,
                password: hashedPassword, // Usar la contraseña hasheada
                nombre: userData.nombre,
                apellidos: userData.apellidos,
                telefono: userData.telefono,
                rol: userData.rol || Role.USER,
                fechaRegistro: new Date()
            });

            // Guardar usando el repositorio
            return await this.usuarioRepository.create(usuario);

        } catch (error: any) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    /**
     * Actualiza un usuario existente
     * @param id - ID del usuario a actualizar
     * @param updateData - Datos parciales a actualizar
     * @returns Usuario actualizado
     */
    async updateUser(
        id: number,
        updateData: Partial<{
            email: string;
            password: string;
            nombre: string;
            apellidos: string;
            telefono: string;
            rol: Role;
        }>
    ): Promise<Usuario> {
        try {
            // Verificar que el usuario existe
            const usuarioExiste = await this.usuarioRepository.findById(id);
            if (!usuarioExiste) {
                throw new Error(`Usuario con ID ${id} no encontrado`);
            }

            // Si se actualiza el email, verificar que no esté en uso
            if (updateData.email && updateData.email !== usuarioExiste.email) {
                const emailEnUso = await this.usuarioRepository.emailExists(updateData.email);
                if (emailEnUso) {
                    throw new Error(`El email ${updateData.email} ya está en uso`);
                }
            }

            // Si se actualiza la contraseña, hashearla
            if (updateData.password) {
                updateData.password = await hashPassword(updateData.password);
            }

            // Actualizar usando el repositorio
            return await this.usuarioRepository.update(id, updateData);

        } catch (error: any) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    /**
     * Elimina un usuario
     * @param id - ID del usuario a eliminar
     */
    async deleteUser(id: number): Promise<void> {
        try {
            // Verificar que el usuario existe
            const usuario = await this.usuarioRepository.findById(id);
            if (!usuario) {
                throw new Error(`Usuario con ID ${id} no encontrado`);
            }

            // Eliminar usando el repositorio
            await this.usuarioRepository.delete(id);

        } catch (error: any) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }

    /**
     * Obtiene el conteo total de usuarios
     * @returns Número total de usuarios
     */
    async getUserCount(): Promise<number> {
        try {
            return await this.usuarioRepository.count();
        } catch (error: any) {
            throw new Error(`Error al contar usuarios: ${error.message}`);
        }
    }

    /**
     * Verifica si un email está disponible
     * @param email - Email a verificar
     * @returns true si el email está disponible (no existe)
     */
    async isEmailAvailable(email: string): Promise<boolean> {
        try {
            const existe = await this.usuarioRepository.emailExists(email);
            return !existe;
        } catch (error: any) {
            throw new Error(`Error al verificar disponibilidad de email: ${error.message}`);
        }
    }

    /**
     * Obtiene estadísticas de usuarios
     * @returns Objeto con estadísticas
     */
    async getUserStats(): Promise<{
        total: number;
        porRol: {
            usuarios: number;
            artistas: number;
            organizadores: number;
            admins: number;
        };
        nuevosUltimos30Dias: number;
    }> {
        try {
            const total = await this.usuarioRepository.count();

            const usuarios = await this.usuarioRepository.findByRol(Role.USER);
            const artistas = await this.usuarioRepository.findByRol(Role.ARTISTA);
            const organizadores = await this.usuarioRepository.findByRol(Role.ORGANIZADOR);
            const admins = await this.usuarioRepository.findByRol(Role.ADMIN);

            // Usuarios nuevos (últimos 30 días)
            const hace30Dias = new Date();
            hace30Dias.setDate(hace30Dias.getDate() - 30);
            const nuevos = await this.usuarioRepository.findByRangoFecha(hace30Dias, new Date());

            return {
                total,
                porRol: {
                    usuarios: usuarios.length,
                    artistas: artistas.length,
                    organizadores: organizadores.length,
                    admins: admins.length
                },
                nuevosUltimos30Dias: nuevos.length
            };

        } catch (error: any) {
            throw new Error(`Error al obtener estadísticas de usuarios: ${error.message}`);
        }
    }

    /**
     * Valida las credenciales de un usuario (para login)
     * @param email - Email del usuario
     * @param password - Contraseña sin encriptar
     * @returns Usuario si las credenciales son válidas, null en caso contrario
     */
    async validateCredentials(email: string, password: string): Promise<Usuario | null> {
        try {
            const usuario = await this.usuarioRepository.findByEmail(email);

            if (!usuario) {
                return null;
            }

            // Comparar la contraseña ingresada con la hasheada usando bcrypt
            const isPasswordValid = await comparePassword(password, usuario.password);

            if (isPasswordValid) {
                return usuario;
            }

            return null;

        } catch (error: any) {
            throw new Error(`Error al validar credenciales: ${error.message}`);
        }
    }

    /**
     * Cambia el rol de un usuario
     * @param userId - ID del usuario
     * @param newRole - Nuevo rol
     * @returns Usuario actualizado
     */
    async changeUserRole(userId: number, newRole: Role): Promise<Usuario> {
        try {
            const usuario = await this.usuarioRepository.findById(userId);

            if (!usuario) {
                throw new Error(`Usuario con ID ${userId} no encontrado`);
            }

            return await this.usuarioRepository.update(userId, { rol: newRole });

        } catch (error: any) {
            throw new Error(`Error al cambiar rol de usuario: ${error.message}`);
        }
    }

    /**
     * Obtiene usuarios nuevos (registrados hace menos de 30 días)
     * @returns Lista de usuarios nuevos
     */
    async getNewUsers(): Promise<Usuario[]> {
        try {
            const hace30Dias = new Date();
            hace30Dias.setDate(hace30Dias.getDate() - 30);
            return await this.usuarioRepository.findByRangoFecha(hace30Dias, new Date());
        } catch (error: any) {
            throw new Error(`Error al obtener usuarios nuevos: ${error.message}`);
        }
    }
}