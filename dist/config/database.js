"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeRawQuery = exports.checkConnection = void 0;
const prisma_1 = require("../generated/prisma");
const logConfig = process.env.NODE_ENV === 'test'
    ? []
    : process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error'];
const prisma = new prisma_1.PrismaClient({
    log: logConfig,
    errorFormat: 'pretty',
});
const disconnect = async () => {
    await prisma.$disconnect();
};
process.on('beforeExit', disconnect);
process.on('SIGINT', disconnect);
process.on('SIGTERM', disconnect);
const checkConnection = async () => {
    try {
        await prisma.$connect();
        console.log('Coneción a la base de datos exitosa');
        return true;
    }
    catch (error) {
        console.error('Error al conectar con la base de datos');
        return false;
    }
};
exports.checkConnection = checkConnection;
const executeRawQuery = async (query, params) => {
    try {
        return await prisma.$queryRawUnsafe(query, ...(params || []));
    }
    catch (error) {
        console.error('Error ejecutando query: ', error);
        throw error;
    }
};
exports.executeRawQuery = executeRawQuery;
exports.default = prisma;
//# sourceMappingURL=database.js.map