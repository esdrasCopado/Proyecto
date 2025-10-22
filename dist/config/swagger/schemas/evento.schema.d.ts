/**
 * Schemas de Swagger para el modelo Evento
 */
export declare const eventoSchemas: {
    Evento: {
        type: string;
        properties: {
            id: {
                type: string;
                description: string;
                example: number;
            };
            nombre: {
                type: string;
                description: string;
                example: string;
            };
            descripcion: {
                type: string;
                description: string;
                example: string;
            };
            fecha: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            lugar: {
                type: string;
                description: string;
                example: string;
            };
            capacidad: {
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
            estado: {
                type: string;
                enum: string[];
                description: string;
                example: string;
            };
            organizadorId: {
                type: string;
                description: string;
                example: number;
            };
            createdAt: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            updatedAt: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
        };
    };
    EventoCreate: {
        type: string;
        required: string[];
        properties: {
            nombre: {
                type: string;
                minLength: number;
                example: string;
            };
            descripcion: {
                type: string;
                example: string;
            };
            fecha: {
                type: string;
                format: string;
                example: string;
            };
            lugar: {
                type: string;
                minLength: number;
                example: string;
            };
            capacidad: {
                type: string;
                minimum: number;
                example: number;
            };
            precio: {
                type: string;
                format: string;
                minimum: number;
                example: number;
            };
        };
    };
    EventoUpdate: {
        type: string;
        properties: {
            nombre: {
                type: string;
                minLength: number;
                example: string;
            };
            descripcion: {
                type: string;
                example: string;
            };
            fecha: {
                type: string;
                format: string;
                example: string;
            };
            lugar: {
                type: string;
                minLength: number;
                example: string;
            };
            capacidad: {
                type: string;
                minimum: number;
                example: number;
            };
            precio: {
                type: string;
                format: string;
                minimum: number;
                example: number;
            };
            estado: {
                type: string;
                enum: string[];
                example: string;
            };
        };
    };
};
//# sourceMappingURL=evento.schema.d.ts.map