/**
 * Servidor principal de la aplicación
 * Punto de entrada para iniciar el servidor Express
 */

import app from './app';
import { appConfig } from './config/env';

const PORT = appConfig.port || 3000;

app.listen(PORT, () => {
    console.log('========================================');
    console.log(`🚀 Servidor corriendo en modo ${appConfig.nodeEnv}`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📚 Documentación Swagger: http://localhost:${PORT}/api-docs`);
    console.log(`📄 Swagger JSON: http://localhost:${PORT}/api-docs.json`);
    console.log('========================================');
});
