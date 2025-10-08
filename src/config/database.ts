import { PrismaClient, Prisma } from "../generated/prisma";

const logConfig: Prisma.LogLevel[] = process.env.NODE_ENV === 'test'
? []
: process.env.NODE_ENV === 'development'
? ['query', 'info', 'warn', 'error']
: ['error'];

const prisma = new PrismaClient({
    log: logConfig,
    errorFormat: 'pretty',
});

const disconnect = async ()=>{
    await prisma.$disconnect();
};

process.on('beforeExit', disconnect);
process.on('SIGINT', disconnect);
process.on('SIGTERM', disconnect);

export const checkConnection = async (): Promise<boolean> =>{
    try {
        await prisma.$connect();
        console.log('Coneción a la base de datos exitosa');
        return true;
    } catch (error) {
        console.error('Error al conectar con la base de datos');
        return false;
    }
}

export const executeRawQuery = async (query: string, params?: any[]) =>{
    try {
        return await prisma.$queryRawUnsafe(query, ...(params || []));
    } catch (error) {
        console.error('Error ejecutando query: ', error);
        throw error;
    }
}

export default prisma;