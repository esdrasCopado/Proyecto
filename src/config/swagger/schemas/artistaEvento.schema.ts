/**
 * Schemas de Swagger para el modelo ArtistaEvento
 */

export const artistaEventoSchemas = {
    ArtistaEvento: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'ID único de la asignación',
                example: 1,
            },
            artistaId: {
                type: 'integer',
                description: 'ID del artista',
                example: 5,
            },
            eventoId: {
                type: 'integer',
                description: 'ID del evento',
                example: 10,
            },
            rol: {
                type: 'string',
                enum: ['HEADLINER', 'TELONERO', 'INVITADO', 'COLABORADOR'],
                description: 'Rol del artista en el evento',
                example: 'HEADLINER',
            },
            compensacion: {
                type: 'number',
                format: 'decimal',
                description: 'Compensación económica para el artista (MXN)',
                example: 50000.00,
            },
            fechaConfirmacion: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha en que se confirmó la participación',
                example: '2025-01-15T10:30:00Z',
            },
        },
    },

    ArtistaEventoCreate: {
        type: 'object',
        required: ['artistaId', 'eventoId'],
        properties: {
            artistaId: {
                type: 'integer',
                description: 'ID del artista a asignar',
                example: 5,
            },
            eventoId: {
                type: 'integer',
                description: 'ID del evento',
                example: 10,
            },
            rol: {
                type: 'string',
                enum: ['HEADLINER', 'TELONERO', 'INVITADO', 'COLABORADOR'],
                description: 'Rol del artista en el evento (por defecto: INVITADO)',
                example: 'HEADLINER',
            },
            compensacion: {
                type: 'number',
                format: 'decimal',
                description: 'Compensación económica (MXN, por defecto: 0)',
                example: 50000.00,
            },
            fechaConfirmacion: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de confirmación (por defecto: fecha actual)',
                example: '2025-01-15T10:30:00Z',
            },
        },
    },

    ArtistaEventoUpdate: {
        type: 'object',
        properties: {
            rol: {
                type: 'string',
                enum: ['HEADLINER', 'TELONERO', 'INVITADO', 'COLABORADOR'],
                description: 'Nuevo rol del artista',
                example: 'HEADLINER',
            },
            compensacion: {
                type: 'number',
                format: 'decimal',
                description: 'Nueva compensación económica (MXN)',
                example: 75000.00,
            },
        },
    },
};
