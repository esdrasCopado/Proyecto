"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistaEventoController = void 0;
const ArtistaEventoService_1 = require("../services/ArtistaEventoService");
const enums_1 = require("../types/enums");
/**
 * Controlador para gestión de relaciones Artista-Evento
 */
class ArtistaEventoController {
    constructor() {
        /**
         * POST /api/eventos/:eventoId/artistas
         * Asigna un artista a un evento
         */
        this.asignarArtista = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.eventoId, 'ID del evento');
                const { artistaId, rol, compensacion, fechaConfirmacion } = req.body;
                if (!artistaId) {
                    return this.errorResponse(res, new Error('El artistaId es requerido'), 400);
                }
                const asignacion = await this.artistaEventoService.asignarArtistaAEvento({
                    artistaId,
                    eventoId,
                    rol: rol,
                    compensacion,
                    fechaConfirmacion
                });
                return this.successResponse(res, asignacion, 'Artista asignado al evento exitosamente', 201);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/eventos/:eventoId/artistas
         * Obtiene todos los artistas de un evento
         */
        this.obtenerArtistasDeEvento = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.eventoId, 'ID del evento');
                const { rol } = req.query;
                let artistas;
                if (rol) {
                    // Validar que el rol sea válido
                    if (!Object.values(enums_1.RolArtista).includes(rol)) {
                        return this.errorResponse(res, new Error('Rol inválido. Valores permitidos: HEADLINER, TELONERO, INVITADO, COLABORADOR'), 400);
                    }
                    artistas = await this.artistaEventoService.obtenerArtistasPorRol(eventoId, rol);
                }
                else {
                    artistas = await this.artistaEventoService.obtenerArtistasDeEvento(eventoId);
                }
                return this.successResponse(res, artistas, `${artistas.length} artistas encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/artistas/:artistaId/eventos
         * Obtiene todos los eventos de un artista
         */
        this.obtenerEventosDeArtista = async (req, res) => {
            try {
                const artistaId = this.validarNumero(req.params.artistaId, 'ID del artista');
                const eventos = await this.artistaEventoService.obtenerEventosDeArtista(artistaId);
                return this.successResponse(res, eventos, `${eventos.length} eventos encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * GET /api/eventos/:eventoId/artistas/headliners
         * Obtiene los headliners de un evento
         */
        this.obtenerHeadliners = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.eventoId, 'ID del evento');
                const headliners = await this.artistaEventoService.obtenerHeadlinersDeEvento(eventoId);
                return this.successResponse(res, headliners, `${headliners.length} headliners encontrados`);
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * PUT /api/eventos/:eventoId/artistas/:artistaId
         * Actualiza el rol y/o compensación de un artista en un evento
         */
        this.actualizarAsignacion = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.eventoId, 'ID del evento');
                const artistaId = this.validarNumero(req.params.artistaId, 'ID del artista');
                const { rol, compensacion } = req.body;
                if (!rol && compensacion === undefined) {
                    return this.errorResponse(res, new Error('Debe proporcionar al menos rol o compensación para actualizar'), 400);
                }
                const actualizado = await this.artistaEventoService.actualizarRolYCompensacion(artistaId, eventoId, { rol: rol, compensacion });
                if (!actualizado) {
                    return this.errorResponse(res, new Error('Asignación no encontrada'), 404);
                }
                return this.successResponse(res, actualizado, 'Asignación actualizada exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        /**
         * DELETE /api/eventos/:eventoId/artistas/:artistaId
         * Remueve un artista de un evento
         */
        this.removerArtista = async (req, res) => {
            try {
                const eventoId = this.validarNumero(req.params.eventoId, 'ID del evento');
                const artistaId = this.validarNumero(req.params.artistaId, 'ID del artista');
                const removido = await this.artistaEventoService.removerArtistaDeEvento(artistaId, eventoId);
                if (!removido) {
                    return this.errorResponse(res, new Error('Artista no encontrado en este evento'), 404);
                }
                return this.successResponse(res, null, 'Artista removido del evento exitosamente');
            }
            catch (error) {
                return this.errorResponse(res, error);
            }
        };
        this.artistaEventoService = new ArtistaEventoService_1.ArtistaEventoService();
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
        if (message.includes('no encontrado') || message.includes('no existe')) {
            code = 404;
        }
        else if (message.includes('inválido') || message.includes('requerido') || message.includes('negativa')) {
            code = 400;
        }
        else if (message.includes('ya está asociado')) {
            code = 409;
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
exports.ArtistaEventoController = ArtistaEventoController;
//# sourceMappingURL=ArtistaEventoController.js.map