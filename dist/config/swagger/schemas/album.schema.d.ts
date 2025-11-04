/**
 * Schemas de Swagger para el modelo Album
 */
export declare const albumSchemas: {
    Album: {
        type: string;
        properties: {
            id: {
                type: string;
                description: string;
                example: number;
            };
            fontImageUrl: {
                type: string;
                description: string;
                maxLength: number;
                example: string;
            };
            titulo: {
                type: string;
                description: string;
                maxLength: number;
                example: string;
            };
            lanzamiento: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            genero: {
                type: string;
                description: string;
                maxLength: number;
                example: string;
            };
            artistaId: {
                type: string;
                description: string;
                example: number;
            };
        };
    };
    AlbumCreate: {
        type: string;
        required: string[];
        properties: {
            fontImageUrl: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            titulo: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            lanzamiento: {
                type: string;
                format: string;
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
            artistaId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
        };
    };
    AlbumUpdate: {
        type: string;
        properties: {
            fontImageUrl: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            titulo: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
                example: string;
            };
            lanzamiento: {
                type: string;
                format: string;
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
            artistaId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
        };
    };
};
//# sourceMappingURL=album.schema.d.ts.map