/**
 * Schemas comunes de Swagger
 * Respuestas genéricas y estructuras reutilizables
 */
export declare const commonSchemas: {
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
};
export declare const commonResponses: {
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
//# sourceMappingURL=common.schema.d.ts.map