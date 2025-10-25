import { IArtistaEvento } from '../models/ArtistaEvento';
import { RolArtista } from '../types/enums';
/**
 * Servicio para la gestión de relaciones Artista-Evento
 * Contiene la lógica de negocio para asignar artistas a eventos
 */
export declare class ArtistaEventoService {
    private artistaEventoRepository;
    private artistaRepository;
    private eventoRepository;
    constructor();
    /**
     * Valida que el artista y evento existan antes de asignar
     */
    private validarArtistaYEvento;
    /**
     * Valida los datos de asignación
     */
    private validarDatosAsignacion;
    /**
     * Asigna un artista a un evento
     */
    asignarArtistaAEvento(datos: {
        artistaId: number;
        eventoId: number;
        rol?: RolArtista;
        compensacion?: number;
        fechaConfirmacion?: Date | string;
    }): Promise<IArtistaEvento>;
    /**
     * Obtiene todos los artistas asignados a un evento
     */
    obtenerArtistasDeEvento(eventoId: number): Promise<IArtistaEvento[]>;
    /**
     * Obtiene todos los eventos en los que participa un artista
     */
    obtenerEventosDeArtista(artistaId: number): Promise<IArtistaEvento[]>;
    /**
     * Obtiene los headliners (artistas principales) de un evento
     */
    obtenerHeadlinersDeEvento(eventoId: number): Promise<IArtistaEvento[]>;
    /**
     * Actualiza el rol y/o compensación de un artista en un evento
     */
    actualizarRolYCompensacion(artistaId: number, eventoId: number, datos: {
        rol?: RolArtista;
        compensacion?: number;
    }): Promise<IArtistaEvento | null>;
    /**
     * Remueve un artista de un evento
     */
    removerArtistaDeEvento(artistaId: number, eventoId: number): Promise<boolean>;
    /**
     * Obtiene artistas de un evento filtrados por rol
     */
    obtenerArtistasPorRol(eventoId: number, rol: RolArtista): Promise<IArtistaEvento[]>;
}
//# sourceMappingURL=ArtistaEventoService.d.ts.map