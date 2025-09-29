import { config } from 'dotenv';
import { z } from 'zod';

// Cargar variables de entorno
config();

// Schema de validación para variables de entorno
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL debe ser una URL válida'),
  SHADOW_DATABASE_URL: z.string().url().optional(),

  // Application
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().transform(Number).pipe(z.number().min(1000).max(65535)).default(3000),

  // Logging
  LOG_LEVEL: z
    .enum(['error', 'warn', 'info', 'debug'])
    .default('info'),
});

// Tipo inferido del schema
export type EnvConfig = z.infer<typeof envSchema>;

// Validar variables de entorno
const validateEnv = (): EnvConfig => {
  try {
    const env = envSchema.parse(process.env);
    console.log('Variables de entorno validadas correctamente');
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Error en variables de entorno:');
      error.issues.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    throw new Error('Configuración de entorno inválida');
  }
};

// Exportar configuración validada
export const env = validateEnv();

// Exportar configuración individual
export const dbConfig = {
  url: env.DATABASE_URL,
  shadowUrl: env.SHADOW_DATABASE_URL,
};

export const appConfig = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  isDevelopment: env.NODE_ENV === 'development',
  isProduction: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',
};

export const logConfig = {
  level: env.LOG_LEVEL,
};