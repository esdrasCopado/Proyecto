export const boletoSchemas = {
    Boleto: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            precio: { type: 'number' },
            tipo: { type: 'string' },
            disponible: { type: 'boolean' },
            eventoId: { type: 'integer' },
            usuarioId: { type: 'integer' }
        }
    },
};