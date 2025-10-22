"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoController = void 0;
const EventoService_1 = require("../services/EventoService");
/**
 * Controlador para gestión de eventos
 */
class EventoController {
    constructor() {
        /**
         * POST /api/eventos
         * Crea un nuevo evento
         */
        this.create = async (req, res) => {
            try {
                const { nombre, descripcion, fecha, ubicacion, organizadorId } = req.body;
                if (!nombre || !fecha || !ubicacion || !organizadorId) {
                    return this.errorResponse(res, new Error('Faltan campos requeridos: nombre, fecha, ubicacion, organizadorId'), 400);
                }
                const nuevoEvento = await this.eventoService.crearEvento({
                    nombre,
                    descripcion,
                    fecha,
                    ubicacion,
                    organizadorId
                });
                return this.successResponse(res, nuevoEvento, 'Evento creado exitosamente', 201);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/eventos/:id
         * Obtiene un evento por su ID
         */
        this.findById = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.id, 'ID del evento');
                const evento = await this.eventoService.obtenerEventoPorId(eventoId);
                if (!evento) {
                    return this.errorResponse(res, new Error('Evento no encontrado'), 404);
                }
                return this.successResponse(res, evento);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/eventos
         * Obtiene todos los eventos
         */
        this.findAll = async (req, res) => {
            try {
                const eventos = await this.eventoService.obtenerTodosLosEventos();
                return this.successResponse(res, eventos, `${eventos.length} eventos encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * PUT /api/eventos/:id
         * Actualiza un evento
         */
        this.update = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.id, 'ID del evento');
                const { nombre, descripcion, fecha, ubicacion, organizadorId } = req.body;
                if (!nombre && !descripcion && !fecha && !ubicacion && !organizadorId) {
                    return this.errorResponse(res, new Error('Debe proporcionar al menos un campo para actualizar'), 400);
                }
                const eventoActualizado = await this.eventoService.actualizarEvento(eventoId, {
                    nombre,
                    descripcion,
                    fecha,
                    ubicacion,
                    organizadorId
                });
                if (!eventoActualizado) {
                    return this.errorResponse(res, new Error('Evento no encontrado'), 404);
                }
                return this.successResponse(res, eventoActualizado, 'Evento actualizado exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * DELETE /api/eventos/:id
         * Elimina un evento
         */
        this.delete = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.id, 'ID del evento');
                const eliminado = await this.eventoService.eliminarEvento(eventoId);
                if (!eliminado) {
                    return this.errorResponse(res, new Error('Evento no encontrado'), 404);
                }
                return this.successResponse(res, null, 'Evento eliminado exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/eventos/organizador/:organizadorId
         * Obtiene eventos de un organizador específico
         */
        this.findByOrganizador = async (req, res) => {
            try {
                const organizadorId = this.validarNumero(req.params.organizadorId, 'ID del organizador');
                const eventos = await this.eventoService.obtenerEventosPorOrganizador(organizadorId);
                return this.successResponse(res, eventos, `${eventos.length} eventos encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/eventos/proximos
         * Obtiene eventos próximos (futuros)
         */
        this.findProximos = async (req, res) => {
            try {
                const limite = req.query.limite ? parseInt(req.query.limite, 10) : undefined;
                const eventos = await this.eventoService.obtenerEventosProximos(limite);
                return this.successResponse(res, eventos, `${eventos.length} eventos próximos`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/eventos/pasados
         * Obtiene eventos pasados
         */
        this.findPasados = async (req, res) => {
            try {
                const limite = req.query.limite ? parseInt(req.query.limite, 10) : undefined;
                const eventos = await this.eventoService.obtenerEventosPasados(limite);
                return this.successResponse(res, eventos, `${eventos.length} eventos pasados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/eventos/rango-fecha
         * Obtiene eventos en un rango de fechas
         */
        this.findByRangoFecha = async (req, res) => {
            try {
                const { fechaInicio, fechaFin } = req.query;
                if (!fechaInicio || !fechaFin) {
                    return this.errorResponse(res, new Error('Se requieren los parámetros fechaInicio y fechaFin'), 400);
                }
                const eventos = await this.eventoService.obtenerEventosPorRangoFecha(fechaInicio, fechaFin);
                return this.successResponse(res, eventos, `${eventos.length} eventos encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/eventos/estadisticas
         * Obtiene estadísticas de eventos
         */
        this.getEstadisticas = async (req, res) => {
            try {
                const estadisticas = await this.eventoService.obtenerEstadisticas();
                return this.successResponse(res, estadisticas, 'Estadísticas obtenidas');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/eventos/count
         * Obtiene el conteo total de eventos
         */
        this.getCount = async (req, res) => {
            try {
                const total = await this.eventoService.contarEventos();
                return this.successResponse(res, { total }, `Total de eventos: ${total}`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        this.eventoService = new EventoService_1.EventoService();
    }
    /**
     * Formato de respuesta estándar para éxito
     */
    successResponse(res, data, message, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message: message || 'Operación exitosa',
            data
        });
    }
    /**
     * Formato de respuesta estándar para error
     */
    errorResponse(res, error, statusCode = 500) {
        let code = statusCode;
        let message = error.message || 'Error en la operación';
        if (message.includes('no encontrado')) {
            code = 404;
        }
        else if (message.includes('no existe')) {
            code = 404;
        }
        else if (message.includes('inválido') || message.includes('requerido')) {
            code = 400;
        }
        return res.status(code).json({
            success: false,
            message,
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
    /**
     * Valida que un parámetro sea un número válido
     */
    validarNumero(valor, nombreCampo) {
        const numero = parseInt(valor, 10);
        if (isNaN(numero) || numero <= 0) {
            throw new Error(`${nombreCampo} debe ser un número válido y mayor a 0`);
        }
        return numero;
    }
}
exports.EventoController = EventoController;
//# sourceMappingURL=EventoController.js.map