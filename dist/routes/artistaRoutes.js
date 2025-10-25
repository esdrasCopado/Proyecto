"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArtistaController_1 = require("../controllers/ArtistaController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authorize_middleware_1 = require("../middlewares/authorize.middleware");
const router = (0, express_1.Router)();
const artistaController = new ArtistaController_1.ArtistaController();
/**
 * @swagger
 * /api/artistas:
 *   post:
 *     summary: Crear nuevo artista
 *     description: Crea un nuevo artista en el sistema (Solo Admin)
 *     tags: [Artistas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArtistaCreate'
 *     responses:
 *       201:
 *         description: Artista creado exitosamente
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
 *                   example: Artista creado exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Artista'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post('/', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => artistaController.create(req, res));
/**
 * @swagger
 * /api/artistas:
 *   get:
 *     summary: Listar todos los artistas
 *     description: Obtiene la lista completa de artistas
 *     tags: [Artistas]
 *     responses:
 *       200:
 *         description: Lista de artistas obtenida
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
 *                     $ref: '#/components/schemas/Artista'
 */
router.get('/', (req, res) => artistaController.findAll(req, res));
/**
 * @swagger
 * /api/artistas/{id}:
 *   get:
 *     summary: Obtener artista por ID
 *     description: Obtiene los detalles de un artista específico
 *     tags: [Artistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artista
 *     responses:
 *       200:
 *         description: Artista encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Artista'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', (req, res) => artistaController.findById(req, res));
/**
 * @swagger
 * /api/artistas/{id}:
 *   put:
 *     summary: Actualizar artista
 *     description: Actualiza la información de un artista (Solo Admin)
 *     tags: [Artistas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArtistaUpdate'
 *     responses:
 *       200:
 *         description: Artista actualizado exitosamente
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
 *                   $ref: '#/components/schemas/Artista'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put('/:id', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => artistaController.update(req, res));
/**
 * @swagger
 * /api/artistas/{id}:
 *   delete:
 *     summary: Eliminar artista
 *     description: Elimina un artista del sistema (Solo Admin)
 *     tags: [Artistas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artista
 *     responses:
 *       200:
 *         description: Artista eliminado exitosamente
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
router.delete('/:id', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => artistaController.delete(req, res));
exports.default = router;
//# sourceMappingURL=artistaRoutes.js.map