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
                maxLength: number;
                example: string;
            };
            descripcion: {
                type: string;
                description: string;
                maxLength: number;
                example: string;
            };
            fecha: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            ubicacion: {
                type: string;
                description: string;
                maxLength: number;
                example: string;
            };
            organizadorId: {
                type: string;
                description: string;
                example: number;
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
                maxLength: number;
                description: string;
                example: string;
            };
            descripcion: {
                type: string;
                maxLength: number;
                description: string;
                example: string;
            };
            fecha: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            ubicacion: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            organizadorId: {
                type: string;
                minimum: number;
                description: string;
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
                maxLength: number;
                description: string;
                example: string;
            };
            descripcion: {
                type: string;
                maxLength: number;
                description: string;
                example: string;
            };
            fecha: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            ubicacion: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            organizadorId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
        };
    };
};
//# sourceMappingURL=evento.schema.d.ts.map