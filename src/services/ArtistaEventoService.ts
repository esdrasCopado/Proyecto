import { ArtistaEventoRepository } from '../repositories/artistaEventoRepository';
import { ArtistaRepository } from '../repositories/artistaRepository';
import { EventoRepository } from '../repositories/eventoRepository';
import { ArtistaEvento, IArtistaEvento } from '../models/ArtistaEvento';
import { RolArtista } from '../types/enums';

/**
 * Servicio para la gestión de relaciones Artista-Evento
 * Contiene la lógica de negocio para asignar artistas a eventos
 */
export class ArtistaEventoService {
    private artistaEventoRepository: ArtistaEventoRepository;
    private artistaRepository: ArtistaRepository;
    private eventoRepository: EventoRepository;

    constructor() {
        this.artistaEventoRepository = new ArtistaEventoRepository();
        this.artistaRepository = new ArtistaRepository();
        this.eventoRepository = new EventoRepository();
    }

    /**
     * Valida que el artista y evento existan antes de asignar
     */
    private async validarArtistaYEvento(artistaId: number, eventoId: number): Promise<void> {
        if (!artistaId || artistaId <= 0) {
            throw new Error('El ID del artista es requerido y debe ser válido');
        }

        if (!eventoId || eventoId <= 0) {
            throw new Error('El ID del evento es requerido y debe ser válido');
        }

        // Verificar que el artista exista
        const artista = await this.artistaRepository.findById(artistaId);
        if (!artista) {
            throw new Error(`El artista con ID ${artistaId} no existe`);
        }

        // Verificar que el evento exista
        const evento = await this.eventoRepository.findById(eventoId);
        if (!evento) {
            throw new Error(`El evento con ID ${eventoId} no existe`);
        }
    }

    /**
     * Valida los datos de asignación
     */
    private validarDatosAsignacion(datos: {
        artistaId: number;
        eventoId: number;
        rol?: RolArtista;
        compensacion?: number;
        fechaConfirmacion?: Date | string;
    }): void {
        if (datos.compensacion !== undefined && datos.compensacion < 0) {
            throw new Error('La compensación no puede ser negativa');
        }

        if (datos.rol && !Object.values(RolArtista).includes(datos.rol)) {
            throw new Error('Rol de artista inválido');
        }
    }

    /**
     * Asigna un artista a un evento
     */
    async asignarArtistaAEvento(datos: {
        artistaId: number;
        eventoId: number;
        rol?: RolArtista;
        compensacion?: number;
        fechaConfirmacion?: Date | string;
    }): Promise<IArtistaEvento> {
        // Validar datos
        this.validarDatosAsignacion(datos);

        // Validar que artista y evento existan
        await this.validarArtistaYEvento(datos.artistaId, datos.eventoId);

        // Crear instancia de ArtistaEvento
        const artistaEvento = new ArtistaEvento({
            artistaId: datos.artistaId,
            eventoId: datos.eventoId,
            rol: datos.rol || RolArtista.INVITADO,
            compensacion: datos.compensacion || 0,
            fechaConfirmacion: datos.fechaConfirmacion || new Date(),
        });

        // Guardar en el repositorio
        const asignacionCreada = await this.artistaEventoRepository.create(artistaEvento);
        return asignacionCreada.toJSON();
    }

    /**
     * Obtiene todos los artistas asignados a un evento
     */
    async obtenerArtistasDeEvento(eventoId: number): Promise<IArtistaEvento[]> {
        if (eventoId <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }

        // Verificar que el evento exista
        const evento = await this.eventoRepository.findById(eventoId);
        if (!evento) {
            throw new Error(`El evento con ID ${eventoId} no existe`);
        }

        const asignaciones = await this.artistaEventoRepository.findByEventoId(eventoId);
        return asignaciones.map(asignacion => asignacion.toJSON());
    }

