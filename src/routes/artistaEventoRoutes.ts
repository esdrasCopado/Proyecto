import { Router } from 'express';
import { ArtistaEventoController } from '../controllers/ArtistaEventoController';
import { authenticate } from '../middlewares/auth.middleware';
import { adminOnly, adminOrOrganizer } from '../middlewares/authorize.middleware';

const router = Router();
const artistaEventoController = new ArtistaEventoController();

/**
 * @swagger
 * /api/eventos/{eventoId}/artistas:
 *   post:
 *     summary: Asignar artista a evento
 *     description: Asigna un artista a un evento específico con rol y compensación (Solo Admin/Organizador)
 *     tags: [ArtistaEvento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArtistaEventoCreate'
 *     responses:
 *       201:
 *         description: Artista asignado exitosamente
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
 *                   example: Artista asignado al evento exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/ArtistaEvento'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         description: Artista o evento no encontrado
 *       409:
 *         description: El artista ya está asignado a este evento
 */
router.post('/:eventoId/artistas', authenticate, adminOrOrganizer, (req, res) =>
    artistaEventoController.asignarArtista(req, res)
);

/**
 * @swagger
 * /api/eventos/{eventoId}/artistas:
 *   get:
 *     summary: Obtener artistas de un evento
 *     description: Obtiene todos los artistas asignados a un evento, opcionalmente filtrados por rol
 *     tags: [ArtistaEvento]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *       - in: query
 *         name: rol
 *         schema:
 *           type: string
 *           enum: [HEADLINER, TELONERO, INVITADO, COLABORADOR]
 *         description: Filtrar por rol del artista
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
 *                     $ref: '#/components/schemas/ArtistaEvento'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:eventoId/artistas', (req, res) =>
    artistaEventoController.obtenerArtistasDeEvento(req, res)
);

/**
 * @swagger
 * /api/eventos/{eventoId}/artistas/headliners:
 *   get:
 *     summary: Obtener headliners de un evento
 *     description: Obtiene los artistas principales (headliners) de un evento
 *     tags: [ArtistaEvento]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Lista de headliners obtenida
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
 *                     $ref: '#/components/schemas/ArtistaEvento'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:eventoId/artistas/headliners', (req, res) =>
    artistaEventoController.obtenerHeadliners(req, res)
);

/**
 * @swagger
 * /api/eventos/{eventoId}/artistas/{artistaId}:
 *   put:
 *     summary: Actualizar asignación de artista
 *     description: Actualiza el rol y/o compensación de un artista en un evento (Solo Admin/Organizador)
 *     tags: [ArtistaEvento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *       - in: path
 *         name: artistaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArtistaEventoUpdate'
 *     responses:
 *       200:
 *         description: Asignación actualizada exitosamente
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
 *                   $ref: '#/components/schemas/ArtistaEvento'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put('/:eventoId/artistas/:artistaId', authenticate, adminOrOrganizer, (req, res) =>
    artistaEventoController.actualizarAsignacion(req, res)
);

/**
 * @swagger
 * /api/eventos/{eventoId}/artistas/{artistaId}:
 *   delete:
 *     summary: Remover artista de evento
 *     description: Remueve un artista de un evento específico (Solo Admin/Organizador)
 *     tags: [ArtistaEvento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *       - in: path
 *         name: artistaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artista
 *     responses:
 *       200:
 *         description: Artista removido exitosamente
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
router.delete('/:eventoId/artistas/:artistaId', authenticate, adminOrOrganizer, (req, res) =>
    artistaEventoController.removerArtista(req, res)
);

/**
 * @swagger
 * /api/artistas/{artistaId}/eventos:
 *   get:
 *     summary: Obtener eventos de un artista
 *     description: Obtiene todos los eventos en los que participa un artista
 *     tags: [ArtistaEvento]
 *     parameters:
 *       - in: path
 *         name: artistaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del artista
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida
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
 *                     $ref: '#/components/schemas/ArtistaEvento'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:artistaId/eventos', (req, res) =>
    artistaEventoController.obtenerEventosDeArtista(req, res)
);

export default router;
