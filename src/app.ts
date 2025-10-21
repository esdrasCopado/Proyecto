import express from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { swaggerSpec } from './config/swagger';

const app = express();

// Middlewares
app.use(express.json());


// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Eventos - Documentación',
}));

// Swagger JSON
app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// API Routes
app.use('/api', routes);

// Ruta raíz
app.get('/', (_req, res) => {
    res.json({
        message: 'API de Gestión de Eventos',
        version: '1.0.0',
        documentation: '/api-docs',
    });
});

const startServer = () => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        console.log(`Documentación API disponible en http://localhost:${PORT}/api-docs`);
    });
}

export default app;