"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authorize_middleware_1 = require("../middlewares/authorize.middleware");
const router = (0, express_1.Router)();
const controller = new usuarioController_1.UsuarioController();
// ============ RUTAS PÚBLICAS (sin autenticación) ============
/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y devuelve tokens JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post('/login', (req, res) => controller.login(req, res));
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Registrar nuevo usuario
 *     description: Crea una cuenta de usuario nueva
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCreate'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuario creado exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         description: Email ya registrado
 */
router.post('/', (req, res) => controller.create(req, res));
/**
 * @swagger
 * /api/usuarios/check-email/{email}:
 *   get:
 *     summary: Verificar disponibilidad de email
 *     description: Verifica si un email está disponible para registro
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email a verificar
 *     responses:
 *       200:
 *         description: Resultado de la verificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     disponible:
 *                       type: boolean
 */
router.get('/check-email/:email', (req, res) => controller.checkEmailAvailability(req, res));
// ============ RUTAS PROTEGIDAS (requieren autenticación) ============
/**
 * @swagger
 * /api/usuarios/stats/count:
 *   get:
 *     summary: Obtener conteo de usuarios
 *     description: Devuelve el número total de usuarios registrados (Solo Admin/Organizador)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conteo exitoso
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get('/stats/count', auth_middleware_1.authenticate, authorize_middleware_1.adminOrOrganizer, (req, res) => controller.getCount(req, res));
/**
 * @swagger
 * /api/usuarios/stats/general:
 *   get:
 *     summary: Obtener estadísticas generales
 *     description: Devuelve estadísticas completas de usuarios (Solo Admin/Organizador)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get('/stats/general', auth_middleware_1.authenticate, authorize_middleware_1.adminOrOrganizer, (req, res) => controller.getStats(req, res));
/**
 * @swagger
 * /api/usuarios/nuevos:
 *   get:
 *     summary: Obtener usuarios nuevos
 *     description: Devuelve usuarios registrados en los últimos 30 días (Solo Admin/Organizador)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios nuevos
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/nuevos', auth_middleware_1.authenticate, authorize_middleware_1.adminOrOrganizer, (req, res) => controller.getNewUsers(req, res));
/**
 * @swagger
 * /api/usuarios/email/{email}:
 *   get:
 *     summary: Buscar usuario por email
 *     description: Obtiene un usuario por su email (Solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get('/email/:email', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => controller.getByEmail(req, res));
/**
 * @swagger
 * /api/usuarios/{id}/rol:
 *   put:
 *     summary: Cambiar rol de usuario
 *     description: Actualiza el rol de un usuario (Solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rol]
 *             properties:
 *               rol:
 *                 type: string
 *                 enum: [USER, ARTISTA, ORGANIZADOR, ADMIN]
 *     responses:
 *       200:
 *         description: Rol actualizado
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put('/:id/rol', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => controller.changeRole(req, res));
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar usuarios
 *     description: Obtiene lista de usuarios con filtros opcionales (Solo Admin/Organizador)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Tamaño de página
 *       - in: query
 *         name: rol
 *         schema:
 *           type: string
 *           enum: [USER, ARTISTA, ORGANIZADOR, ADMIN]
 *         description: Filtrar por rol
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Buscar por nombre
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', auth_middleware_1.authenticate, authorize_middleware_1.adminOrOrganizer, (req, res) => controller.getAll(req, res));
/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener perfil de usuario
 *     description: Obtiene información de un usuario (Propietario o Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorizeOwnerOrAdmin)((req) => Number(req.params.id)), (req, res) => controller.getById(req, res));
/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar perfil
 *     description: Actualiza información de un usuario (Propietario o Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put('/:id', auth_middleware_1.authenticate, (0, authorize_middleware_1.authorizeOwnerOrAdmin)((req) => Number(req.params.id)), (req, res) => controller.update(req, res));
/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     description: Elimina un usuario del sistema (Solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.delete('/:id', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => controller.delete(req, res));
exports.default = router;
//# sourceMappingURL=usuarioRoutes.js.map