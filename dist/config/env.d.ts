import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    SHADOW_DATABASE_URL: z.ZodOptional<z.ZodString>;
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        test: "test";
        development: "development";
        production: "production";
    }>>;
    PORT: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>;
    LOG_LEVEL: z.ZodDefault<z.ZodEnum<{
        info: "info";
        warn: "warn";
        error: "error";
        debug: "debug";
    }>>;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRES_IN: z.ZodDefault<z.ZodString>;
    JWT_REFRESH_SECRET: z.ZodString;
    JWT_REFRESH_EXPIRES_IN: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export type EnvConfig = z.infer<typeof envSchema>;
export declare const env: {
    DATABASE_URL: string;
    NODE_ENV: "test" | "development" | "production";
    PORT: number;
    LOG_LEVEL: "info" | "warn" | "error" | "debug";
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
    SHADOW_DATABASE_URL?: string | undefined;
};
export declare const dbConfig: {
    url: string;
    shadowUrl: string | undefined;
};
export declare const appConfig: {
    nodeEnv: "test" | "development" | "production";
    port: number;
    isDevelopment: boolean;
    isProduction: boolean;
    isTest: boolean;
};
export declare const logConfig: {
    level: "info" | "warn" | "error" | "debug";
};
export declare const jwtConfig: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
};
export {};
//# sourceMappingURL=env.d.ts.map