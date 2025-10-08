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
            const evento = new Evento({
                nombre: 'Concierto de Rock',
                descripcion: 'Un gran concierto de rock en vivo.',
                fecha: new Date('2024-12-01T20:00:00Z'),
                ubicacion: 'Estadio Nacional'
            });

            const savedEvento = await eventoRepository.save(evento);

            expect(savedEvento).toHaveProperty('id');
            expect(savedEvento.nombre).toBe(evento.nombre);
            expect(savedEvento.descripcion).toBe(evento.descripcion);
            expect(savedEvento.fecha.toISOString()).toBe(evento.fecha.toISOString());
            expect(savedEvento.ubicacion).toBe(evento.ubicacion);

        });
    });

});