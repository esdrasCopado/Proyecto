/**
 * Schemas de Swagger para el modelo Boleto
 */

export const boletoSchemas = {
    Boleto: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'ID único del boleto',
                example: 1,
            },
            precio: {
                type: 'number',
                format: 'float',
                description: 'Precio del boleto',
                example: 150.50,
            },
            tipo: {
                type: 'string',
                description: 'Tipo de boleto (VIP, General, Preferente, etc.)',
                example: 'VIP',
            },
            disponible: {
                type: 'boolean',
                description: 'Indica si el boleto está disponible para compra',
                example: true,
            },
            eventoId: {
                type: 'integer',
                description: 'ID del evento al que pertenece el boleto',
                example: 1,
            },
            usuarioId: {
                type: 'integer',
                nullable: true,
                description: 'ID del usuario que compró el boleto (null si no está comprado)',
                example: 5,
            },
            ordenId: {
                type: 'integer',
                nullable: true,
                description: 'ID de la orden asociada al boleto (null si no tiene orden)',
                example: 10,
            },
        },
    },

    BoletoCreate: {
        type: 'object',
        required: ['precio', 'tipo', 'disponible', 'eventoId'],
        properties: {
            precio: {
                type: 'number',
                format: 'float',
                minimum: 0,
                description: 'Precio del boleto',
                example: 150.50,
            },
            tipo: {
                type: 'string',
                minLength: 1,
                description: 'Tipo de boleto (VIP, General, Preferente, etc.)',
                example: 'VIP',
            },
            disponible: {
                type: 'boolean',
                description: 'Indica si el boleto está disponible para compra',
                example: true,
            },
            eventoId: {
                type: 'integer',
                minimum: 1,
                description: 'ID del evento al que pertenece el boleto',
                example: 1,
            },
            usuarioId: {
                type: 'integer',
                minimum: 1,
                description: 'ID del usuario que compró el boleto (opcional)',
                example: 5,
            },
            ordenId: {
                type: 'integer',
                minimum: 1,
                description: 'ID de la orden asociada al boleto (opcional)',
                example: 10,
            },
        },
    },

    BoletoUpdate: {
        type: 'object',
        properties: {
            precio: {
                type: 'number',
                format: 'float',
                minimum: 0,
                description: 'Nuevo precio del boleto',
                example: 175.00,
            },
            tipo: {
                type: 'string',
                minLength: 1,
                description: 'Nuevo tipo de boleto',
                example: 'Preferente',
            },
            disponible: {
                type: 'boolean',
                description: 'Nuevo estado de disponibilidad',
                example: false,
            },
        },
    },

    BoletoEstadisticas: {
        type: 'object',
        properties: {
            total: {
                type: 'integer',
                description: 'Total de boletos del evento',
                example: 100,
            },
            disponibles: {
                type: 'integer',
                description: 'Cantidad de boletos disponibles',
                example: 45,
            },
            vendidos: {
                type: 'integer',
                description: 'Cantidad de boletos vendidos',
                example: 55,
            },
            porcentajeVendido: {
                type: 'number',
                format: 'float',
                description: 'Porcentaje de boletos vendidos',
                example: 55.0,
            },
        },
    },

    VerificarDisponibilidad: {
        type: 'object',
        properties: {
            disponible: {
                type: 'boolean',
                description: 'Indica si hay suficientes boletos disponibles',
                example: true,
            },
        },
    },

    BoletoConfiguracion: {
        type: 'object',
        required: ['tipo', 'cantidad', 'precio'],
        properties: {
            tipo: {
                type: 'string',
                description: 'Tipo de boleto (VIP, General, Preferente, etc.)',
                example: 'VIP',
            },
            cantidad: {
                type: 'integer',
                minimum: 1,
                maximum: 100000,
                description: 'Cantidad de boletos de este tipo a crear',
                example: 50,
            },
            precio: {
                type: 'number',
                format: 'float',
                minimum: 0,
                description: 'Precio de cada boleto de este tipo',
                example: 500.00,
            },
        },
    },

    BoletoLoteCreate: {
        type: 'object',
        required: ['eventoId', 'configuraciones'],
        properties: {
            eventoId: {
                type: 'integer',
                minimum: 1,
                description: 'ID del evento para el cual se crearán los boletos',
                example: 1,
            },
            configuraciones: {
                type: 'array',
                minItems: 1,
                description: 'Array de configuraciones de boletos por tipo',
                items: {
                    $ref: '#/components/schemas/BoletoConfiguracion',
                },
                example: [
                    { tipo: 'VIP', cantidad: 50, precio: 500 },
                    { tipo: 'GENERAL', cantidad: 200, precio: 150 },
                    { tipo: 'PREFERENTE', cantidad: 100, precio: 250 },
                ],
            },
        },
    },

    BoletoLoteResponse: {
        type: 'object',
        properties: {
            totalCreados: {
                type: 'integer',
                description: 'Cantidad total de boletos creados',
                example: 350,
            },
            detalles: {
                type: 'array',
                description: 'Detalles de boletos creados por tipo',
                items: {
                    type: 'object',
                    properties: {
                        tipo: {
                            type: 'string',
                            example: 'VIP',
                        },
                        cantidad: {
                            type: 'integer',
                            example: 50,
                        },
                        precio: {
                            type: 'number',
                            example: 500,
                        },
                    },
                },
            },
        },
    },
};