import { EventoRepository } from '../repositories/EventoRepository';
import { Evento, IEvento } from '../models/Evento';

/**
 * Servicio para la gestión de eventos
 * Contiene la lógica de negocio para eventos
 */
export class EventoService {
    private eventoRepository: EventoRepository;

    constructor() {
        this.eventoRepository = new EventoRepository();
    }

    /**
     * Valida los datos del evento
     */
    private validarDatosEvento(eventoData: {
        nombre: string;
        fecha: Date | string;
        ubicacion: string;
        organizadorId: number;
    }): void {
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
    async crearEvento(eventoData: {
        nombre: string;
        descripcion?: string;
        fecha: Date | string;
        ubicacion: string;
        organizadorId: number;
        imagenUrl?: string;
    }): Promise<IEvento> {
        // Validar datos
        this.validarDatosEvento(eventoData);

        // Crear instancia de Evento
        const evento = new Evento({
            nombre: eventoData.nombre,
            descripcion: eventoData.descripcion,
            fecha: typeof eventoData.fecha === 'string' ? new Date(eventoData.fecha) : eventoData.fecha,
            ubicacion: eventoData.ubicacion,
            organizadorId: eventoData.organizadorId,
            imagenUrl: eventoData.imagenUrl,
        });

        // Guardar en el repositorio
        const eventoCreado = await this.eventoRepository.save(evento);
        return eventoCreado.toJSON();
    }

    /**
     * Obtiene un evento por su ID
     */
    async obtenerEventoPorId(id: number): Promise<IEvento | null> {
        if (id <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }

        const evento = await this.eventoRepository.findById(id);
        return evento ? evento.toJSON() : null;
    }

    /**
     * Obtiene todos los eventos
     */
    async obtenerTodosLosEventos(): Promise<IEvento[]> {
        const eventos = await this.eventoRepository.findMany();
        return eventos.map(evento => evento.toJSON());
    }

    /**
     * Actualiza un evento
     */
    async actualizarEvento(id: number, datosActualizar: {
        nombre?: string;
        descripcion?: string;
        fecha?: Date | string;
        ubicacion?: string;
        organizadorId?: number;
        imagenUrl?: string;
    }): Promise<IEvento | null> {
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

        if (datosActualizar.imagenUrl !== undefined && datosActualizar.imagenUrl.length > 500) {
            throw new Error('La URL de la imagen no puede exceder 500 caracteres');
        }

        // Crear evento actualizado
        const eventoActualizado = new Evento({
            id,
            nombre: datosActualizar.nombre ?? eventoActual.nombre,
            descripcion: datosActualizar.descripcion ?? eventoActual.descripcion,
            fecha: datosActualizar.fecha
                ? (typeof datosActualizar.fecha === 'string' ? new Date(datosActualizar.fecha) : datosActualizar.fecha)
                : eventoActual.fecha,
            ubicacion: datosActualizar.ubicacion ?? eventoActual.ubicacion,
            organizadorId: datosActualizar.organizadorId ?? eventoActual.organizadorId,
            imagenUrl: datosActualizar.imagenUrl ?? eventoActual.imagenUrl,
        });

        const resultado = await this.eventoRepository.update(eventoActualizado);
        return resultado.toJSON();
    }

    /**
     * Elimina un evento
     */
    async eliminarEvento(id: number): Promise<boolean> {
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
    async obtenerEventosPorOrganizador(organizadorId: number): Promise<IEvento[]> {
        if (organizadorId <= 0) {
            throw new Error('El ID del organizador debe ser válido');
        }

        const eventos = await this.eventoRepository.findByOrganizadorId(organizadorId);
        return eventos.map(evento => evento.toJSON());
    }

    /**
     * Obtiene eventos próximos (futuros)
     */
    async obtenerEventosProximos(limite?: number): Promise<IEvento[]> {
        if (limite !== undefined && limite <= 0) {
            throw new Error('El límite debe ser mayor a 0');
        }

        const eventos = await this.eventoRepository.findProximos(limite);
        return eventos.map(evento => evento.toJSON());
    }

    /**
     * Obtiene eventos pasados
     */
    async obtenerEventosPasados(limite?: number): Promise<IEvento[]> {
        if (limite !== undefined && limite <= 0) {
            throw new Error('El límite debe ser mayor a 0');
        }

        const eventos = await this.eventoRepository.findPasados(limite);
        return eventos.map(evento => evento.toJSON());
    }

    /**
     * Obtiene eventos en un rango de fechas
     */
    async obtenerEventosPorRangoFecha(fechaInicio: Date | string, fechaFin: Date | string): Promise<IEvento[]> {
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
    async contarEventos(): Promise<number> {
        return await this.eventoRepository.count();
    }

    /**
     * Obtiene estadísticas de eventos
     */
    async obtenerEstadisticas(): Promise<{
        total: number;
        proximos: number;
        pasados: number;
    }> {
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
