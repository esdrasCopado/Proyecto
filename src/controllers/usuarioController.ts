/**
 * UsuarioController
 * Controlador que maneja las peticiones HTTP relacionadas con usuarios
 * Utiliza UserService para la lógica de negocio
 */

import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { Usuario } from '../models/Usuario';
import { Role } from '../types/enums';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

export class UsuarioController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    /**
     * GET /api/usuarios
     * Obtiene todos los usuarios o filtra según parámetros de query
     */
    public getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const { rol, nombre, page, pageSize } = req.query;

            // Si hay paginación
            if (page && pageSize) {
                const usuarios = await this.userService.getUsersWithPagination(
                    Number(page),
                    Number(pageSize)
                );
                const total = await this.userService.getUserCount();

                res.status(200).json({
                    success: true,
                    data: usuarios.map(u => this.sanitizarUsuario(u)),
                    pagination: {
                        page: Number(page),
                        pageSize: Number(pageSize),
                        total,
                        totalPages: Math.ceil(total / Number(pageSize))
                    }
                });
                return;
            }

            // Filtrar por rol
            if (rol && typeof rol === 'string') {
                const usuarios = await this.userService.getUsersByRole(rol as Role);
                res.status(200).json({
                    success: true,
                    data: usuarios.map(u => this.sanitizarUsuario(u))
                });
                return;
            }

            // Filtrar por nombre
            if (nombre && typeof nombre === 'string') {
                const usuarios = await this.userService.searchUsersByName(nombre);
                res.status(200).json({
                    success: true,
                    data: usuarios.map(u => this.sanitizarUsuario(u))
                });
                return;
            }

            // Sin filtros, obtener todos
            const usuarios = await this.userService.getAllUsers();
            res.status(200).json({
                success: true,
                data: usuarios.map(u => this.sanitizarUsuario(u))
            });

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener usuarios',
                error: error.message
            });
        }
    };

    /**
     * GET /api/usuarios/:id
     * Obtiene un usuario por su ID
     */
    public getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'ID inválido'
                });
                return;
            }

            const usuario = await this.userService.getUserById(id);

            if (!usuario) {
                res.status(404).json({
                    success: false,
                    message: `Usuario con ID ${id} no encontrado`
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: this.sanitizarUsuario(usuario)
            });

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener usuario',
                error: error.message
            });
        }
    };

    /**
     * GET /api/usuarios/email/:email
     * Obtiene un usuario por su email
     */
    public getByEmail = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.params;

            const usuario = await this.userService.getUserByEmail(email);

            if (!usuario) {
                res.status(404).json({
                    success: false,
                    message: `Usuario con email ${email} no encontrado`
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: this.sanitizarUsuario(usuario)
            });

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener usuario',
                error: error.message
            });
        }
    };

    /**
     * POST /api/usuarios
     * Crea un nuevo usuario
     */
    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password, nombre, apellidos, telefono, rol } = req.body;

            // Validar campos requeridos
            if (!email || !password || !nombre || !apellidos || !telefono) {
                res.status(400).json({
                    success: false,
                    message: 'Todos los campos son requeridos (email, password, nombre, apellidos, telefono)'
                });
                return;
            }

            // Crear usuario usando el servicio
            const usuarioCreado = await this.userService.createUser({
                email,
                password,
                nombre,
                apellidos,
                telefono,
                rol: rol || Role.USER
            });

            res.status(201).json({
                success: true,
                message: 'Usuario creado exitosamente',
                data: this.sanitizarUsuario(usuarioCreado)
            });

        } catch (error: any) {
            // Si es un error de validación o email duplicado
            if (error.message.includes('inválid') || error.message.includes('ya está registrado')) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
                return;
            }

            res.status(500).json({
                success: false,
                message: 'Error al crear usuario',
                error: error.message
            });
        }
    };

    /**
     * PUT /api/usuarios/:id
     * Actualiza un usuario existente
     */
    public update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'ID inválido'
                });
                return;
            }

            const { email, password, nombre, apellidos, telefono, rol } = req.body;

            // Verificar que al menos un campo sea enviado
            if (!email && !password && !nombre && !apellidos && !telefono && !rol) {
                res.status(400).json({
                    success: false,
                    message: 'Debe proporcionar al menos un campo para actualizar'
                });
                return;
            }

            // Crear objeto con datos a actualizar
            const updateData: any = {};
            if (email) updateData.email = email;
            if (password) updateData.password = password;
            if (nombre) updateData.nombre = nombre;
            if (apellidos) updateData.apellidos = apellidos;
            if (telefono) updateData.telefono = telefono;
            if (rol) updateData.rol = rol;

            // Actualizar usando el servicio
            const usuarioActualizado = await this.userService.updateUser(id, updateData);

            res.status(200).json({
                success: true,
                message: 'Usuario actualizado exitosamente',
                data: this.sanitizarUsuario(usuarioActualizado)
            });

        } catch (error: any) {
            if (error.message.includes('no encontrado')) {
                res.status(404).json({
                    success: false,
                    message: error.message
                });
                return;
            }

            if (error.message.includes('inválid') || error.message.includes('ya está en uso')) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
                return;
            }

            res.status(500).json({
                success: false,
                message: 'Error al actualizar usuario',
                error: error.message
            });
        }
    };

    /**
     * DELETE /api/usuarios/:id
     * Elimina un usuario
     */
    public delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'ID inválido'
                });
                return;
            }

            // Eliminar usando el servicio
            await this.userService.deleteUser(id);

            res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente'
            });

        } catch (error: any) {
            if (error.message.includes('no encontrado')) {
                res.status(404).json({
                    success: false,
                    message: error.message
                });
                return;
            }

            if (error.message.includes('relaciones existentes') || error.message.includes('boletos u órdenes')) {
                res.status(409).json({
                    success: false,
                    message: error.message
                });
                return;
            }

            res.status(500).json({
                success: false,
                message: 'Error al eliminar usuario',
                error: error.message
            });
        }
    };

    /**
     * GET /api/usuarios/stats/count
     * Obtiene el conteo total de usuarios
     */
    public getCount = async (req: Request, res: Response): Promise<void> => {
        try {
            const count = await this.userService.getUserCount();

            res.status(200).json({
                success: true,
                data: { total: count }
            });

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener conteo de usuarios',
                error: error.message
            });
        }
    };

    /**
     * GET /api/usuarios/stats/general
     * Obtiene estadísticas generales de usuarios
     */
    public getStats = async (req: Request, res: Response): Promise<void> => {
        try {
            const stats = await this.userService.getUserStats();

            res.status(200).json({
                success: true,
                data: stats
            });

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener estadísticas',
                error: error.message
            });
        }
    };

    /**
     * GET /api/usuarios/nuevos
     * Obtiene usuarios nuevos (registrados hace menos de 30 días)
     */
    public getNewUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuarios = await this.userService.getNewUsers();

            res.status(200).json({
                success: true,
                data: usuarios.map(u => this.sanitizarUsuario(u))
            });

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener usuarios nuevos',
                error: error.message
            });
        }
    };

    /**
     * POST /api/usuarios/login
     * Valida credenciales de usuario y genera tokens JWT
     */
    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: 'Email y contraseña son requeridos'
                });
                return;
            }

            const usuario = await this.userService.validateCredentials(email, password);

            if (!usuario) {
                res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
                return;
            }

            // Generar tokens JWT
            const accessToken = generateAccessToken({
                userId: usuario.id!,
                email: usuario.email,
                rol: usuario.rol
            });

            const refreshToken = generateRefreshToken({
                userId: usuario.id!,
                email: usuario.email,
                rol: usuario.rol
            });

            // Preparar datos del usuario con IDs según el rol
            const usuarioData = this.sanitizarUsuario(usuario);
            const userData: any = {
                ...usuarioData,
            };

            // Agregar adminId si es ADMIN (usa el mismo userId)
            if (usuario.rol === 'ADMIN') {
                userData.adminId = usuario.id;
            }

            res.status(200).json({
                success: true,
                message: 'Login exitoso',
                data: {
                    user: userData,
                    tokens: {
                        accessToken,
                        refreshToken
                    }
                }
            });

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al validar credenciales',
                error: error.message
            });
        }
    };

    /**
     * PUT /api/usuarios/:id/rol
     * Cambia el rol de un usuario
     */
    public changeRole = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const { rol } = req.body;

            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    message: 'ID inválido'
                });
                return;
            }

            if (!rol) {
                res.status(400).json({
                    success: false,
                    message: 'El rol es requerido'
                });
                return;
            }

            // Validar que el rol sea válido
            if (!Object.values(Role).includes(rol)) {
                res.status(400).json({
                    success: false,
                    message: 'Rol inválido'
                });
                return;
            }

            const usuarioActualizado = await this.userService.changeUserRole(id, rol);

            res.status(200).json({
                success: true,
                message: 'Rol actualizado exitosamente',
                data: this.sanitizarUsuario(usuarioActualizado)
            });

        } catch (error: any) {
            if (error.message.includes('no encontrado')) {
                res.status(404).json({
                    success: false,
                    message: error.message
                });
                return;
            }

            res.status(500).json({
                success: false,
                message: 'Error al cambiar rol',
                error: error.message
            });
        }
    };

    /**
     * GET /api/usuarios/check-email/:email
     * Verifica si un email está disponible
     */
    public checkEmailAvailability = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.params;

            const disponible = await this.userService.isEmailAvailable(email);

            res.status(200).json({
                success: true,
                data: {
                    email,
                    disponible
                }
            });

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error al verificar disponibilidad de email',
                error: error.message
            });
        }
    };

    /**
     * Método auxiliar para remover la contraseña de la respuesta
     * @param usuario - Usuario a sanitizar
     * @returns Objeto usuario sin el campo password
     */
    private sanitizarUsuario(usuario: Usuario): any {
        const usuarioJSON = usuario.toJSON();
        const { password, ...usuarioSinPassword } = usuarioJSON;
        return usuarioSinPassword;
    }
}
