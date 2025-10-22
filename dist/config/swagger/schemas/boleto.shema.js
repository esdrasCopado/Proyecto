"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boletoSchemas = void 0;
exports.boletoSchemas = {
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
//# sourceMappingURL=boleto.shema.js.map