"use strict";
/**
 * Servidor principal de la aplicación
 * Punto de entrada para iniciar el servidor Express
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const PORT = env_1.appConfig.port || 3000;
app_1.default.listen(PORT, () => {
    console.log('========================================');
    console.log(`🚀 Servidor corriendo en modo ${env_1.appConfig.nodeEnv}`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📚 Documentación Swagger: http://localhost:${PORT}/api-docs`);
    console.log(`📄 Swagger JSON: http://localhost:${PORT}/api-docs.json`);
    console.log('========================================');
});
//# sourceMappingURL=server.js.map