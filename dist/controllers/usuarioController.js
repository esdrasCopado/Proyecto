"use strict";
/**
 * UsuarioController
 * Controlador que maneja las peticiones HTTP relacionadas con usuarios
 * Utiliza UserService para la lógica de negocio
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const userService_1 = require("../services/userService");
const enums_1 = require("../types/enums");
const jwt_1 = require("../utils/jwt");
class UsuarioController {
    constructor() {
        /**
         * GET /api/usuarios
         * Obtiene todos los usuarios o filtra según parámetros de query
         */
        this.getAll = async (req, res) => {
            try {
                const { rol, nombre, page, pageSize } = req.query;
                // Si hay paginación
                if (page && pageSize) {
                    const usuarios = await this.userService.getUsersWithPagination(Number(page), Number(pageSize));
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
                    const usuarios = await this.userService.getUsersByRole(rol);
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
            }
            catch (error) {
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
        this.getById = async (req, res) => {
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
            }
            catch (error) {
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
        this.getByEmail = async (req, res) => {
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
            }
            catch (error) {
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
        this.create = async (req, res) => {
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
                    rol: rol || enums_1.Role.USER
                });
                res.status(201).json({
                    success: true,
                    message: 'Usuario creado exitosamente',
                    data: this.sanitizarUsuario(usuarioCreado)
                });
            }
            catch (error) {
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
        this.update = async (req, res) => {
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
                const updateData = {};
                if (email)
                    updateData.email = email;
                if (password)
                    updateData.password = password;
                if (nombre)
                    updateData.nombre = nombre;
                if (apellidos)
                    updateData.apellidos = apellidos;
                if (telefono)
                    updateData.telefono = telefono;
                if (rol)
                    updateData.rol = rol;
                // Actualizar usando el servicio
                const usuarioActualizado = await this.userService.updateUser(id, updateData);
                res.status(200).json({
                    success: true,
                    message: 'Usuario actualizado exitosamente',
                    data: this.sanitizarUsuario(usuarioActualizado)
                });
            }
            catch (error) {
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
        this.delete = async (req, res) => {
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
            }
            catch (error) {
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
        this.getCount = async (req, res) => {
            try {
                const count = await this.userService.getUserCount();
                res.status(200).json({
                    success: true,
                    data: { total: count }
                });
            }
            catch (error) {
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
        this.getStats = async (req, res) => {
            try {
                const stats = await this.userService.getUserStats();
                res.status(200).json({
                    success: true,
                    data: stats
                });
            }
            catch (error) {
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
        this.getNewUsers = async (req, res) => {
            try {
                const usuarios = await this.userService.getNewUsers();
                res.status(200).json({
                    success: true,
                    data: usuarios.map(u => this.sanitizarUsuario(u))
                });
            }
            catch (error) {
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
        this.login = async (req, res) => {
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
                const accessToken = (0, jwt_1.generateAccessToken)({
                    userId: usuario.id,
                    email: usuario.email,
                    rol: usuario.rol
                });
                const refreshToken = (0, jwt_1.generateRefreshToken)({
                    userId: usuario.id,
                    email: usuario.email,
                    rol: usuario.rol
                });
                // Preparar datos del usuario con IDs según el rol
                const usuarioData = this.sanitizarUsuario(usuario);
                const userData = {
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
            }
            catch (error) {
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
        this.changeRole = async (req, res) => {
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
                if (!Object.values(enums_1.Role).includes(rol)) {
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
            }
            catch (error) {
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
        this.checkEmailAvailability = async (req, res) => {
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error al verificar disponibilidad de email',
                    error: error.message
                });
            }
        };
        this.userService = new userService_1.UserService();
    }
    /**
     * Método auxiliar para remover la contraseña de la respuesta
     * @param usuario - Usuario a sanitizar
     * @returns Objeto usuario sin el campo password
     */
    sanitizarUsuario(usuario) {
        const usuarioJSON = usuario.toJSON();
        const { password, ...usuarioSinPassword } = usuarioJSON;
        return usuarioSinPassword;
    }
}
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuarioController.js.map