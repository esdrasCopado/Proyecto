/**
 * Schemas de Swagger para el modelo Orden
 */

export const ordenSchemas = {
    Orden: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'ID único de la orden',
                example: 1,
            },
            total: {
                type: 'number',
                format: 'float',
                description: 'Total de la orden (calculado automáticamente)',
                example: 450.50,
            },
            fecha: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de creación de la orden',
                example: '2025-10-24T12:00:00.000Z',
            },
            estado: {
                type: 'string',
                enum: ['PENDIENTE', 'PAGADO', 'CANCELADO', 'REEMBOLSADO'],
                description: 'Estado actual de la orden',
                example: 'PENDIENTE',
            },
            usuarioId: {
                type: 'integer',
                description: 'ID del usuario que creó la orden',
                example: 1,
            },
            boletos: {
                type: 'array',
                description: 'IDs de los boletos asociados a la orden',
                items: {
                    type: 'integer',
                },
                example: [1, 2, 3],
            },
        },
    },

    OrdenCreate: {
        type: 'object',
        required: ['usuarioId', 'boletoIds'],
        properties: {
            usuarioId: {
                type: 'integer',
                minimum: 1,
                description: 'ID del usuario que crea la orden',
                example: 1,
            },
            boletoIds: {
                type: 'array',
                minItems: 1,
                description: 'Array de IDs de boletos a incluir en la orden',
                items: {
                    type: 'integer',
                    minimum: 1,
                },
                example: [1, 2, 3],
            },
        },
    },

    OrdenEstadoUpdate: {
        type: 'object',
        required: ['estado'],
        properties: {
            estado: {
                type: 'string',
                enum: ['PENDIENTE', 'PAGADO', 'CANCELADO', 'REEMBOLSADO'],
                description: 'Nuevo estado de la orden',
                example: 'PAGADO',
            },
        },
    },

    OrdenEstadisticas: {
        type: 'object',
        properties: {
            total: {
                type: 'integer',
                description: 'Total de órdenes en el sistema',
                example: 150,
            },
            pendientes: {
                type: 'integer',
                description: 'Cantidad de órdenes pendientes',
                example: 45,
            },
            pagadas: {
                type: 'integer',
                description: 'Cantidad de órdenes pagadas',
                example: 80,
            },
            canceladas: {
                type: 'integer',
                description: 'Cantidad de órdenes canceladas',
                example: 20,
            },
            reembolsadas: {
                type: 'integer',
                description: 'Cantidad de órdenes reembolsadas',
                example: 5,
            },
            totalRecaudado: {
                type: 'number',
                format: 'float',
                description: 'Total recaudado de órdenes pagadas',
                example: 35000.50,
            },
        },
    },
};
