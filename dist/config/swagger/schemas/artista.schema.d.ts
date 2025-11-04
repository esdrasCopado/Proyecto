/**
 * Schemas de Swagger para el modelo Artista
 */
export declare const artistaSchemas: {
    Artista: {
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
            genero: {
                type: string;
                description: string;
                maxLength: number;
                example: string;
            };
            contacto: {
                type: string;
                description: string;
                example: string;
            };
            paisOrigen: {
                type: string;
                description: string;
                example: string;
            };
            fechaDebut: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            disquera: {
                type: string;
                description: string;
                example: string;
                nullable: boolean;
            };
            usuarioId: {
                type: string;
                description: string;
                example: number;
                nullable: boolean;
            };
        };
    };
    ArtistaCreate: {
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
            genero: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            contacto: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            paisOrigen: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            fechaDebut: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            disquera: {
                type: string;
                description: string;
                example: string;
            };
            usuarioId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
        };
    };
    ArtistaUpdate: {
        type: string;
        properties: {
            nombre: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            genero: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            contacto: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            paisOrigen: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            fechaDebut: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            disquera: {
                type: string;
                description: string;
                example: string;
                nullable: boolean;
            };
            usuarioId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
                nullable: boolean;
            };
        };
    };
};
//# sourceMappingURL=artista.schema.d.ts.map