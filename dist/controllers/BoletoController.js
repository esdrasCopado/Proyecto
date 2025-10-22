"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoletoController = void 0;
const BoletoService_1 = require("@/services/BoletoService");
/**
 * Controlador para gestión de boletos
 */
class BoletoController {
    constructor() {
        /**
         * POST /api/boletos
         * Crea un nuevo boleto
         */
        this.crearBoleto = async (req, res) => {
            try {
                const { precio, tipo, disponible, eventoId, usuarioId } = req.body;
                // Validación básica
                if (!precio || !tipo || disponible === undefined || !eventoId) {
                    return this.errorResponse(res, new Error('Faltan campos requeridos: precio, tipo, disponible, eventoId'), 400);
                }
                const boletoData = { precio, tipo, disponible, eventoId, usuarioId };
                const nuevoBoleto = await this.boletoService.crearBoleto(boletoData);
                return this.successResponse(res, nuevoBoleto, 'Boleto creado exitosamente', 201);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/boletos/:id
         * Obtiene un boleto por su ID
         */
        this.obtenerBoletoPorId = async (req, res) => {
            try {
                const boletoId = this.validarNumero(req.params.id, 'ID del boleto');
                const boleto = await this.boletoService.obtenerBoletoPorId(boletoId);
                if (!boleto) {
                    return this.errorResponse(res, new Error('Boleto no encontrado'), 404);
                }
                return this.successResponse(res, boleto);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/boletos
         * Obtiene todos los boletos
         */
        this.obtenerTodosLosBoletos = async (req, res) => {
            try {
                const boletos = await this.boletoService.obtenerTodosLosBoletos();
                return this.successResponse(res, boletos, `${boletos.length} boletos encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * PUT /api/boletos/:id
         * Actualiza un boleto
         */
        this.actualizarBoleto = async (req, res) => {
            try {
                const boletoId = this.validarNumero(req.params.id, 'ID del boleto');
                const { precio, tipo, disponible } = req.body;
                // Validar que al menos un campo esté presente
                if (precio === undefined && tipo === undefined && disponible === undefined) {
                    return this.errorResponse(res, new Error('Debe proporcionar al menos un campo para actualizar'), 400);
                }
                const boletoActualizado = await this.boletoService.actualizarBoleto(boletoId, { precio, tipo, disponible });
                if (!boletoActualizado) {
                    return this.errorResponse(res, new Error('Boleto no encontrado'), 404);
                }
                return this.successResponse(res, boletoActualizado, 'Boleto actualizado exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * DELETE /api/boletos/:id
         * Elimina un boleto
         */
        this.eliminarBoleto = async (req, res) => {
            try {
                const boletoId = this.validarNumero(req.params.id, 'ID del boleto');
                const eliminado = await this.boletoService.eliminarBoleto(boletoId);
                if (!eliminado) {
                    return this.errorResponse(res, new Error('Boleto no encontrado'), 404);
                }
                return this.successResponse(res, null, 'Boleto eliminado exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/boletos/evento/:eventoId
         * Obtiene todos los boletos de un evento
         */
        this.buscarBoletosPorEvento = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.eventoId, 'ID del evento');
                const boletos = await this.boletoService.buscarBoletosPorEvento(eventoId);
                return this.successResponse(res, boletos, `${boletos.length} boletos encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/boletos/evento/:eventoId/disponibles
         * Obtiene boletos disponibles de un evento
         */
        this.obtenerBoletosDisponibles = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.eventoId, 'ID del evento');
                const boletosDisponibles = await this.boletoService.obtenerBoletosDisponibles(eventoId);
                return this.successResponse(res, boletosDisponibles, `${boletosDisponibles.length} boletos disponibles`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * POST /api/boletos/:id/comprar
         * Compra un boleto (asigna al usuario autenticado)
         * Requiere autenticación
         */
        this.comprarBoleto = async (req, res) => {
            try {
                const boletoId = this.validarNumero(req.params.id, 'ID del boleto');
                // Obtener usuario del token de autenticación
                // @ts-ignore - El middleware de autenticación añade req.user
                const usuarioId = req.user?.id;
                if (!usuarioId) {
                    return this.errorResponse(res, new Error('Usuario no autenticado'), 401);
                }
                const boletoComprado = await this.boletoService.comprarBoleto(boletoId, usuarioId);
                return this.successResponse(res, boletoComprado, 'Boleto comprado exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * POST /api/boletos/:id/liberar
         * Libera un boleto (lo hace disponible nuevamente)
         * Requiere autenticación y permisos de admin
         */
        this.liberarBoleto = async (req, res) => {
            try {
                const boletoId = this.validarNumero(req.params.id, 'ID del boleto');
                const boletoLiberado = await this.boletoService.liberarBoleto(boletoId);
                return this.successResponse(res, boletoLiberado, 'Boleto liberado exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * DELETE /api/boletos/evento/:eventoId
         * Elimina todos los boletos de un evento
         * Requiere permisos de admin/organizador
         */
        this.eliminarBoletosPorEvento = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.eventoId, 'ID del evento');
                const eliminados = await this.boletoService.eliminarBoletosPorEvento(eventoId);
                return this.successResponse(res, { count: eliminados }, `${eliminados} boletos eliminados exitosamente`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/boletos/evento/:eventoId/estadisticas
         * Obtiene estadísticas de boletos de un evento
         */
        this.obtenerEstadisticasEvento = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.eventoId, 'ID del evento');
                const estadisticas = await this.boletoService.obtenerEstadisticasEvento(eventoId);
                return this.successResponse(res, estadisticas, 'Estadísticas obtenidas exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/boletos/evento/:eventoId/verificar-disponibilidad
         * Verifica si hay suficientes boletos disponibles
         */
        this.verificarDisponibilidad = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.eventoId, 'ID del evento');
                const cantidad = this.validarNumero(req.query.cantidad, 'Cantidad');
                const hayDisponibilidad = await this.boletoService.verificarDisponibilidad(eventoId, cantidad);
                return this.successResponse(res, { disponible: hayDisponibilidad }, hayDisponibilidad
                    ? `Hay ${cantidad} boletos disponibles`
                    : `No hay suficientes boletos disponibles`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        this.boletoService = new BoletoService_1.BoletoService();
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
    errorResponse(res, error, statusCode = 400) {
        // Determinar el código de estado apropiado según el mensaje de error
        let code = statusCode;
        let message = error.message || 'Error en la operación';
        if (message.includes('no encontrado')) {
            code = 404;
        }
        else if (message.includes('ya está asignado') || message.includes('no está disponible')) {
            code = 409; // Conflict
        }
        else if (message.includes('inválido')) {
            code = 400; // Bad Request
        }
        else if (!statusCode || statusCode === 400) {
            code = 500; // Internal Server Error (si no se especificó)
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
exports.BoletoController = BoletoController;
//# sourceMappingURL=BoletoController.js.map