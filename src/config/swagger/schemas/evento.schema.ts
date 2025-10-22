/**
 * Schemas de Swagger para el modelo Evento
 */

export const eventoSchemas = {
    Evento: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'ID único del evento',
                example: 1,
            },
            nombre: {
                type: 'string',
                description: 'Nombre del evento',
                example: 'Festival de Música 2025',
            },
            descripcion: {
                type: 'string',
                description: 'Descripción detallada del evento',
                example: 'Un increíble festival con los mejores artistas',
            },
            fecha: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha y hora del evento',
                example: '2025-06-15T20:00:00Z',
            },
            lugar: {
                type: 'string',
                description: 'Ubicación del evento',
                example: 'Auditorio Nacional',
            },
            capacidad: {
                type: 'integer',
                description: 'Capacidad máxima de asistentes',
                example: 5000,
            },
            precio: {
                type: 'number',
                format: 'float',
                description: 'Precio de entrada',
                example: 500.00,
            },
            estado: {
                type: 'string',
                enum: ['ACTIVO', 'CANCELADO', 'FINALIZADO'],
                description: 'Estado actual del evento',
                example: 'ACTIVO',
            },
            organizadorId: {
                type: 'integer',
                description: 'ID del organizador del evento',
                example: 1,
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

    EventoCreate: {
        type: 'object',
        required: ['nombre', 'fecha', 'lugar', 'capacidad', 'precio'],
        properties: {
            nombre: {
                type: 'string',
                minLength: 3,
                example: 'Festival de Música 2025',
            },
            descripcion: {
                type: 'string',
                example: 'Un increíble festival con los mejores artistas',
            },
            fecha: {
                type: 'string',
                format: 'date-time',
                example: '2025-06-15T20:00:00Z',
            },
            lugar: {
                type: 'string',
                minLength: 3,
                example: 'Auditorio Nacional',
            },
            capacidad: {
                type: 'integer',
                minimum: 1,
                example: 5000,
            },
            precio: {
                type: 'number',
                format: 'float',
                minimum: 0,
                example: 500.00,
            },
        },
    },

    EventoUpdate: {
        type: 'object',
        properties: {
            nombre: {
                type: 'string',
                minLength: 3,
                example: 'Festival de Música 2025',
            },
            descripcion: {
                type: 'string',
                example: 'Un increíble festival con los mejores artistas',
            },
            fecha: {
                type: 'string',
                format: 'date-time',
                example: '2025-06-15T20:00:00Z',
            },
            lugar: {
                type: 'string',
                minLength: 3,
                example: 'Auditorio Nacional',
            },
            capacidad: {
                type: 'integer',
                minimum: 1,
                example: 5000,
            },
            precio: {
                type: 'number',
                format: 'float',
                minimum: 0,
                example: 500.00,
            },
            estado: {
                type: 'string',
                enum: ['ACTIVO', 'CANCELADO', 'FINALIZADO'],
                example: 'ACTIVO',
            },
        },
    },
};
