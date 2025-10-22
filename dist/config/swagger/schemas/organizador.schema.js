"use strict";
/**
 * Schemas de Swagger para el modelo Organizador
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizadorSchemas = void 0;
exports.organizadorSchemas = {
    Organizador: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'ID único del organizador',
                example: 1,
            },
            nombre: {
                type: 'string',
                description: 'Nombre del organizador o empresa',
                example: 'Eventos Premium SA',
            },
            contacto: {
                type: 'string',
                description: 'Información de contacto (teléfono o email)',
                example: 'contacto@eventospremium.com',
            },
            pais: {
                type: 'string',
                description: 'País del organizador',
                example: 'México',
            },
            fundacion: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de fundación',
                example: '2020-01-01T00:00:00Z',
            },
            usuarioId: {
                type: 'integer',
                description: 'ID del usuario asociado',
                example: 5,
            },
        },
    },
    OrganizadorCreate: {
        type: 'object',
        required: ['nombre', 'contacto', 'pais', 'usuarioId'],
        properties: {
            nombre: {
                type: 'string',
                minLength: 3,
                description: 'Nombre del organizador o empresa',
                example: 'Eventos Premium SA',
            },
            contacto: {
                type: 'string',
                minLength: 5,
                description: 'Información de contacto (teléfono o email)',
                example: 'contacto@eventospremium.com',
            },
            pais: {
                type: 'string',
                minLength: 2,
                description: 'País del organizador',
                example: 'México',
            },
            usuarioId: {
                type: 'integer',
                description: 'ID del usuario asociado al organizador',
                example: 5,
            },
        },
    },
    OrganizadorUpdate: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {
                type: 'integer',
                description: 'ID del organizador a actualizar',
                example: 1,
            },
            nombre: {
                type: 'string',
                minLength: 3,
                description: 'Nombre del organizador o empresa',
                example: 'Eventos Premium SA',
            },
            contacto: {
                type: 'string',
                minLength: 5,
                description: 'Información de contacto (teléfono o email)',
                example: 'contacto@eventospremium.com',
            },
            pais: {
                type: 'string',
                minLength: 2,
                description: 'País del organizador',
                example: 'México',
            },
        },
    },
};
//# sourceMappingURL=organizador.schema.js.map