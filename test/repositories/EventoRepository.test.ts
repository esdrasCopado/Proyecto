import { EventoRepository } from '../../src/repositories/eventoRepository';
import prisma from '../../src/config/database';
import { Evento } from '../../src/models/Evento';

describe('EventoRepository Integration Tests', () => {
    let eventoRepository: EventoRepository;
    let testEventoId: number | undefined;

    beforeAll(async () => {
        eventoRepository = new EventoRepository();
        await prisma.$connect();
    });

    afterEach(async () => {
        if (testEventoId) {
            try {
                await eventoRepository.delete(testEventoId);
            } catch (error) {                // Ignore errors during cleanup
            }
            testEventoId = undefined;
        }
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('save', () => {
        test('should save a new evento', async () => {


        });
    });

});