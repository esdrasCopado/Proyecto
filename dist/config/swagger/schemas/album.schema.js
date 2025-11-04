"use strict";
/**
 * Schemas de Swagger para el modelo Album
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumSchemas = void 0;
exports.albumSchemas = {
    Album: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'ID único del álbum',
                example: 1,
            },
            fontImageUrl: {
                type: 'string',
                description: 'URL de la imagen de portada del álbum',
                maxLength: 500,
                example: '/uploads/albums/portada-album-123.jpg',
            },
            titulo: {
                type: 'string',
                description: 'Título del álbum',
                maxLength: 200,
                example: 'De Plaza en Plaza',
            },
            lanzamiento: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de lanzamiento del álbum',
                example: '2010-05-15T00:00:00.000Z',
            },
            genero: {
                type: 'string',
                description: 'Género musical del álbum',
                maxLength: 100,
                example: 'Cumbia',
            },
            artistaId: {
                type: 'integer',
                description: 'ID del artista al que pertenece el álbum',
                example: 1,
            },
        },
    },
    AlbumCreate: {
        type: 'object',
        required: ['fontImageUrl', 'titulo', 'lanzamiento', 'genero', 'artistaId'],
        properties: {
            fontImageUrl: {
                type: 'string',
                minLength: 1,
                maxLength: 500,
                description: 'URL de la imagen de portada del álbum',
                example: '/uploads/albums/portada-album-123.jpg',
            },
            titulo: {
                type: 'string',
                minLength: 1,
                maxLength: 200,
                description: 'Título del álbum',
                example: 'De Plaza en Plaza',
            },
            lanzamiento: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de lanzamiento del álbum',
                example: '2010-05-15T00:00:00.000Z',
            },
            genero: {
                type: 'string',
                minLength: 1,
                maxLength: 100,
                description: 'Género musical del álbum',
                example: 'Cumbia',
            },
            artistaId: {
                type: 'integer',
                minimum: 1,
                description: 'ID del artista al que pertenece el álbum',
                example: 1,
            },
        },
    },
    AlbumUpdate: {
        type: 'object',
        properties: {
            fontImageUrl: {
                type: 'string',
                minLength: 1,
                maxLength: 500,
                description: 'URL de la imagen de portada del álbum',
                example: '/uploads/albums/nueva-portada-123.jpg',
            },
            titulo: {
                type: 'string',
                minLength: 1,
                maxLength: 200,
                description: 'Título del álbum',
                example: 'De Plaza en Plaza (Edición Especial)',
            },
            lanzamiento: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de lanzamiento del álbum',
                example: '2010-06-01T00:00:00.000Z',
            },
            genero: {
                type: 'string',
                minLength: 1,
                maxLength: 100,
                description: 'Género musical del álbum',
                example: 'Cumbia Sonidera',
            },
            artistaId: {
                type: 'integer',
                minimum: 1,
                description: 'ID del artista al que pertenece el álbum',
                example: 2,
            },
        },
    },
};
//# sourceMappingURL=album.schema.js.map