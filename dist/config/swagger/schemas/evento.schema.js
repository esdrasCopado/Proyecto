"use strict";
/**
 * Schemas de Swagger para el modelo Evento
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventoSchemas = void 0;
exports.eventoSchemas = {
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
                maxLength: 200,
                example: 'Festival de Música 2025',
            },
            descripcion: {
                type: 'string',
                description: 'Descripción detallada del evento',
                maxLength: 500,
                example: 'Un increíble festival con los mejores artistas del momento',
            },
            fecha: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha y hora del evento',
                example: '2025-06-15T20:00:00.000Z',
            },
            ubicacion: {
                type: 'string',
                description: 'Ubicación donde se realizará el evento',
                maxLength: 300,
                example: 'Auditorio Nacional, Ciudad de México',
            },
            organizadorId: {
                type: 'integer',
                description: 'ID del organizador del evento',
                example: 1,
            },
            imagenUrl: {
                type: 'string',
                description: 'URL de la imagen del evento',
                maxLength: 500,
                example: '/uploads/eventos/festival-musica-1234567890.jpg',
                nullable: true,
            },
        },
    },
    EventoCreate: {
        type: 'object',
        required: ['nombre', 'fecha', 'ubicacion', 'organizadorId'],
        properties: {
            nombre: {
                type: 'string',
                minLength: 1,
                maxLength: 200,
                description: 'Nombre del evento',
                example: 'Festival de Música 2025',
            },
            descripcion: {
                type: 'string',
                maxLength: 500,
                description: 'Descripción detallada del evento (opcional)',
                example: 'Un increíble festival con los mejores artistas del momento',
            },
            fecha: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha y hora del evento',
                example: '2025-06-15T20:00:00.000Z',
            },
            ubicacion: {
                type: 'string',
                minLength: 1,
                maxLength: 300,
                description: 'Ubicación donde se realizará el evento',
                example: 'Auditorio Nacional, Ciudad de México',
            },
            organizadorId: {
                type: 'integer',
                minimum: 1,
                description: 'ID del organizador del evento',
                example: 1,
            },
        },
    },
    EventoUpdate: {
        type: 'object',
        properties: {
            nombre: {
                type: 'string',
                minLength: 1,
                maxLength: 200,
                description: 'Nombre del evento',
                example: 'Festival de Música 2025 - Edición Especial',
            },
            descripcion: {
                type: 'string',
                maxLength: 500,
                description: 'Descripción detallada del evento',
                example: 'Festival actualizado con nuevos artistas invitados',
            },
            fecha: {
                type: 'string',
                format: 'date-time',
                description: 'Nueva fecha y hora del evento',
                example: '2025-06-20T20:00:00.000Z',
            },
            ubicacion: {
                type: 'string',
                minLength: 1,
                maxLength: 300,
                description: 'Nueva ubicación del evento',
                example: 'Palacio de los Deportes, Ciudad de México',
            },
            organizadorId: {
                type: 'integer',
                minimum: 1,
                description: 'ID del nuevo organizador del evento',
                example: 2,
            },
        },
    },
};
//# sourceMappingURL=evento.schema.js.map