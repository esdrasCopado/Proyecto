/**
 * Punto de entrada para todos los schemas de Swagger
 * Agrupa y exporta todos los schemas y respuestas
 */
import { usuarioSchemas } from './usuario.schema';
import { eventoSchemas } from './evento.schema';
import { artistaSchemas } from './artista.schema';
import { organizadorSchemas } from './organizador.schema';
import { commonSchemas, commonResponses } from './common.schema';
export declare const allSchemas: {
    SuccessResponse: {
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
                description: string;
            };
        };
    };
    ErrorResponse: {
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
            error: {
                type: string;
                example: string;
            };
        };
    };
    PaginationInfo: {
        type: string;
        properties: {
            page: {
                type: string;
                example: number;
            };
            pageSize: {
                type: string;
                example: number;
            };
            total: {
                type: string;
                example: number;
            };
            totalPages: {
                type: string;
                example: number;
            };
        };
    };
    Organizador: {
        type: string;
        properties: {
            Nombre: {
                type: string;
                description: string;
                example: string;
            };
            Contracto: {
                type: string;
                description: string;
                example: string;
            };
            Pais: {
                type: string;
                description: string;
                example: string;
            };
            UsuarioId: {
                type: string;
                description: string;
                example: string;
            };
            Fundacion: {
                type: string;
                format: string;
                description: string;
                example: string;
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
    OrganizadorCreate: {
        type: string;
        required: string[];
        properties: {
            nombreEmpresa: {
                type: string;
                minLength: number;
                example: string;
            };
            rfc: {
                type: string;
                pattern: string;
                example: string;
            };
            direccion: {
                type: string;
                minLength: number;
                example: string;
            };
            telefonoEmpresa: {
                type: string;
                pattern: string;
                example: string;
            };
            sitioWeb: {
                type: string;
                format: string;
                example: string;
            };
        };
    };
    OrganizadorUpdate: {
        type: string;
        properties: {
            nombreEmpresa: {
                type: string;
                minLength: number;
                example: string;
            };
            rfc: {
                type: string;
                pattern: string;
                example: string;
            };
            direccion: {
                type: string;
                minLength: number;
                example: string;
            };
            telefonoEmpresa: {
                type: string;
                pattern: string;
                example: string;
            };
            sitioWeb: {
                type: string;
                format: string;
                example: string;
            };
            verificado: {
                type: string;
                example: boolean;
            };
        };
    };
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
export declare const allResponses: {
    UnauthorizedError: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    $ref: string;
                };
                example: {
                    success: boolean;
                    message: string;
                };
            };
        };
    };
    ForbiddenError: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    $ref: string;
                };
                example: {
                    success: boolean;
                    message: string;
                };
            };
        };
    };
    NotFoundError: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    $ref: string;
                };
                example: {
                    success: boolean;
                    message: string;
                };
            };
        };
    };
    ValidationError: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    $ref: string;
                };
                example: {
                    success: boolean;
                    message: string;
                    error: string;
                };
            };
        };
    };
};
export { usuarioSchemas, eventoSchemas, artistaSchemas, organizadorSchemas, commonSchemas, commonResponses, };
//# sourceMappingURL=index.d.ts.map