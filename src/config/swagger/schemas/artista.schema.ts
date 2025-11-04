/**
 * Schemas de Swagger para el modelo Artista
 */

export const artistaSchemas = {
    Artista: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'ID único del artista',
                example: 1,
            },
            nombre: {
                type: 'string',
                description: 'Nombre del artista',
                maxLength: 200,
                example: 'Los Ángeles Azules',
            },
            genero: {
                type: 'string',
                description: 'Género musical del artista',
                maxLength: 100,
                example: 'Cumbia',
            },
            contacto: {
                type: 'string',
                description: 'Información de contacto del artista',
                example: 'contacto@losangelesazules.com',
            },
            paisOrigen: {
                type: 'string',
                description: 'País de origen del artista',
                example: 'México',
            },
            fechaDebut: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de debut del artista',
                example: '1980-01-15T00:00:00.000Z',
            },
            disquera: {
                type: 'string',
                description: 'Nombre de la disquera (opcional)',
                example: 'Sony Music',
                nullable: true,
            },
            usuarioId: {
                type: 'integer',
                description: 'ID del usuario asociado al artista (opcional)',
                example: 5,
                nullable: true,
            },
        },
    },

    ArtistaCreate: {
        type: 'object',
        required: ['nombre', 'genero', 'contacto', 'paisOrigen', 'fechaDebut'],
        properties: {
            nombre: {
                type: 'string',
                minLength: 1,
                maxLength: 200,
                description: 'Nombre del artista',
                example: 'Los Ángeles Azules',
            },
            genero: {
                type: 'string',
                minLength: 1,
                maxLength: 100,
                description: 'Género musical del artista',
                example: 'Cumbia',
            },
            contacto: {
                type: 'string',
                minLength: 1,
                description: 'Información de contacto del artista',
                example: 'contacto@losangelesazules.com',
            },
            paisOrigen: {
                type: 'string',
                minLength: 1,
                description: 'País de origen del artista',
                example: 'México',
            },
            fechaDebut: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de debut del artista',
                example: '1980-01-15T00:00:00.000Z',
            },
            disquera: {
                type: 'string',
                description: 'Nombre de la disquera (opcional)',
                example: 'Sony Music',
            },
            usuarioId: {
                type: 'integer',
                minimum: 1,
                description: 'ID del usuario asociado al artista (opcional)',
                example: 5,
            },
        },
    },

    ArtistaUpdate: {
        type: 'object',
        properties: {
            nombre: {
                type: 'string',
                minLength: 1,
                maxLength: 200,
                description: 'Nombre del artista',
                example: 'Los Ángeles Azules',
            },
            genero: {
                type: 'string',
                minLength: 1,
                maxLength: 100,
                description: 'Género musical del artista',
                example: 'Cumbia Sonidera',
            },
            contacto: {
                type: 'string',
                minLength: 1,
                description: 'Información de contacto del artista',
                example: 'nuevo.contacto@losangelesazules.com',
            },
            paisOrigen: {
                type: 'string',
                minLength: 1,
                description: 'País de origen del artista',
                example: 'México',
            },
            fechaDebut: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de debut del artista',
                example: '1980-01-15T00:00:00.000Z',
            },
            disquera: {
                type: 'string',
                description: 'Nombre de la disquera (opcional, null para eliminar)',
                example: 'Universal Music',
                nullable: true,
            },
            usuarioId: {
                type: 'integer',
                minimum: 1,
                description: 'ID del usuario asociado al artista (opcional, null para desasociar)',
                example: 7,
                nullable: true,
            },
        },
    },
};
