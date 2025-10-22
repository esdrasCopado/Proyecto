import { IEvento } from '../models/Evento';
/**
 * Servicio para la gestión de eventos
 * Contiene la lógica de negocio para eventos
 */
export declare class EventoService {
    private eventoRepository;
    constructor();
    /**
     * Valida los datos del evento
     */
    private validarDatosEvento;
    /**
     * Crea un nuevo evento
     */
    crearEvento(eventoData: {
        nombre: string;
        descripcion?: string;
        fecha: Date | string;
        ubicacion: string;
        organizadorId: number;
    }): Promise<IEvento>;
    /**
     * Obtiene un evento por su ID
     */
    obtenerEventoPorId(id: number): Promise<IEvento | null>;
    /**
     * Obtiene todos los eventos
     */
    obtenerTodosLosEventos(): Promise<IEvento[]>;
    /**
     * Actualiza un evento
     */
    actualizarEvento(id: number, datosActualizar: {
        nombre?: string;
        descripcion?: string;
        fecha?: Date | string;
        ubicacion?: string;
        organizadorId?: number;
    }): Promise<IEvento | null>;
    /**
     * Elimina un evento
     */
    eliminarEvento(id: number): Promise<boolean>;
    /**
     * Obtiene eventos por organizador
     */
    obtenerEventosPorOrganizador(organizadorId: number): Promise<IEvento[]>;
    /**
     * Obtiene eventos próximos (futuros)
     */
    obtenerEventosProximos(limite?: number): Promise<IEvento[]>;
    /**
     * Obtiene eventos pasados
     */
    obtenerEventosPasados(limite?: number): Promise<IEvento[]>;
    /**
     * Obtiene eventos en un rango de fechas
     */
    obtenerEventosPorRangoFecha(fechaInicio: Date | string, fechaFin: Date | string): Promise<IEvento[]>;
    /**
     * Obtiene el conteo total de eventos
     */
    contarEventos(): Promise<number>;
    /**
     * Obtiene estadísticas de eventos
     */
    obtenerEstadisticas(): Promise<{
        total: number;
        proximos: number;
        pasados: number;
    }>;
}
//# sourceMappingURL=EventoService.d.ts.map