"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
// Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Eventos - Documentación',
}));
// Swagger JSON
app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_1.swaggerSpec);
});
// API Routes
app.use('/api', routes_1.default);
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
};
exports.default = app;
//# sourceMappingURL=app.js.map