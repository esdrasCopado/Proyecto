"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistaService = void 0;
const artistaRepository_1 = require("../repositories/artistaRepository");
const Artista_1 = require("../models/Artista");
/**
 * Servicio para la gestión de artistas
 * Contiene la lógica de negocio para artistas
 */
class ArtistaService {
    constructor() {
        this.artistaRepository = new artistaRepository_1.ArtistaRepository();
    }
    /**
     * Valida los datos del artista
     */
    validarDatosArtista(artistaData) {
        if (!artistaData.nombre || artistaData.nombre.trim().length === 0) {
            throw new Error('El nombre del artista es requerido');
        }
        if (artistaData.nombre.length > 200) {
            throw new Error('El nombre del artista no puede exceder 200 caracteres');
        }
        if (!artistaData.genero || artistaData.genero.trim().length === 0) {
            throw new Error('El género musical es requerido');
        }
        if (artistaData.genero.length > 100) {
            throw new Error('El género musical no puede exceder 100 caracteres');
        }
        if (!artistaData.contacto || artistaData.contacto.trim().length === 0) {
            throw new Error('El contacto del artista es requerido');
        }
        if (!artistaData.paisOrigen || artistaData.paisOrigen.trim().length === 0) {
            throw new Error('El país de origen es requerido');
        }
        if (!artistaData.fechaDebut) {
            throw new Error('La fecha de debut es requerida');
        }
        const fecha = typeof artistaData.fechaDebut === 'string'
            ? new Date(artistaData.fechaDebut)
            : artistaData.fechaDebut;
        if (isNaN(fecha.getTime())) {
            throw new Error('La fecha de debut no es válida');
        }
        if (artistaData.usuarioId !== undefined && artistaData.usuarioId !== null && artistaData.usuarioId <= 0) {
            throw new Error('El ID del usuario debe ser válido');
        }
    }
    /**
     * Crea un nuevo artista
     */
    async crearArtista(artistaData) {
        // Validar datos
        this.validarDatosArtista(artistaData);
        // Crear instancia de Artista
        const artista = new Artista_1.Artista({
            nombre: artistaData.nombre,
            genero: artistaData.genero,
            contacto: artistaData.contacto,
            paisOrigen: artistaData.paisOrigen,
            fechaDebut: typeof artistaData.fechaDebut === 'string'
                ? new Date(artistaData.fechaDebut)
                : artistaData.fechaDebut,
            disquera: artistaData.disquera,
            usuarioId: artistaData.usuarioId,
        });
        // Guardar en el repositorio
        const artistaCreado = await this.artistaRepository.save(artista);
        return artistaCreado.toJSON();
    }
    /**
     * Obtiene un artista por su ID
     */
    async obtenerArtistaPorId(id) {
        if (id <= 0) {
            throw new Error('El ID del artista debe ser válido');
        }
        const artista = await this.artistaRepository.findById(id);
        return artista ? artista.toJSON() : null;
    }
    /**
     * Obtiene todos los artistas
     */
    async obtenerTodosLosArtistas() {
        const artistas = await this.artistaRepository.findMany();
        return artistas.map(artista => artista.toJSON());
    }
    /**
     * Actualiza un artista
     */
    async actualizarArtista(id, datosActualizar) {
        if (id <= 0) {
            throw new Error('El ID del artista debe ser válido');
        }
        // Obtener artista actual
        const artistaActual = await this.artistaRepository.findById(id);
        if (!artistaActual) {
            return null;
        }
        // Validar cambios si se proporcionan
        if (datosActualizar.nombre !== undefined) {
            if (datosActualizar.nombre.trim().length === 0) {
                throw new Error('El nombre del artista no puede estar vacío');
            }
            if (datosActualizar.nombre.length > 200) {
                throw new Error('El nombre del artista no puede exceder 200 caracteres');
            }
        }
        if (datosActualizar.genero !== undefined) {
            if (datosActualizar.genero.trim().length === 0) {
                throw new Error('El género musical no puede estar vacío');
            }
            if (datosActualizar.genero.length > 100) {
                throw new Error('El género musical no puede exceder 100 caracteres');
            }
        }
        if (datosActualizar.contacto !== undefined) {
            if (datosActualizar.contacto.trim().length === 0) {
                throw new Error('El contacto no puede estar vacío');
            }
        }
        if (datosActualizar.paisOrigen !== undefined) {
            if (datosActualizar.paisOrigen.trim().length === 0) {
                throw new Error('El país de origen no puede estar vacío');
            }
        }
        if (datosActualizar.fechaDebut !== undefined) {
            const fecha = typeof datosActualizar.fechaDebut === 'string'
                ? new Date(datosActualizar.fechaDebut)
                : datosActualizar.fechaDebut;
            if (isNaN(fecha.getTime())) {
                throw new Error('La fecha de debut no es válida');
            }
        }
        if (datosActualizar.usuarioId !== undefined && datosActualizar.usuarioId !== null && datosActualizar.usuarioId <= 0) {
            throw new Error('El ID del usuario debe ser válido');
        }
        // Preparar datos actualizados
        const datosParaActualizar = {};
        if (datosActualizar.nombre !== undefined) {
            datosParaActualizar.nombre = datosActualizar.nombre;
        }
        if (datosActualizar.genero !== undefined) {
            datosParaActualizar.genero = datosActualizar.genero;
        }
        if (datosActualizar.contacto !== undefined) {
            datosParaActualizar.contacto = datosActualizar.contacto;
        }
        if (datosActualizar.paisOrigen !== undefined) {
            datosParaActualizar.paisOrigen = datosActualizar.paisOrigen;
        }
        if (datosActualizar.fechaDebut !== undefined) {
            datosParaActualizar.fechaDebut = typeof datosActualizar.fechaDebut === 'string'
                ? new Date(datosActualizar.fechaDebut)
                : datosActualizar.fechaDebut;
        }
        if (datosActualizar.disquera !== undefined) {
            datosParaActualizar.disquera = datosActualizar.disquera;
        }
        if (datosActualizar.usuarioId !== undefined) {
            datosParaActualizar.usuarioId = datosActualizar.usuarioId;
        }
        const resultado = await this.artistaRepository.update(id, datosParaActualizar);
        if (!resultado) {
            return null;
        }
        return resultado.toJSON();
    }
    /**
     * Elimina un artista
     */
    async eliminarArtista(id) {
        if (id <= 0) {
            throw new Error('El ID del artista debe ser válido');
        }
        const artista = await this.artistaRepository.findById(id);
        if (!artista) {
            return false;
        }
        await this.artistaRepository.delete(id);
        return true;
    }
}
exports.ArtistaService = ArtistaService;
//# sourceMappingURL=ArtistaService.js.map