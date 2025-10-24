/**
 * Schemas de Swagger para el modelo Boleto
 */
export declare const boletoSchemas: {
    Boleto: {
        type: string;
        properties: {
            id: {
                type: string;
                description: string;
                example: number;
            };
            precio: {
                type: string;
                format: string;
                description: string;
                example: number;
            };
            tipo: {
                type: string;
                description: string;
                example: string;
            };
            disponible: {
                type: string;
                description: string;
                example: boolean;
            };
            eventoId: {
                type: string;
                description: string;
                example: number;
            };
            usuarioId: {
                type: string;
                nullable: boolean;
                description: string;
                example: number;
            };
            ordenId: {
                type: string;
                nullable: boolean;
                description: string;
                example: number;
            };
        };
    };
    BoletoCreate: {
        type: string;
        required: string[];
        properties: {
            precio: {
                type: string;
                format: string;
                minimum: number;
                description: string;
                example: number;
            };
            tipo: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            disponible: {
                type: string;
                description: string;
                example: boolean;
            };
            eventoId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
            usuarioId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
            ordenId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
        };
    };
    BoletoUpdate: {
        type: string;
        properties: {
            precio: {
                type: string;
                format: string;
                minimum: number;
                description: string;
                example: number;
            };
            tipo: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            disponible: {
                type: string;
                description: string;
                example: boolean;
            };
        };
    };
    BoletoEstadisticas: {
        type: string;
        properties: {
            total: {
                type: string;
                description: string;
                example: number;
            };
            disponibles: {
                type: string;
                description: string;
                example: number;
            };
            vendidos: {
                type: string;
                description: string;
                example: number;
            };
            porcentajeVendido: {
                type: string;
                format: string;
                description: string;
                example: number;
            };
        };
    };
    VerificarDisponibilidad: {
        type: string;
        properties: {
            disponible: {
                type: string;
                description: string;
                example: boolean;
            };
        };
    };
    BoletoConfiguracion: {
        type: string;
        required: string[];
        properties: {
            tipo: {
                type: string;
                description: string;
                example: string;
            };
            cantidad: {
                type: string;
                minimum: number;
                maximum: number;
                description: string;
                example: number;
            };
            precio: {
                type: string;
                format: string;
                minimum: number;
                description: string;
                example: number;
            };
        };
    };
    BoletoLoteCreate: {
        type: string;
        required: string[];
        properties: {
            eventoId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
            configuraciones: {
                type: string;
                minItems: number;
                description: string;
                items: {
                    $ref: string;
                };
                example: {
                    tipo: string;
                    cantidad: number;
                    precio: number;
                }[];
            };
        };
    };
    BoletoLoteResponse: {
        type: string;
        properties: {
            totalCreados: {
                type: string;
                description: string;
                example: number;
            };
            detalles: {
                type: string;
                description: string;
                items: {
                    type: string;
                    properties: {
                        tipo: {
                            type: string;
                            example: string;
                        };
                        cantidad: {
                            type: string;
                            example: number;
                        };
                        precio: {
                            type: string;
                            example: number;
                        };
                    };
                };
            };
        };
    };
};
//# sourceMappingURL=boleto.shema.d.ts.map