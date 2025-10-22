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
            usuarioId: {
                type: string;
                description: string;
                example: number;
            };
            nombreArtistico: {
                type: string;
                description: string;
                example: string;
            };
            genero: {
                type: string;
                description: string;
                example: string;
            };
            biografia: {
                type: string;
                description: string;
                example: string;
            };
            redesSociales: {
                type: string;
                description: string;
                properties: {
                    instagram: {
                        type: string;
                        example: string;
                    };
                    twitter: {
                        type: string;
                        example: string;
                    };
                    facebook: {
                        type: string;
                        example: string;
                    };
                };
            };
            verificado: {
                type: string;
                description: string;
                example: boolean;
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
    ArtistaCreate: {
        type: string;
        required: string[];
        properties: {
            nombreArtistico: {
                type: string;
                minLength: number;
                example: string;
            };
            genero: {
                type: string;
                minLength: number;
                example: string;
            };
            biografia: {
                type: string;
                example: string;
            };
            redesSociales: {
                type: string;
                properties: {
                    instagram: {
                        type: string;
                        example: string;
                    };
                    twitter: {
                        type: string;
                        example: string;
                    };
                    facebook: {
                        type: string;
                        example: string;
                    };
                };
            };
        };
    };
    ArtistaUpdate: {
        type: string;
        properties: {
            nombreArtistico: {
                type: string;
                minLength: number;
                example: string;
            };
            genero: {
                type: string;
                minLength: number;
                example: string;
            };
            biografia: {
                type: string;
                example: string;
            };
            redesSociales: {
                type: string;
                properties: {
                    instagram: {
                        type: string;
                        example: string;
                    };
                    twitter: {
                        type: string;
                        example: string;
                    };
                    facebook: {
                        type: string;
                        example: string;
                    };
                };
            };
            verificado: {
                type: string;
                example: boolean;
            };
        };
    };
};
//# sourceMappingURL=artista.schema.d.ts.map