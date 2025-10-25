/**
 * Schemas de Swagger para el modelo Orden
 */
export declare const ordenSchemas: {
    Orden: {
        type: string;
        properties: {
            id: {
                type: string;
                description: string;
                example: number;
            };
            total: {
                type: string;
                format: string;
                description: string;
                example: number;
            };
            fecha: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            estado: {
                type: string;
                enum: string[];
                description: string;
                example: string;
            };
            usuarioId: {
                type: string;
                description: string;
                example: number;
            };
            boletos: {
                type: string;
                description: string;
                items: {
                    type: string;
                };
                example: number[];
            };
        };
    };
    OrdenCreate: {
        type: string;
        required: string[];
        properties: {
            usuarioId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
            boletoIds: {
                type: string;
                minItems: number;
                description: string;
                items: {
                    type: string;
                    minimum: number;
                };
                example: number[];
            };
        };
    };
    OrdenEstadoUpdate: {
        type: string;
        required: string[];
        properties: {
            estado: {
                type: string;
                enum: string[];
                description: string;
                example: string;
            };
        };
    };
    OrdenEstadisticas: {
        type: string;
        properties: {
            total: {
                type: string;
                description: string;
                example: number;
            };
            pendientes: {
                type: string;
                description: string;
                example: number;
            };
            pagadas: {
                type: string;
                description: string;
                example: number;
            };
            canceladas: {
                type: string;
                description: string;
                example: number;
            };
            reembolsadas: {
                type: string;
                description: string;
                example: number;
            };
            totalRecaudado: {
                type: string;
                format: string;
                description: string;
                example: number;
            };
        };
    };
};
//# sourceMappingURL=orden.schema.d.ts.map