/**
 * Schemas de Swagger para el modelo ArtistaEvento
 */
export declare const artistaEventoSchemas: {
    ArtistaEvento: {
        type: string;
        properties: {
            id: {
                type: string;
                description: string;
                example: number;
            };
            artistaId: {
                type: string;
                description: string;
                example: number;
            };
            eventoId: {
                type: string;
                description: string;
                example: number;
            };
            rol: {
                type: string;
                enum: string[];
                description: string;
                example: string;
            };
            compensacion: {
                type: string;
                format: string;
                description: string;
                example: number;
            };
            fechaConfirmacion: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
        };
    };
    ArtistaEventoCreate: {
        type: string;
        required: string[];
        properties: {
            artistaId: {
                type: string;
                description: string;
                example: number;
            };
            eventoId: {
                type: string;
                description: string;
                example: number;
            };
            rol: {
                type: string;
                enum: string[];
                description: string;
                example: string;
            };
            compensacion: {
                type: string;
                format: string;
                description: string;
                example: number;
            };
            fechaConfirmacion: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
        };
    };
    ArtistaEventoUpdate: {
        type: string;
        properties: {
            rol: {
                type: string;
                enum: string[];
                description: string;
                example: string;
            };
            compensacion: {
                type: string;
                format: string;
                description: string;
                example: number;
            };
        };
    };
};
//# sourceMappingURL=artistaEvento.schema.d.ts.map