import { Router } from 'express';
import { OrdenController } from '../controllers/OrdenController';
import { authenticate } from '../middlewares/auth.middleware';
import { adminOnly, adminOrOrganizer } from '../middlewares/authorize.middleware';

const router = Router();
const ordenController = new OrdenController();

/**
 * @swagger
 * /api/ordenes:
 *   post:
 *     summary: Crear una nueva orden (Compra de boletos)
 *     description: |
 *       Crea una nueva orden de compra con los boletos seleccionados.
 *       - El total se calcula automáticamente basado en los precios de los boletos
 *       - La orden se crea en estado PENDIENTE
 *       - Los boletos quedan reservados para esta orden
 *       - Cualquier usuario autenticado puede crear una orden
 *       - Luego debe proceder al pago usando POST /api/ordenes/:id/pagar
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrdenCreate'
 *     responses:
 *       201:
 *         description: Orden creada exitosamente en estado PENDIENTE
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
 *                   example: Orden creada exitosamente. Proceda al pago.
 *                 data:
 *                   $ref: '#/components/schemas/Orden'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       409:
 *         description: Boletos no disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Algunos boletos no están disponibles
 */
router.post('/', authenticate, ordenController.crearOrden);

/**
 * @swagger
 * /api/ordenes:
 *   get:
 *     summary: Obtener todas las Órdenes
 *     description: Obtiene la lista completa de órdenes (Solo Admin/Organizador)
 *     tags: [órdenes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes obtenida
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
 *                     $ref: '#/components/schemas/Orden'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get('/', authenticate, adminOrOrganizer, ordenController.obtenerTodasLasOrdenes);

/**
 * @swagger
 * /api/ordenes/estadisticas:
 *   get:
 *     summary: Obtener estadísticas de órdenes
 *     description: Obtiene estadísticas generales de órdenes (Solo Admin/Organizador)
 *     tags: [órdenes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas
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
 *                   $ref: '#/components/schemas/OrdenEstadisticas'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get('/estadisticas', authenticate, adminOrOrganizer, ordenController.obtenerEstadisticas);

/**
 * @swagger
 * /api/ordenes/mis-ordenes:
 *   get:
 *     summary: Obtener mis órdenes
 *     description: Obtiene todas las órdenes del usuario autenticado (historial de compras)
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Órdenes del usuario obtenidas
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
 *                     $ref: '#/components/schemas/Orden'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/mis-ordenes', authenticate, ordenController.obtenerMisOrdenes);

/**
 * @swagger
 * /api/ordenes/usuario/{usuarioId}:
 *   get:
 *     summary: Obtener órdenes de un usuario
 *     description: Obtiene todas las órdenes de un usuario específico
 *     tags: [órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Órdenes del usuario obtenidas
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
 *                     $ref: '#/components/schemas/Orden'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/usuario/:usuarioId', authenticate, ordenController.obtenerOrdenesPorUsuario);

/**
 * @swagger
 * /api/ordenes/estado/{estado}:
 *   get:
 *     summary: Obtener órdenes por estado
 *     description: Obtiene todas las órdenes con un estado específico (Solo Admin/Organizador)
 *     tags: [órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: estado
 *         required: true
 *         schema:
 *           type: string
 *           enum: [PENDIENTE, PAGADO, CANCELADO, REEMBOLSADO]
 *         description: Estado de las órdenes
 *     responses:
 *       200:
 *         description: Órdenes obtenidas por estado
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
 *                     $ref: '#/components/schemas/Orden'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get('/estado/:estado', authenticate, adminOrOrganizer, ordenController.obtenerOrdenesPorEstado);

/**
 * @swagger
 * /api/ordenes/{id}:
 *   get:
 *     summary: Obtener orden por ID
 *     description: Obtiene los detalles de una orden específica
 *     tags: [órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Orden'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', authenticate, ordenController.obtenerOrdenPorId);

/**
 * @swagger
 * /api/ordenes/{id}/estado:
 *   put:
 *     summary: Actualizar estado de orden
 *     description: Actualiza el estado de una orden (Solo Admin/Organizador)
 *     tags: [órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrdenEstadoUpdate'
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
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
 *                   $ref: '#/components/schemas/Orden'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put('/:id/estado', authenticate, adminOrOrganizer, ordenController.actualizarEstadoOrden);

/**
 * @swagger
 * /api/ordenes/{id}/pagar:
 *   post:
 *     summary: Pagar orden
 *     description: |
 *       Marca una orden pendiente como pagada (completa el proceso de compra).
 *       - El usuario puede pagar su propia orden
 *       - Admin/Organizador puede marcar cualquier orden como pagada
 *       - Solo se pueden pagar órdenes en estado PENDIENTE
 *       - Los boletos quedan asignados definitivamente al usuario
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Pago procesado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Pago procesado exitosamente. Orden completada.
 *                 data:
 *                   $ref: '#/components/schemas/Orden'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/:id/pagar', authenticate, ordenController.marcarComoPagada);

/**
 * @swagger
 * /api/ordenes/{id}/cancelar:
 *   post:
 *     summary: Cancelar orden
 *     description: Cancela una orden pendiente y libera los boletos
 *     tags: [órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden cancelada exitosamente
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
 *                   $ref: '#/components/schemas/Orden'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/:id/cancelar', authenticate, ordenController.cancelarOrden);

/**
 * @swagger
 * /api/ordenes/{id}/reembolsar:
 *   post:
 *     summary: Reembolsar orden
 *     description: Procesa un reembolso para una orden pagada y libera los boletos (Solo Admin)
 *     tags: [órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden reembolsada exitosamente
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
 *                   $ref: '#/components/schemas/Orden'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post('/:id/reembolsar', authenticate, adminOnly, ordenController.reembolsarOrden);

/**
 * @swagger
 * /api/ordenes/{id}:
 *   delete:
 *     summary: Eliminar orden
 *     description: Elimina una orden pendiente o cancelada y libera los boletos (Solo Admin)
 *     tags: [órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden eliminada exitosamente
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
router.delete('/:id', authenticate, adminOnly, ordenController.eliminarOrden);

export default router;
