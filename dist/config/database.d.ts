import { PrismaClient, Prisma } from "../generated/prisma";
declare const prisma: PrismaClient<{
    log: Prisma.LogLevel[];
    errorFormat: "pretty";
}, Prisma.LogLevel, import("@/generated/prisma/runtime/library").DefaultArgs>;
export declare const checkConnection: () => Promise<boolean>;
export declare const executeRawQuery: (query: string, params?: any[]) => Promise<unknown>;
export default prisma;
//# sourceMappingURL=database.d.ts.map