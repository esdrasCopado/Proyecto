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
            usuarioId: {
                type: 'integer',
                description: 'ID del usuario asociado',
                example: 5,
            },
            nombreArtistico: {
                type: 'string',
                description: 'Nombre artístico',
                example: 'DJ Electro',
            },
            genero: {
                type: 'string',
                description: 'Género musical',
                example: 'Electrónica',
            },
            biografia: {
                type: 'string',
                description: 'Biografía del artista',
                example: 'Reconocido DJ internacional con más de 10 años de experiencia',
            },
            redesSociales: {
                type: 'object',
                description: 'Perfiles de redes sociales',
                properties: {
                    instagram: {
                        type: 'string',
                        example: '@djelectro',
                    },
                    twitter: {
                        type: 'string',
                        example: '@djelectro',
                    },
                    facebook: {
                        type: 'string',
                        example: 'djelectroofficial',
                    },
                },
            },
            verificado: {
                type: 'boolean',
                description: 'Indica si el artista está verificado',
                example: true,
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de creación',
                example: '2025-01-15T10:30:00Z',
            },
            updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de última actualización',
                example: '2025-01-20T15:45:00Z',
            },
        },
    },

    ArtistaCreate: {
        type: 'object',
        required: ['nombreArtistico', 'genero'],
        properties: {
            nombreArtistico: {
                type: 'string',
                minLength: 2,
                example: 'DJ Electro',
            },
            genero: {
                type: 'string',
                minLength: 2,
                example: 'Electrónica',
            },
            biografia: {
                type: 'string',
                example: 'Reconocido DJ internacional con más de 10 años de experiencia',
            },
            redesSociales: {
                type: 'object',
                properties: {
                    instagram: {
                        type: 'string',
                        example: '@djelectro',
                    },
                    twitter: {
                        type: 'string',
                        example: '@djelectro',
                    },
                    facebook: {
                        type: 'string',
                        example: 'djelectroofficial',
                    },
                },
            },
        },
    },

    ArtistaUpdate: {
        type: 'object',
        properties: {
            nombreArtistico: {
                type: 'string',
                minLength: 2,
                example: 'DJ Electro',
            },
            genero: {
                type: 'string',
                minLength: 2,
                example: 'Electrónica',
            },
            biografia: {
                type: 'string',
                example: 'Reconocido DJ internacional con más de 10 años de experiencia',
            },
            redesSociales: {
                type: 'object',
                properties: {
                    instagram: {
                        type: 'string',
                        example: '@djelectro',
                    },
                    twitter: {
                        type: 'string',
                        example: '@djelectro',
                    },
                    facebook: {
                        type: 'string',
                        example: 'djelectroofficial',
                    },
                },
            },
            verificado: {
                type: 'boolean',
                example: true,
            },
        },
    },
};
