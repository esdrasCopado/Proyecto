"use strict";
/**
 * Configuración de Swagger/OpenAPI
 * Documentación automática de la API REST
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./env");
const schemas_1 = require("./swagger/schemas");
const options = {
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
                url: env_1.appConfig.isDevelopment
                    ? 'http://localhost:3000'
                    : 'https://api.eventos.com',
                description: env_1.appConfig.isDevelopment
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
            schemas: schemas_1.allSchemas,
            responses: schemas_1.allResponses,
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
        // Buscar archivos tanto .ts (desarrollo) como .js (producción)
        path_1.default.resolve(__dirname, '..', 'routes', '*.ts'),
        path_1.default.resolve(__dirname, '..', 'routes', '*.js'),
        path_1.default.resolve(__dirname, '..', 'controllers', '*.ts'),
        path_1.default.resolve(__dirname, '..', 'controllers', '*.js'),
    ],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map