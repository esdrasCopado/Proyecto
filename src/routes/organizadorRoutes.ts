import { Router, Request, Response } from 'express';
import { OrganizadoresController } from '../controllers/OrganizadorController';
import { authenticate } from '../middlewares/auth.middleware';
import { adminOnly, adminOrOrganizer } from '../middlewares/authorize.middleware';

const router = Router();
const organizadoresController = new OrganizadoresController();

/**
 * @swagger
 * /api/organizadores:
 *   post:
 *     summary: Crear nuevo organizador
 *     description: Registra un nuevo organizador en el sistema (Solo Admin)
 *     tags: [Organizadores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganizadorCreate'
 *     responses:
 *       201:
 *         description: Organizador creado exitosamente
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
 *                   example: Organizador creado exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Organizador'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post('/', authenticate, adminOnly, (req: Request, res: Response) => organizadoresController.createOrganizador(req, res));

/**
 * @swagger
 * /api/organizadores/{id}:
 *   get:
 *     summary: Obtener organizador por ID
 *     description: Obtiene la información de un organizador específico (Admin/Organizador)
 *     tags: [Organizadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del organizador
 *     responses:
 *       200:
 *         description: Organizador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Organizador'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get('/:id', authenticate, adminOrOrganizer, (req: Request, res: Response) => organizadoresController.getOrganizadorById(req, res));

/**
 * @swagger
 * /api/organizadores/{id}:
 *   put:
 *     summary: Actualizar organizador
 *     description: Actualiza la información de un organizador (Propietario o Admin)
 *     tags: [Organizadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del organizador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganizadorUpdate'
 *     responses:
 *       200:
 *         description: Organizador actualizado exitosamente
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
 *                   example: Organizador actualizado exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Organizador'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put('/:id', authenticate, adminOrOrganizer, (req: Request, res: Response) => organizadoresController.updateOrganizador(req, res));

/**
 * @swagger
 * /api/organizadores/{id}:
 *   delete:
 *     summary: Eliminar organizador
 *     description: Elimina un organizador del sistema (Solo Admin)
 *     tags: [Organizadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del organizador
 *     responses:
 *       200:
 *         description: Organizador eliminado exitosamente
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
 *                   example: Organizador eliminado exitosamente
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.delete('/:id', authenticate, adminOnly, (req: Request, res: Response) => organizadoresController.deleteOrganizador(req, res));

export default router;
