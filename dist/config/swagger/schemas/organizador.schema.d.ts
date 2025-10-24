/**
 * Schemas de Swagger para el modelo Organizador
 */
export declare const organizadorSchemas: {
    Organizador: {
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
            contacto: {
                type: string;
                description: string;
                example: string;
            };
            pais: {
                type: string;
                description: string;
                example: string;
            };
            fundacion: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            usuarioId: {
                type: string;
                description: string;
                example: number;
            };
        };
    };
    OrganizadorCreate: {
        type: string;
        required: string[];
        properties: {
            nombre: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            contacto: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            pais: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            usuarioId: {
                type: string;
                description: string;
                example: number;
            };
        };
    };
    OrganizadorUpdate: {
        type: string;
        properties: {
            nombre: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            contacto: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            pais: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
        };
    };
};
//# sourceMappingURL=organizador.schema.d.ts.map