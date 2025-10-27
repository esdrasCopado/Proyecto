/**
 * Punto de entrada para todos los schemas de Swagger
 * Agrupa y exporta todos los schemas y respuestas
 */
import { usuarioSchemas } from './usuario.schema';
import { eventoSchemas } from './evento.schema';
import { artistaSchemas } from './artista.schema';
import { artistaEventoSchemas } from './artistaEvento.schema';
import { organizadorSchemas } from './organizador.schema';
import { boletoSchemas } from './boleto.shema';
import { ordenSchemas } from './orden.schema';
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
    Orden: {
        type: string;
        properties: {
            id: {
                type: string;
                description: string;
                example: number;
            };
            total: {
                type: string;
                format: string;
                description: string;
                example: number;
            };
            fecha: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            estado: {
                type: string;
                enum: string[];
                description: string;
                example: string;
            };
            usuarioId: {
                type: string;
                description: string;
                example: number;
            };
            boletos: {
                type: string;
                description: string;
                items: {
                    type: string;
                };
                example: number[];
            };
        };
    };
    OrdenCreate: {
        type: string;
        required: string[];
        properties: {
            usuarioId: {
                type: string;
                minimum: number;
                description: string;
                example: number;
            };
            boletoIds: {
                type: string;
                minItems: number;
                description: string;
                items: {
                    type: string;
                    minimum: number;
                };
                example: number[];
            };
        };
    };
    OrdenEstadoUpdate: {
        type: string;
        required: string[];
        properties: {
            estado: {
                type: string;
                enum: string[];
                description: string;
                example: string;
            };
        };
    };
    OrdenEstadisticas: {
        type: string;
        properties: {
            total: {
                type: string;
                description: string;
                example: number;
            };
            pendientes: {
                type: string;
                description: string;
                example: number;
            };
            pagadas: {
                type: string;
                description: string;
                example: number;
            };
            canceladas: {
                type: string;
                description: string;
                example: number;
            };
            reembolsadas: {
                type: string;
                description: string;
                example: number;
            };
            totalRecaudado: {
                type: string;
                format: string;
                description: string;
                example: number;
            };
        };
    };
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
            imagenUrl: {
                type: string;
                description: string;
                maxLength: number;
                example: string;
                nullable: boolean;
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
export { usuarioSchemas, eventoSchemas, artistaSchemas, artistaEventoSchemas, organizadorSchemas, boletoSchemas, ordenSchemas, commonSchemas, commonResponses, };
//# sourceMappingURL=index.d.ts.map