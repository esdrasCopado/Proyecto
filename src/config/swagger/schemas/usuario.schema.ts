/**
 * Schemas de Swagger para el modelo Usuario
 */

export const usuarioSchemas = {
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
};
