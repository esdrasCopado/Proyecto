"use strict";
/**
 * Entidad Album
 * Representa un álbum musical de un artista
 *
 * @author Tu Nombre
 * @version 1.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
class Album {
    /**
     * Constructor de la clase Album
     * @param data - Datos del álbum
     * @throws Error si los datos son inválidos
     */
    constructor(data) {
        this._id = data.id;
        this._fontImageUrl = data.fontImageUrl;
        this._titulo = data.titulo;
        this._lanzamiento = data.lanzamiento;
        this._genero = data.genero;
        this._artistaId = data.artistaId;
        this.validar();
    }
    // ==================== GETTERS ====================
    get id() {
        return this._id;
    }
    get fontImageUrl() {
        return this._fontImageUrl;
    }
    get titulo() {
        return this._titulo;
    }
    get lanzamiento() {
        return this._lanzamiento;
    }
    get genero() {
        return this._genero;
    }
    get artistaId() {
        return this._artistaId;
    }
    // ==================== SETTERS ====================
    set fontImageUrl(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('La URL de la imagen de portada es requerida');
        }
        if (value.length > 500) {
            throw new Error('La URL de la imagen no puede exceder 500 caracteres');
        }
        this._fontImageUrl = value.trim();
    }
    set titulo(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('El título del álbum es requerido');
        }
        if (value.length > 200) {
            throw new Error('El título no puede exceder 200 caracteres');
        }
        this._titulo = value.trim();
    }
    set lanzamiento(value) {
        if (!(value instanceof Date) || isNaN(value.getTime())) {
            throw new Error('La fecha de lanzamiento es inválida');
        }
        this._lanzamiento = value;
    }
    set genero(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('El género es requerido');
        }
        if (value.length > 100) {
            throw new Error('El género no puede exceder 100 caracteres');
        }
        this._genero = value.trim();
    }
    set artistaId(value) {
        if (!value || value <= 0 || !Number.isInteger(value)) {
            throw new Error('El ID del artista debe ser un número entero positivo');
        }
        this._artistaId = value;
    }
    // ==================== VALIDACIONES ====================
    validar() {
        if (!this._fontImageUrl || this._fontImageUrl.trim().length === 0 || this._fontImageUrl.length > 500) {
            throw new Error('La URL de la imagen de portada es inválida');
        }
        if (!this._titulo || this._titulo.trim().length === 0 || this._titulo.length > 200) {
            throw new Error('El título del álbum es inválido');
        }
        if (!(this._lanzamiento instanceof Date) || isNaN(this._lanzamiento.getTime())) {
            throw new Error('La fecha de lanzamiento es inválida');
        }
        if (!this._genero || this._genero.trim().length === 0 || this._genero.length > 100) {
            throw new Error('El género es inválido');
        }
        if (!this._artistaId || this._artistaId <= 0 || !Number.isInteger(this._artistaId)) {
            throw new Error('El ID del artista es inválido');
        }
    }
    // ==================== MÉTODOS DE NEGOCIO ====================
    /**
     * Verifica si el álbum pertenece a un género específico
     */
    esGenero(genero) {
        return this._genero.toLowerCase() === genero.toLowerCase();
    }
    /**
     * Obtiene el año de lanzamiento
     */
    getAnioLanzamiento() {
        return this._lanzamiento.getFullYear();
    }
    /**
     * Verifica si el álbum fue lanzado en un año específico
     */
    fuelanzadoEnAnio(anio) {
        return this.getAnioLanzamiento() === anio;
    }
    /**
     * Verifica si el álbum es de un artista específico
     */
    perteneceArtista(artistaId) {
        return this._artistaId === artistaId;
    }
    // ==================== CONVERSIÓN DE DATOS ====================
    /**
     * Convierte el álbum a un objeto plano para persistencia en BD
     */
    toJSON() {
        return {
            id: this._id,
            fontImageUrl: this._fontImageUrl,
            titulo: this._titulo,
            lanzamiento: this._lanzamiento,
            genero: this._genero,
            artistaId: this._artistaId,
        };
    }
    /**
     * Crea una instancia de Album desde datos de base de datos
     */
    static fromDatabase(data) {
        return new Album({
            id: data.id,
            fontImageUrl: data.fontImageUrl || data.font_image_url,
            titulo: data.titulo,
            lanzamiento: new Date(data.lanzamiento),
            genero: data.genero,
            artistaId: data.artistaId || data.artista_id,
        });
    }
    /**
     * Crea una copia independiente del álbum
     */
    clone() {
        return new Album(this.toJSON());
    }
    /**
     * Convierte el álbum a string representativo
     */
    toString() {
        return `${this._titulo} (${this.getAnioLanzamiento()}) - ${this._genero}`;
    }
    // ==================== MÉTODOS DE COMPARACIÓN ====================
    /**
     * Compara si dos álbumes son iguales (por ID)
     */
    equals(otro) {
        return this._id !== undefined && this._id === otro._id;
    }
    /**
     * Verifica si el álbum tiene un ID asignado
     */
    estaPersistido() {
        return this._id !== undefined && this._id > 0;
    }
}
exports.Album = Album;
//# sourceMappingURL=Album.js.map