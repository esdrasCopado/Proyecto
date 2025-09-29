import prisma, { checkConnection } from '../src/config/database';

async function testDatabase() {
    console.log(' Iniciando prueba de conexión a la base de datos...\n');

    try {
        // 1. Verificar conexión
        console.log(' Verificando conexión...');
        const isConnected = await checkConnection();

        if (!isConnected) {
            throw new Error('No se pudo establecer conexión');
        }

        // 2. Probar query simple
        console.log('\n Ejecutando query de prueba...');
        const result = await prisma.$queryRaw`SELECT 1 + 1 as resultado`;
        console.log('   Resultado:', result);

        // 3. Contar registros
        console.log('\n  Contando registros...');
        const usuariosCount = await prisma.usuario.count();
        console.log(`   - Usuarios: ${usuariosCount}`);

        const eventosCount = await prisma.evento.count();
        console.log(`   - Eventos: ${eventosCount}`);

        console.log('\n ¡Prueba completada exitosamente!');

    } catch (error) {
        console.error('\n Error durante las pruebas:', error);
        process.exit(1);
    } finally {
        // IMPORTANTE: Desconectar
        await prisma.$disconnect();
        console.log('\n🔌 Desconectado de la base de datos');
    }
}

// ¡IMPORTANTE! Ejecutar la función
testDatabase();