    /**
     * Obtiene todos los eventos en los que participa un artista
     */
    async obtenerEventosDeArtista(artistaId: number): Promise<IArtistaEvento[]> {
        if (artistaId <= 0) {
            throw new Error('El ID del artista debe ser válido');
        }

        // Verificar que el artista exista
        const artista = await this.artistaRepository.findById(artistaId);
        if (!artista) {
            throw new Error(`El artista con ID ${artistaId} no existe`);
        }

        const asignaciones = await this.artistaEventoRepository.findByArtistaId(artistaId);
        return asignaciones.map(asignacion => asignacion.toJSON());
    }

    /**
     * Obtiene los headliners (artistas principales) de un evento
     */
    async obtenerHeadlinersDeEvento(eventoId: number): Promise<IArtistaEvento[]> {
        if (eventoId <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }

        // Verificar que el evento exista
        const evento = await this.eventoRepository.findById(eventoId);
        if (!evento) {
            throw new Error(`El evento con ID ${eventoId} no existe`);
        }

        const headliners = await this.artistaEventoRepository.findByEventoIdAndRol(
            eventoId,
            RolArtista.HEADLINER
        );
        return headliners.map(asignacion => asignacion.toJSON());
    }

    /**
     * Actualiza el rol y/o compensación de un artista en un evento
     */
    async actualizarRolYCompensacion(
        artistaId: number,
        eventoId: number,
        datos: {
            rol?: RolArtista;
            compensacion?: number;
        }
    ): Promise<IArtistaEvento | null> {
        // Validar IDs
        await this.validarArtistaYEvento(artistaId, eventoId);

        // Validar datos
        if (datos.compensacion !== undefined && datos.compensacion < 0) {
            throw new Error('La compensación no puede ser negativa');
        }

        if (datos.rol && !Object.values(RolArtista).includes(datos.rol)) {
            throw new Error('Rol de artista inválido');
        }

        if (!datos.rol && datos.compensacion === undefined) {
            throw new Error('Debe proporcionar al menos rol o compensación para actualizar');
        }

        // Buscar la asignación existente
        const asignaciones = await this.artistaEventoRepository.findByEventoId(eventoId);
        const asignacionExistente = asignaciones.find(a => a.artistaId === artistaId);

        if (!asignacionExistente) {
            throw new Error('El artista no está asignado a este evento');
        }

        // Actualizar campos
        if (datos.rol !== undefined) {
            asignacionExistente.rol = datos.rol;
        }
        if (datos.compensacion !== undefined) {
            asignacionExistente.compensacion = datos.compensacion;
        }

        const actualizado = await this.artistaEventoRepository.update(asignacionExistente);
        return actualizado.toJSON();
    }

    /**
     * Remueve un artista de un evento
     */
    async removerArtistaDeEvento(artistaId: number, eventoId: number): Promise<boolean> {
        // Validar IDs
        await this.validarArtistaYEvento(artistaId, eventoId);

        // Buscar la asignación existente
        const asignaciones = await this.artistaEventoRepository.findByEventoId(eventoId);
        const asignacionExistente = asignaciones.find(a => a.artistaId === artistaId);

        if (!asignacionExistente) {
            return false;
        }

        if (!asignacionExistente.id) {
            throw new Error('La asignación no tiene ID válido');
        }

        await this.artistaEventoRepository.delete(asignacionExistente.id);
        return true;
    }

    /**
     * Obtiene artistas de un evento filtrados por rol
     */
    async obtenerArtistasPorRol(eventoId: number, rol: RolArtista): Promise<IArtistaEvento[]> {
        if (eventoId <= 0) {
            throw new Error('El ID del evento debe ser válido');
        }

        if (!Object.values(RolArtista).includes(rol)) {
            throw new Error('Rol de artista inválido');
        }

        // Verificar que el evento exista
        const evento = await this.eventoRepository.findById(eventoId);
        if (!evento) {
            throw new Error(`El evento con ID ${eventoId} no existe`);
        }

        const artistas = await this.artistaEventoRepository.findByEventoIdAndRol(eventoId, rol);
        return artistas.map(asignacion => asignacion.toJSON());
    }
}
