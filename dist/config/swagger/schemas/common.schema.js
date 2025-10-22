"use strict";
/**
 * Schemas comunes de Swagger
 * Respuestas genéricas y estructuras reutilizables
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonResponses = exports.commonSchemas = void 0;
exports.commonSchemas = {
    SuccessResponse: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                example: true,
            },
            message: {
                type: 'string',
                example: 'Operación exitosa',
            },
            data: {
                type: 'object',
                description: 'Datos de la respuesta',
            },
        },
    },
    ErrorResponse: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                example: false,
            },
            message: {
                type: 'string',
                example: 'Error en la operación',
            },
            error: {
                type: 'string',
                example: 'Descripción detallada del error',
            },
        },
    },
    PaginationInfo: {
        type: 'object',
        properties: {
            page: {
                type: 'integer',
                example: 1,
            },
            pageSize: {
                type: 'integer',
                example: 10,
            },
            total: {
                type: 'integer',
                example: 50,
            },
            totalPages: {
                type: 'integer',
                example: 5,
            },
        },
    },
};
exports.commonResponses = {
    UnauthorizedError: {
        description: 'Token de autenticación inválido o faltante',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                    success: false,
                    message: 'Token de autenticación no proporcionado',
                },
            },
        },
    },
    ForbiddenError: {
        description: 'No tienes permisos para acceder a este recurso',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                    success: false,
                    message: 'No tienes permisos para acceder a este recurso',
                },
            },
        },
    },
    NotFoundError: {
        description: 'Recurso no encontrado',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                    success: false,
                    message: 'Recurso no encontrado',
                },
            },
        },
    },
    ValidationError: {
        description: 'Error de validación de datos',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                    success: false,
                    message: 'Error de validación',
                    error: 'Email inválido',
                },
            },
        },
    },
};
//# sourceMappingURL=common.schema.js.map