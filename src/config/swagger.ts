/**
 * Configuración de Swagger/OpenAPI
 * Documentación automática de la API REST
 */

import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { appConfig } from './env';
import { allSchemas, allResponses } from './swagger/schemas';

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
            schemas: allSchemas,
            responses: allResponses,
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
        path.resolve(__dirname, '..', 'routes', '*.ts'),
        path.resolve(__dirname, '..', 'routes', '*.js'),
        path.resolve(__dirname, '..', 'controllers', '*.ts'),
        path.resolve(__dirname, '..', 'controllers', '*.js'),
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
