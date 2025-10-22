"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = exports.logConfig = exports.appConfig = exports.dbConfig = exports.env = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
// Cargar variables de entorno
(0, dotenv_1.config)();
// Schema de validación para variables de entorno
const envSchema = zod_1.z.object({
    // Database
    DATABASE_URL: zod_1.z.string().url('DATABASE_URL debe ser una URL válida'),
    SHADOW_DATABASE_URL: zod_1.z.string().url().optional(),
    // Application
    NODE_ENV: zod_1.z
        .enum(['development', 'production', 'test'])
        .default('development'),
    PORT: zod_1.z.string().transform(Number).pipe(zod_1.z.number().min(1000).max(65535)).default(3000),
    // Logging
    LOG_LEVEL: zod_1.z
        .enum(['error', 'warn', 'info', 'debug'])
        .default('info'),
    // JWT
    JWT_SECRET: zod_1.z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
    JWT_EXPIRES_IN: zod_1.z.string().default('7d'),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32, 'JWT_REFRESH_SECRET debe tener al menos 32 caracteres'),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default('30d'),
});
// Validar variables de entorno
const validateEnv = () => {
    try {
        const env = envSchema.parse(process.env);
        console.log('Variables de entorno validadas correctamente');
        return env;
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            console.error('Error en variables de entorno:');
            error.issues.forEach((err) => {
                console.error(`  - ${err.path.join('.')}: ${err.message}`);
            });
        }
        throw new Error('Configuración de entorno inválida');
    }
};
// Exportar configuración validada
exports.env = validateEnv();
// Exportar configuración individual
exports.dbConfig = {
    url: exports.env.DATABASE_URL,
    shadowUrl: exports.env.SHADOW_DATABASE_URL,
};
exports.appConfig = {
    nodeEnv: exports.env.NODE_ENV,
    port: exports.env.PORT,
    isDevelopment: exports.env.NODE_ENV === 'development',
    isProduction: exports.env.NODE_ENV === 'production',
    isTest: exports.env.NODE_ENV === 'test',
};
exports.logConfig = {
    level: exports.env.LOG_LEVEL,
};
exports.jwtConfig = {
    secret: exports.env.JWT_SECRET,
    expiresIn: exports.env.JWT_EXPIRES_IN,
    refreshSecret: exports.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: exports.env.JWT_REFRESH_EXPIRES_IN,
};
//# sourceMappingURL=env.js.map