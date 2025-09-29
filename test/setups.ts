import prisma from '../src/config/database';

jest.setTimeout(1000);

afterAll(async ()=>{
    await prisma.$disconnect();
    console.log('Tests finalizados - Prisma desconectado')
})