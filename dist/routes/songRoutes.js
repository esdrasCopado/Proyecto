"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songController_1 = require("../controllers/songController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authorize_middleware_1 = require("../middlewares/authorize.middleware");
const router = (0, express_1.Router)();
const songController = new songController_1.SongController();
/**
 * @swagger
 * /api/songs:
 *   post:
 *     summary: Crear nueva canción
 *     description: Crea una nueva canción en el sistema (Solo Admin)
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SongCreate'
 *     responses:
 *       201:
 *         description: Canción creada exitosamente
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
 *                   example: Canción creada exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Song'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post('/', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => songController.create(req, res));
/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Listar todas las canciones
 *     description: Obtiene la lista completa de canciones
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: Lista de canciones obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Song'
 */
router.get('/', (req, res) => songController.findAll(req, res));
/**
 * @swagger
 * /api/songs/count:
 *   get:
 *     summary: Contar canciones
 *     description: Obtiene el número total de canciones
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: Conteo obtenido
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
 *                     total:
 *                       type: integer
 */
router.get('/count', (req, res) => songController.getCount(req, res));
/**
 * @swagger
 * /api/songs/con-video:
 *   get:
 *     summary: Obtener canciones con video
 *     description: Obtiene todas las canciones que tienen video asociado
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: Canciones con video obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Song'
 */
router.get('/con-video', (req, res) => songController.findWithVideo(req, res));
/**
 * @swagger
 * /api/songs/album/{albumId}:
 *   get:
 *     summary: Obtener canciones de un álbum
 *     description: Obtiene todas las canciones de un álbum específico
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: albumId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del álbum
 *     responses:
 *       200:
 *         description: Canciones del álbum obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Song'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.get('/album/:albumId', (req, res) => songController.findByAlbum(req, res));
/**
 * @swagger
 * /api/songs/buscar/{titulo}:
 *   get:
 *     summary: Buscar canciones por título
 *     description: Busca canciones que contengan el texto especificado en el título
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: titulo
 *         required: true
 *         schema:
 *           type: string
 *         description: Texto a buscar en el título
 *     responses:
 *       200:
 *         description: Canciones encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Song'
 */
router.get('/buscar/:titulo', (req, res) => songController.searchByTitulo(req, res));
/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     summary: Obtener canción por ID
 *     description: Obtiene los detalles de una canción específica
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la canción
 *     responses:
 *       200:
 *         description: Canción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Song'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', (req, res) => songController.findById(req, res));
/**
 * @swagger
 * /api/songs/{id}:
 *   put:
 *     summary: Actualizar canción
 *     description: Actualiza la información de una canción (Solo Admin)
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la canción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SongUpdate'
 *     responses:
 *       200:
 *         description: Canción actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Song'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put('/:id', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => songController.update(req, res));
/**
 * @swagger
 * /api/songs/{id}:
 *   delete:
 *     summary: Eliminar canción
 *     description: Elimina una canción del sistema (Solo Admin)
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la canción
 *     responses:
 *       200:
 *         description: Canción eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.delete('/:id', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => songController.delete(req, res));
exports.default = router;
//# sourceMappingURL=songRoutes.js.map