"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const albumController_1 = require("../controllers/albumController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authorize_middleware_1 = require("../middlewares/authorize.middleware");
const router = (0, express_1.Router)();
const albumController = new albumController_1.AlbumController();
/**
 * @swagger
 * /api/albums:
 *   post:
 *     summary: Crear nuevo álbum
 *     description: Crea un nuevo álbum en el sistema (Solo Admin)
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlbumCreate'
 *     responses:
 *       201:
 *         description: Álbum creado exitosamente
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
 *                   example: Álbum creado exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Album'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post('/', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => albumController.create(req, res));
/**
 * @swagger
 * /api/albums:
 *   get:
 *     summary: Listar todos los álbumes
 *     description: Obtiene la lista completa de álbumes
 *     tags: [Albums]
 *     responses:
 *       200:
 *         description: Lista de álbumes obtenida
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
 *                     $ref: '#/components/schemas/Album'
 */
router.get('/', (req, res) => albumController.findAll(req, res));
/**
 * @swagger
 * /api/albums/count:
 *   get:
 *     summary: Contar álbumes
 *     description: Obtiene el número total de álbumes
 *     tags: [Albums]
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
router.get('/count', (req, res) => albumController.getCount(req, res));
/**
 * @swagger
 * /api/albums/artista/{artistaId}:
 *   get:
 *     summary: Obtener álbumes de un artista
 *     description: Obtiene todos los álbumes de un artista específico
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: artistaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artista
 *     responses:
 *       200:
 *         description: Álbumes del artista obtenidos
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
 *                     $ref: '#/components/schemas/Album'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.get('/artista/:artistaId', (req, res) => albumController.findByArtista(req, res));
/**
 * @swagger
 * /api/albums/genero/{genero}:
 *   get:
 *     summary: Buscar álbumes por género
 *     description: Obtiene álbumes de un género específico
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: genero
 *         required: true
 *         schema:
 *           type: string
 *         description: Género musical
 *     responses:
 *       200:
 *         description: Álbumes encontrados
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
 *                     $ref: '#/components/schemas/Album'
 */
router.get('/genero/:genero', (req, res) => albumController.findByGenero(req, res));
/**
 * @swagger
 * /api/albums/{id}:
 *   get:
 *     summary: Obtener álbum por ID
 *     description: Obtiene los detalles de un álbum específico
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del álbum
 *     responses:
 *       200:
 *         description: Álbum encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Album'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', (req, res) => albumController.findById(req, res));
/**
 * @swagger
 * /api/albums/{id}:
 *   put:
 *     summary: Actualizar álbum
 *     description: Actualiza la información de un álbum (Solo Admin)
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del álbum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlbumUpdate'
 *     responses:
 *       200:
 *         description: Álbum actualizado exitosamente
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
 *                   $ref: '#/components/schemas/Album'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put('/:id', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => albumController.update(req, res));
/**
 * @swagger
 * /api/albums/{id}:
 *   delete:
 *     summary: Eliminar álbum
 *     description: Elimina un álbum del sistema (Solo Admin)
 *     tags: [Albums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del álbum
 *     responses:
 *       200:
 *         description: Álbum eliminado exitosamente
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
router.delete('/:id', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => albumController.delete(req, res));
exports.default = router;
//# sourceMappingURL=albumRoutes.js.map