/**
 * Schemas de Swagger para el modelo Organizador
 */

export const organizadorSchemas = {
    Organizador: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'ID único del organizador',
                example: 1,
            },
            usuarioId: {
                type: 'integer',
                description: 'ID del usuario asociado',
                example: 3,
            },
            nombreEmpresa: {
                type: 'string',
                description: 'Nombre de la empresa organizadora',
                example: 'Eventos Premium SA',
            },
            rfc: {
                type: 'string',
                description: 'RFC de la empresa',
                example: 'EPR123456ABC',
            },
            direccion: {
                type: 'string',
                description: 'Dirección fiscal',
                example: 'Av. Reforma 123, CDMX',
            },
            telefonoEmpresa: {
                type: 'string',
                description: 'Teléfono de la empresa',
                example: '5551234567',
            },
            sitioWeb: {
                type: 'string',
                description: 'Sitio web de la empresa',
                example: 'https://eventospremium.com',
            },
            verificado: {
                type: 'boolean',
                description: 'Indica si el organizador está verificado',
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

    OrganizadorCreate: {
        type: 'object',
        required: ['nombreEmpresa', 'rfc', 'direccion', 'telefonoEmpresa'],
        properties: {
            nombreEmpresa: {
                type: 'string',
                minLength: 3,
                example: 'Eventos Premium SA',
            },
            rfc: {
                type: 'string',
                pattern: '^[A-Z]{3,4}[0-9]{6}[A-Z0-9]{3}$',
                example: 'EPR123456ABC',
            },
            direccion: {
                type: 'string',
                minLength: 10,
                example: 'Av. Reforma 123, CDMX',
            },
            telefonoEmpresa: {
                type: 'string',
                pattern: '^[0-9]{10}$',
                example: '5551234567',
            },
            sitioWeb: {
                type: 'string',
                format: 'uri',
                example: 'https://eventospremium.com',
            },
        },
    },

    OrganizadorUpdate: {
        type: 'object',
        properties: {
            nombreEmpresa: {
                type: 'string',
                minLength: 3,
                example: 'Eventos Premium SA',
            },
            rfc: {
                type: 'string',
                pattern: '^[A-Z]{3,4}[0-9]{6}[A-Z0-9]{3}$',
                example: 'EPR123456ABC',
            },
            direccion: {
                type: 'string',
                minLength: 10,
                example: 'Av. Reforma 123, CDMX',
            },
            telefonoEmpresa: {
                type: 'string',
                pattern: '^[0-9]{10}$',
                example: '5551234567',
            },
            sitioWeb: {
                type: 'string',
                format: 'uri',
                example: 'https://eventospremium.com',
            },
            verificado: {
                type: 'boolean',
                example: true,
            },
        },
    },
};
