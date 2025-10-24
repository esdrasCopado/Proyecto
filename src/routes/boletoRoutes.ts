import { Router } from 'express';
import { BoletoController } from '../controllers/BoletoController';
import { authenticate } from '../middlewares/auth.middleware';
import { adminOnly, adminOrOrganizer } from '../middlewares/authorize.middleware';

const router = Router();
const boletoController = new BoletoController();

/**
 * @swagger
 * /api/boletos/lote:
 *   post:
 *     summary: Crear boletos en lote
 *     description: Crea múltiples boletos de manera masiva para un evento (Solo Admin/Organizador). Permite crear cientos o miles de boletos eficientemente.
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoletoLoteCreate'
 *     responses:
 *       201:
 *         description: Boletos creados exitosamente
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
 *                   example: 350 boletos creados exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/BoletoLoteResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post('/lote', authenticate, adminOrOrganizer, boletoController.crearBoletosEnLote);

/**
 * @swagger
 * /api/boletos:
 *   post:
 *     summary: Crear un nuevo boleto
 *     description: Crea un nuevo boleto individual para un evento específico (Solo organizadores y administradores)
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoletoCreate'
 *     responses:
 *       201:
 *         description: Boleto creado exitosamente
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
 *                   example: Boleto creado exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Boleto'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post('/', authenticate, adminOrOrganizer, boletoController.crearBoleto);

/**
 * @swagger
 * /api/boletos:
 *   get:
 *     summary: Obtener todos los boletos
 *     description: Obtiene la lista completa de boletos del sistema
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de boletos obtenida
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
 *                     $ref: '#/components/schemas/Boleto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authenticate, boletoController.obtenerTodosLosBoletos);

/**
 * @swagger
 * /api/boletos/{id}:
 *   get:
 *     summary: Obtener boleto por ID
 *     description: Obtiene los detalles de un boleto específico
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del boleto
 *     responses:
 *       200:
 *         description: Boleto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Boleto'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', authenticate, boletoController.obtenerBoletoPorId);

/**
 * @swagger
 * /api/boletos/{id}:
 *   put:
 *     summary: Actualizar boleto
 *     description: Actualiza la información de un boleto (Solo Admin/Organizador)
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del boleto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoletoUpdate'
 *     responses:
 *       200:
 *         description: Boleto actualizado exitosamente
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
 *                   $ref: '#/components/schemas/Boleto'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put('/:id', authenticate, adminOrOrganizer, boletoController.actualizarBoleto);

/**
 * @swagger
 * /api/boletos/{id}:
 *   delete:
 *     summary: Eliminar boleto
 *     description: Elimina un boleto del sistema (Solo Admin)
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del boleto
 *     responses:
 *       200:
 *         description: Boleto eliminado exitosamente
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
router.delete('/:id', authenticate, adminOnly, boletoController.eliminarBoleto);

/**
 * @swagger
 * /api/boletos/evento/{eventoId}:
 *   get:
 *     summary: Obtener boletos por evento
 *     description: Obtiene todos los boletos de un evento específico
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Boletos del evento obtenidos
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
 *                     $ref: '#/components/schemas/Boleto'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/evento/:eventoId', authenticate, boletoController.buscarBoletosPorEvento);

/**
 * @swagger
 * /api/boletos/evento/{eventoId}/disponibles:
 *   get:
 *     summary: Obtener boletos disponibles de un evento
 *     description: Obtiene todos los boletos disponibles (no vendidos) de un evento específico
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Boletos disponibles obtenidos
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
 *                     $ref: '#/components/schemas/Boleto'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/evento/:eventoId/disponibles', authenticate, boletoController.obtenerBoletosDisponibles);

/**
 * @swagger
 * /api/boletos/{id}/comprar:
 *   post:
 *     summary: Comprar un boleto
 *     description: Asigna un boleto al usuario autenticado (compra)
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del boleto
 *     responses:
 *       200:
 *         description: Boleto comprado exitosamente
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
 *                   $ref: '#/components/schemas/Boleto'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       409:
 *         description: Boleto no disponible
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
 *                   example: El boleto no está disponible
 */
router.post('/:id/comprar', authenticate, boletoController.comprarBoleto);

/**
 * @swagger
 * /api/boletos/{id}/liberar:
 *   post:
 *     summary: Liberar un boleto
 *     description: Libera un boleto haciéndolo disponible nuevamente (Solo Admin/Organizador)
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del boleto
 *     responses:
 *       200:
 *         description: Boleto liberado exitosamente
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
 *                   $ref: '#/components/schemas/Boleto'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post('/:id/liberar', authenticate, adminOnly, boletoController.liberarBoleto);

/**
 * @swagger
 * /api/boletos/evento/{eventoId}/estadisticas:
 *   get:
 *     summary: Obtener estadísticas de boletos de un evento
 *     description: Obtiene estadísticas (total, disponibles, vendidos, porcentaje) de boletos de un evento
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
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
 *                   $ref: '#/components/schemas/BoletoEstadisticas'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/evento/:eventoId/estadisticas', authenticate, boletoController.obtenerEstadisticasEvento);

/**
 * @swagger
 * /api/boletos/evento/{eventoId}/verificar-disponibilidad:
 *   get:
 *     summary: Verificar disponibilidad de boletos
 *     description: Verifica si hay suficientes boletos disponibles para un evento
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *       - in: query
 *         name: cantidad
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Cantidad de boletos requeridos
 *     responses:
 *       200:
 *         description: Disponibilidad verificada
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
 *                   $ref: '#/components/schemas/VerificarDisponibilidad'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/evento/:eventoId/verificar-disponibilidad', authenticate, boletoController.verificarDisponibilidad);

/**
 * @swagger
 * /api/boletos/evento/{eventoId}:
 *   delete:
 *     summary: Eliminar todos los boletos de un evento
 *     description: Elimina todos los boletos asociados a un evento (Solo Admin/Organizador)
 *     tags: [Boletos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Boletos eliminados exitosamente
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
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       description: Cantidad de boletos eliminados
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.delete('/evento/:eventoId', authenticate, adminOrOrganizer, boletoController.eliminarBoletosPorEvento);

export default router;