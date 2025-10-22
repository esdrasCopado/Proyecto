"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoService = void 0;
const eventoRepository_1 = require("../repositories/eventoRepository");
const Evento_1 = require("../models/Evento");
/**
 * Servicio para la gestión de eventos
 * Contiene la lógica de negocio para eventos
 */
class EventoService {
    constructor() {
        this.eventoRepository = new eventoRepository_1.EventoRepository();
    }
    /**
     * Valida los datos del evento
     */
    validarDatosEvento(eventoData) {
        if (!eventoData.nombre || eventoData.nombre.trim().length === 0) {
            throw new Error('El nombre del evento es requerido');
        }
        if (eventoData.nombre.length > 200) {
            throw new Error('El nombre del evento no puede exceder 200 caracteres');
        }
        if (!eventoData.fecha) {
            throw new Error('La fecha del evento es requerida');
        }
        const fecha = typeof eventoData.fecha === 'string' ? new Date(eventoData.fecha) : eventoData.fecha;
        if (isNaN(fecha.getTime())) {
            throw new Error('La fecha del evento no es válida');
        }
        if (!eventoData.ubicacion || eventoData.ubicacion.trim().length === 0) {
            throw new Error('La ubicación del evento es requerida');
        }
        if (eventoData.ubicacion.length > 300) {
            throw new Error('La ubicación no puede exceder 300 caracteres');
        }
        if (!eventoData.organizadorId || eventoData.organizadorId <= 0) {
            throw new Error('El ID del organizador es requerido y debe ser válido');
        }
    }
    /**
     * Crea un nuevo evento
     */
    async crearEvento(eventoData) {
        // Validar datos
        this.validarDatosEvento(eventoData);
        // Crear instancia de Evento
        const evento = new Evento_1.Evento({
            nombre: eventoData.nombre,
            descripcion: eventoData.descripcion,
            fecha: typeof eventoData.fecha === 'string' ? new Date(eventoData.fecha) : eventoData.fecha,
            ubicacion: eventoData.ubicacion,
            organizadorId: eventoData.organizadorId,
        });
        // Guardar en el repositorio
        const eventoCreado = await this.eventoRepository.save(evento);
        return eventoCreado.toJSON();
    }
    /**
     * Obtiene un evento por su ID
     */
    async obtenerEventoPorId(id) {
        if (id <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }
        const evento = await this.eventoRepository.findById(id);
        return evento ? evento.toJSON() : null;
    }
    /**
     * Obtiene todos los eventos
     */
    async obtenerTodosLosEventos() {
        const eventos = await this.eventoRepository.findMany();
        return eventos.map(evento => evento.toJSON());
    }
    /**
     * Actualiza un evento
     */
    async actualizarEvento(id, datosActualizar) {
        if (id <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }
        // Obtener evento actual
        const eventoActual = await this.eventoRepository.findById(id);
        if (!eventoActual) {
            return null;
        }
        // Validar cambios si se proporcionan
        if (datosActualizar.nombre !== undefined) {
            if (datosActualizar.nombre.trim().length === 0) {
                throw new Error('El nombre del evento no puede estar vacío');
            }
            if (datosActualizar.nombre.length > 200) {
                throw new Error('El nombre del evento no puede exceder 200 caracteres');
            }
        }
        if (datosActualizar.ubicacion !== undefined) {
            if (datosActualizar.ubicacion.trim().length === 0) {
                throw new Error('La ubicación no puede estar vacía');
            }
            if (datosActualizar.ubicacion.length > 300) {
                throw new Error('La ubicación no puede exceder 300 caracteres');
            }
        }
        if (datosActualizar.fecha !== undefined) {
            const fecha = typeof datosActualizar.fecha === 'string'
                ? new Date(datosActualizar.fecha)
                : datosActualizar.fecha;
            if (isNaN(fecha.getTime())) {
                throw new Error('La fecha del evento no es válida');
            }
        }
        if (datosActualizar.organizadorId !== undefined && datosActualizar.organizadorId <= 0) {
            throw new Error('El ID del organizador debe ser válido');
        }
        // Crear evento actualizado
        const eventoActualizado = new Evento_1.Evento({
            id,
            nombre: datosActualizar.nombre ?? eventoActual.nombre,
            descripcion: datosActualizar.descripcion ?? eventoActual.descripcion,
            fecha: datosActualizar.fecha
                ? (typeof datosActualizar.fecha === 'string' ? new Date(datosActualizar.fecha) : datosActualizar.fecha)
                : eventoActual.fecha,
            ubicacion: datosActualizar.ubicacion ?? eventoActual.ubicacion,
            organizadorId: datosActualizar.organizadorId ?? eventoActual.organizadorId,
        });
        const resultado = await this.eventoRepository.update(eventoActualizado);
        return resultado.toJSON();
    }
    /**
     * Elimina un evento
     */
    async eliminarEvento(id) {
        if (id <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }
        const evento = await this.eventoRepository.findById(id);
        if (!evento) {
            return false;
        }
        await this.eventoRepository.delete(id);
        return true;
    }
    /**
     * Obtiene eventos por organizador
     */
    async obtenerEventosPorOrganizador(organizadorId) {
        if (organizadorId <= 0) {
            throw new Error('El ID del organizador debe ser válido');
        }
        const eventos = await this.eventoRepository.findByOrganizadorId(organizadorId);
        return eventos.map(evento => evento.toJSON());
    }
    /**
     * Obtiene eventos próximos (futuros)
     */
    async obtenerEventosProximos(limite) {
        if (limite !== undefined && limite <= 0) {
            throw new Error('El límite debe ser mayor a 0');
        }
        const eventos = await this.eventoRepository.findProximos(limite);
        return eventos.map(evento => evento.toJSON());
    }
    /**
     * Obtiene eventos pasados
     */
    async obtenerEventosPasados(limite) {
        if (limite !== undefined && limite <= 0) {
            throw new Error('El límite debe ser mayor a 0');
        }
        const eventos = await this.eventoRepository.findPasados(limite);
        return eventos.map(evento => evento.toJSON());
    }
    /**
     * Obtiene eventos en un rango de fechas
     */
    async obtenerEventosPorRangoFecha(fechaInicio, fechaFin) {
        const inicio = typeof fechaInicio === 'string' ? new Date(fechaInicio) : fechaInicio;
        const fin = typeof fechaFin === 'string' ? new Date(fechaFin) : fechaFin;
        if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
            throw new Error('Las fechas proporcionadas no son válidas');
        }
        if (inicio > fin) {
            throw new Error('La fecha de inicio debe ser anterior a la fecha fin');
        }
        const eventos = await this.eventoRepository.findByFechaRange(inicio, fin);
        return eventos.map(evento => evento.toJSON());
    }
    /**
     * Obtiene el conteo total de eventos
     */
    async contarEventos() {
        return await this.eventoRepository.count();
    }
    /**
     * Obtiene estadísticas de eventos
     */
    async obtenerEstadisticas() {
        const total = await this.eventoRepository.count();
        const proximos = await this.eventoRepository.findProximos();
        const pasados = await this.eventoRepository.findPasados();
        return {
            total,
            proximos: proximos.length,
            pasados: pasados.length,
        };
    }
}
exports.EventoService = EventoService;
//# sourceMappingURL=EventoService.js.map