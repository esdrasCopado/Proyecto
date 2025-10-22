/**
 * Schemas de Swagger para el modelo Organizador
 */

export const organizadorSchemas = {
    Organizador: {
        type: 'object',
        properties: {
            Nombre: {
                type: 'string',
                description: 'Nombre del organizador',
                example: 'Juan Pérez',
            },
            Contracto: {
                type: 'string',
                description: 'Contacto del organizador',
                example: 'Numero de teléfono o email',
            },
            Pais: {
                type: 'string',
                description: 'País del organizador',
                example: 'México',
            },
            UsuarioId: {
                type: 'string',
                description: 'ID del usuario asociado',
                example: '345',
            },
            Fundacion: {
                type: 'string',
                format: 'date',
                description: 'Fecha de fundación del organizador',
                example: '2020-01-01',
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
