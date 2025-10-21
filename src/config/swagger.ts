/**
 * Configuración de Swagger/OpenAPI
 * Documentación automática de la API REST
 */

import swaggerJsdoc from 'swagger-jsdoc';
import { appConfig } from './env';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de Eventos',
            version: '1.0.0',
            description: 'API REST para gestión de eventos, usuarios, artistas y organizadores',
            contact: {
                name: 'Equipo de Desarrollo',
                email: 'dev@eventos.com',
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC',
            },
        },
        servers: [
            {
                url: appConfig.isDevelopment
                    ? 'http://localhost:3000'
                    : 'https://api.eventos.com',
                description: appConfig.isDevelopment
                    ? 'Servidor de Desarrollo'
                    : 'Servidor de Producción',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Ingrese el token JWT obtenido del endpoint /api/usuarios/login',
                },
            },
            schemas: {
                // Schema de Usuario
                Usuario: {
                    type: 'object',
                    required: ['email', 'password', 'nombre', 'apellidos', 'telefono'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID único del usuario',
                            example: 1,
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email del usuario',
                            example: 'usuario@ejemplo.com',
                        },
                        nombre: {
                            type: 'string',
                            description: 'Nombre del usuario',
                            example: 'Juan',
                        },
                        apellidos: {
                            type: 'string',
                            description: 'Apellidos del usuario',
                            example: 'Pérez García',
                        },
                        telefono: {
                            type: 'string',
                            description: 'Teléfono del usuario (10 dígitos)',
                            example: '5551234567',
                        },
                        fechaRegistro: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de registro del usuario',
                            example: '2024-01-15T10:30:00Z',
                        },
                        rol: {
                            type: 'string',
                            enum: ['USER', 'ARTISTA', 'ORGANIZADOR', 'ADMIN'],
                            description: 'Rol del usuario en el sistema',
                            example: 'USER',
                        },
                    },
                },
                // Schema de creación de usuario
                UsuarioCreate: {
                    type: 'object',
                    required: ['email', 'password', 'nombre', 'apellidos', 'telefono'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'usuario@ejemplo.com',
                        },
                        password: {
                            type: 'string',
                            minLength: 6,
                            description: 'Contraseña (mínimo 6 caracteres)',
                            example: 'MiPassword123!',
                        },
                        nombre: {
                            type: 'string',
                            minLength: 2,
                            example: 'Juan',
                        },
                        apellidos: {
                            type: 'string',
                            minLength: 2,
                            example: 'Pérez García',
                        },
                        telefono: {
                            type: 'string',
                            pattern: '^[0-9]{10}$',
                            example: '5551234567',
                        },
                        rol: {
                            type: 'string',
                            enum: ['USER', 'ARTISTA', 'ORGANIZADOR', 'ADMIN'],
                            default: 'USER',
                            example: 'USER',
                        },
                    },
                },
                // Schema de login
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'usuario@ejemplo.com',
                        },
                        password: {
                            type: 'string',
                            example: 'MiPassword123!',
                        },
                    },
                },
                // Schema de respuesta de login
                LoginResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true,
                        },
                        message: {
                            type: 'string',
                            example: 'Login exitoso',
                        },
                        data: {
                            type: 'object',
                            properties: {
                                user: {
                                    $ref: '#/components/schemas/Usuario',
                                },
                                tokens: {
                                    type: 'object',
                                    properties: {
                                        accessToken: {
                                            type: 'string',
                                            description: 'Token JWT de acceso',
                                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                        },
                                        refreshToken: {
                                            type: 'string',
                                            description: 'Token JWT de refresco',
                                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                // Schema de respuesta exitosa genérica
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
                // Schema de respuesta de error
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
                // Schema de paginación
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
            },
            responses: {
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
            },
        },
        tags: [
            {
                name: 'Usuarios',
                description: 'Endpoints para gestión de usuarios',
            },
            {
                name: 'Autenticación',
                description: 'Endpoints para autenticación y autorización',
            },
            {
                name: 'Eventos',
                description: 'Endpoints para gestión de eventos',
            },
            {
                name: 'Artistas',
                description: 'Endpoints para gestión de artistas',
            },
            {
                name: 'Organizadores',
                description: 'Endpoints para gestión de organizadores',
            },
        ],
    },
    apis: [
        './src/routes/*.ts',
        './src/controllers/*.ts',
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
