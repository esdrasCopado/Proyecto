/**
 * Schemas de Swagger para el modelo Usuario
 */
export declare const usuarioSchemas: {
    Usuario: {
        type: string;
        required: string[];
        properties: {
            id: {
                type: string;
                description: string;
                example: number;
            };
            email: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            nombre: {
                type: string;
                description: string;
                example: string;
            };
            apellidos: {
                type: string;
                description: string;
                example: string;
            };
            telefono: {
                type: string;
                description: string;
                example: string;
            };
            fechaRegistro: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            rol: {
                type: string;
                enum: string[];
                description: string;
                example: string;
            };
        };
    };
    UsuarioCreate: {
        type: string;
        required: string[];
        properties: {
            email: {
                type: string;
                format: string;
                example: string;
            };
            password: {
                type: string;
                minLength: number;
                description: string;
                example: string;
            };
            nombre: {
                type: string;
                minLength: number;
                example: string;
            };
            apellidos: {
                type: string;
                minLength: number;
                example: string;
            };
            telefono: {
                type: string;
                pattern: string;
                example: string;
            };
            rol: {
                type: string;
                enum: string[];
                default: string;
                example: string;
            };
        };
    };
    LoginRequest: {
        type: string;
        required: string[];
        properties: {
            email: {
                type: string;
                format: string;
                example: string;
            };
            password: {
                type: string;
                example: string;
            };
        };
    };
    LoginResponse: {
        type: string;
        properties: {
            success: {
                type: string;
                example: boolean;
            };
            message: {
                type: string;
                example: string;
            };
            data: {
                type: string;
                properties: {
                    user: {
                        $ref: string;
                    };
                    tokens: {
                        type: string;
                        properties: {
                            accessToken: {
                                type: string;
                                description: string;
                                example: string;
                            };
                            refreshToken: {
                                type: string;
                                description: string;
                                example: string;
                            };
                        };
                    };
                };
            };
        };
    };
};
//# sourceMappingURL=usuario.schema.d.ts.map