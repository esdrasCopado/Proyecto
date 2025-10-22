"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventoController_1 = require("../controllers/EventoController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authorize_middleware_1 = require("../middlewares/authorize.middleware");
const router = (0, express_1.Router)();
const eventoController = new EventoController_1.EventoController();
/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Crear nuevo evento
 *     description: Crea un nuevo evento en el sistema (Solo Admin/Organizador)
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventoCreate'
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
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
 *                   example: Evento creado exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/Evento'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post('/', auth_middleware_1.authenticate, authorize_middleware_1.adminOrOrganizer, (req, res) => eventoController.create(req, res));
/**
 * @swagger
 * /api/eventos:
 *   get:
 *     summary: Listar todos los eventos
 *     description: Obtiene la lista completa de eventos
 *     tags: [Eventos]
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
 *                     $ref: '#/components/schemas/Evento'
 */
router.get('/', (req, res) => eventoController.findAll(req, res));
/**
 * @swagger
 * /api/eventos/proximos:
 *   get:
 *     summary: Obtener eventos próximos
 *     description: Obtiene eventos futuros ordenados por fecha
 *     tags: [Eventos]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número máximo de eventos a devolver
 *     responses:
 *       200:
 *         description: Eventos próximos obtenidos
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
 *                     $ref: '#/components/schemas/Evento'
 */
router.get('/proximos', (req, res) => eventoController.findProximos(req, res));
/**
 * @swagger
 * /api/eventos/pasados:
 *   get:
 *     summary: Obtener eventos pasados
 *     description: Obtiene eventos que ya finalizaron
 *     tags: [Eventos]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número máximo de eventos a devolver
 *     responses:
 *       200:
 *         description: Eventos pasados obtenidos
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
 *                     $ref: '#/components/schemas/Evento'
 */
router.get('/pasados', (req, res) => eventoController.findPasados(req, res));
/**
 * @swagger
 * /api/eventos/estadisticas:
 *   get:
 *     summary: Obtener estadísticas de eventos
 *     description: Obtiene estadísticas generales (total, próximos, pasados)
 *     tags: [Eventos]
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     proximos:
 *                       type: integer
 *                     pasados:
 *                       type: integer
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/estadisticas', auth_middleware_1.authenticate, authorize_middleware_1.adminOrOrganizer, (req, res) => eventoController.getEstadisticas(req, res));
/**
 * @swagger
 * /api/eventos/count:
 *   get:
 *     summary: Contar eventos
 *     description: Obtiene el número total de eventos
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/count', auth_middleware_1.authenticate, authorize_middleware_1.adminOrOrganizer, (req, res) => eventoController.getCount(req, res));
/**
 * @swagger
 * /api/eventos/rango-fecha:
 *   get:
 *     summary: Buscar eventos por rango de fechas
 *     description: Obtiene eventos entre dos fechas específicas
 *     tags: [Eventos]
 *     parameters:
 *       - in: query
 *         name: fechaInicio
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha de inicio
 *       - in: query
 *         name: fechaFin
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha fin
 *     responses:
 *       200:
 *         description: Eventos encontrados
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
 *                     $ref: '#/components/schemas/Evento'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.get('/rango-fecha', (req, res) => eventoController.findByRangoFecha(req, res));
/**
 * @swagger
 * /api/eventos/organizador/{organizadorId}:
 *   get:
 *     summary: Obtener eventos de un organizador
 *     description: Obtiene todos los eventos creados por un organizador específico
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: organizadorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del organizador
 *     responses:
 *       200:
 *         description: Eventos del organizador obtenidos
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
 *                     $ref: '#/components/schemas/Evento'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.get('/organizador/:organizadorId', (req, res) => eventoController.findByOrganizador(req, res));
/**
 * @swagger
 * /api/eventos/{id}:
 *   get:
 *     summary: Obtener evento por ID
 *     description: Obtiene los detalles de un evento específico
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Evento'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', (req, res) => eventoController.findById(req, res));
/**
 * @swagger
 * /api/eventos/{id}:
 *   put:
 *     summary: Actualizar evento
 *     description: Actualiza la información de un evento (Solo Admin/Organizador propietario)
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventoUpdate'
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente
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
 *                   $ref: '#/components/schemas/Evento'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put('/:id', auth_middleware_1.authenticate, authorize_middleware_1.adminOrOrganizer, (req, res) => eventoController.update(req, res));
/**
 * @swagger
 * /api/eventos/{id}:
 *   delete:
 *     summary: Eliminar evento
 *     description: Elimina un evento del sistema (Solo Admin)
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento eliminado exitosamente
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
router.delete('/:id', auth_middleware_1.authenticate, authorize_middleware_1.adminOnly, (req, res) => eventoController.delete(req, res));
exports.default = router;
//# sourceMappingURL=eventoRoutes.js.map