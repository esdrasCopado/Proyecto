/**
 * Test de integración para el repositorio de ArtistaEvento
 */
import { ArtistaEventoRepository } from '../../src/repositories/artistaEventoRepository';
import { ArtistaRepository } from '../../src/repositories/artistaRepository';
import { EventoRepository } from '../../src/repositories/eventoRepository';
import prisma from '../../src/config/database';
import { ArtistaEvento } from '../../src/models/ArtistaEvento';
import { Artista } from '../../src/models/Artista';
import { Evento } from '../../src/models/Evento';

describe('ArtistaEventoRepository Integration Tests', () => {
    let artistaEventoRepo: ArtistaEventoRepository;
    let artistaRepo: ArtistaRepository;
    let eventoRepo: EventoRepository;

    let testArtistaId: number | undefined;
    let testEventoId: number | undefined;
    let testArtistaEventoId: number | undefined;

    beforeAll(async () => {
        artistaEventoRepo = new ArtistaEventoRepository();
        artistaRepo = new ArtistaRepository();
        eventoRepo = new EventoRepository();
        await prisma.$connect();
    });

    beforeEach(async () => {
        // Crear un artista de prueba con nombre único
        const timestamp = Date.now();
        const artista = new Artista({
            nombre: `Test Artista ${timestamp}`,
            genero: 'Rock',
            contacto: `test${timestamp}@example.com`,
            paisOrigen: 'USA',
            fechaDebut: new Date('2000-01-01')
        });
        const savedArtista = await artistaRepo.save(artista);
        testArtistaId = savedArtista.id;

        // Crear un evento de prueba con nombre único
        const evento = new Evento({
            nombre: `Test Evento ${timestamp}`,
            descripcion: 'Evento de prueba',
            fecha: new Date('2025-12-31'),
            ubicacion: 'Test Location'
        });
        const savedEvento = await eventoRepo.save(evento);
        testEventoId = savedEvento.id;
    });

    afterEach(async () => {
        // Limpiar artista_evento
        if (testArtistaEventoId) {
            try {
                await prisma.artistaEvento.deleteMany({ where: { id: testArtistaEventoId } });
            } catch { }
            testArtistaEventoId = undefined;
        }

        // Limpiar evento
        if (testEventoId) {
            try {
                await prisma.evento.deleteMany({ where: { id: testEventoId } });
            } catch { }
            testEventoId = undefined;
        }

        // Limpiar artista
        if (testArtistaId) {
            try {
                await prisma.artista.deleteMany({ where: { id: testArtistaId } });
            } catch { }
            testArtistaId = undefined;
        }
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('save', () => {
        test('should save a new artistaEvento', async () => {
            const artistaEvento = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: 'Artista Principal',
                compensacion: 5000,
                fechaConfirmacion: new Date()
            });

            const saved = await artistaEventoRepo.save(artistaEvento);

            expect(saved).toBeDefined();
            expect(saved.id).toBeDefined();
            expect(saved.artistaId).toBe(testArtistaId);
            expect(saved.eventoId).toBe(testEventoId);
            expect(saved.rol).toBe('Artista Principal');
            expect(saved.compensacion).toBe(5000);

            testArtistaEventoId = saved.id;
        });

        test('should reject duplicate artistaId and eventoId combination', async () => {
            const artistaEvento1 = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: 'Headliner',
                compensacion: 10000
            });

            const saved = await artistaEventoRepo.save(artistaEvento1);
            testArtistaEventoId = saved.id;

            const artistaEvento2 = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: 'Support Act',
                compensacion: 3000
            });

            await expect(artistaEventoRepo.save(artistaEvento2)).rejects.toThrow();
        });

        test('should reject invalid foreign keys', async () => {
            const artistaEvento = new ArtistaEvento({
                artistaId: 999999,
                eventoId: 999999,
                rol: 'Test Role'
            });

            await expect(artistaEventoRepo.save(artistaEvento)).rejects.toThrow();
        });
    });

    describe('findById', () => {
        test('should find artistaEvento by existing ID', async () => {
            const artistaEvento = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: 'Guest Artist',
                compensacion: 2000
            });

            const saved = await artistaEventoRepo.save(artistaEvento);
            testArtistaEventoId = saved.id;

            const found = await artistaEventoRepo.findById(saved.id!);

            expect(found).toBeDefined();
            expect(found?.id).toBe(saved.id);
            expect(found?.artistaId).toBe(testArtistaId);
            expect(found?.eventoId).toBe(testEventoId);
        });

        test('should return null for non-existent ID', async () => {
            const found = await artistaEventoRepo.findById(999999);
            expect(found).toBeNull();
        });
    });

    describe('update', () => {
        test('should update artistaEvento correctly', async () => {
            const artistaEvento = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: 'Opening Act',
                compensacion: 1500
            });

            const saved = await artistaEventoRepo.save(artistaEvento);
            testArtistaEventoId = saved.id;

            const updatedData = new ArtistaEvento({
                id: saved.id,
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: 'Main Act',
                compensacion: 7500
            });

            const updated = await artistaEventoRepo.update(updatedData);

            expect(updated.id).toBe(saved.id);
            expect(updated.rol).toBe('Main Act');
            expect(updated.compensacion).toBe(7500);
        });

        test('should reject update of non-existent ID', async () => {
            const artistaEvento = new ArtistaEvento({
                id: 999999,
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: 'Test'
            });

            await expect(artistaEventoRepo.update(artistaEvento)).rejects.toThrow();
        });
    });

    describe('delete', () => {
        test('should delete artistaEvento correctly', async () => {
            const artistaEvento = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: 'Special Guest'
            });

            const saved = await artistaEventoRepo.save(artistaEvento);

            await artistaEventoRepo.delete(saved.id!);

            const found = await artistaEventoRepo.findById(saved.id!);
            expect(found).toBeNull();

            testArtistaEventoId = undefined;
        });

        test('should reject deletion of non-existent ID', async () => {
            await expect(artistaEventoRepo.delete(999999)).rejects.toThrow();
        });
    });

    describe('findMany', () => {
        test('should return array of artistaEventos', async () => {
            const artistaEvento = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: 'Featured Artist',
                compensacion: 4000
            });

            const saved = await artistaEventoRepo.save(artistaEvento);
            testArtistaEventoId = saved.id;

            const results = await artistaEventoRepo.findMany();

            expect(results.length).toBeGreaterThanOrEqual(1);
            expect(results).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        artistaId: testArtistaId,
                        eventoId: testEventoId
                    })
                ])
            );
        });
    });

    describe('findByArtistaId', () => {
        test('should find all artistaEventos for a specific artist', async () => {
            // Crear segundo evento
            const evento2 = new Evento({
                nombre: 'Second Test Evento',
                descripcion: 'Second evento',
                fecha: new Date('2026-01-15'),
                ubicacion: 'Another Location'
            });
            const savedEvento2 = await eventoRepo.save(evento2);

            // Crear dos asociaciones para el mismo artista
            const ae1 = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: 'Headliner'
            });

            const ae2 = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: savedEvento2.id!,
                rol: 'Guest'
            });

            const saved1 = await artistaEventoRepo.save(ae1);
            const saved2 = await artistaEventoRepo.save(ae2);

            const results = await artistaEventoRepo.findByArtistaId(testArtistaId!);

            expect(results.length).toBeGreaterThanOrEqual(2);
            expect(results).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ eventoId: testEventoId }),
                    expect.objectContaining({ eventoId: savedEvento2.id })
                ])
            );

            // Limpiar
            await artistaEventoRepo.delete(saved1.id!);
            await artistaEventoRepo.delete(saved2.id!);
            await eventoRepo.delete(savedEvento2.id!);
            testArtistaEventoId = undefined;
        });

        test('should return empty array for artist with no events', async () => {
            const results = await artistaEventoRepo.findByArtistaId(999999);
            expect(results).toEqual([]);
        });
    });

    describe('findByEventoId', () => {
        test('should find all artistaEventos for a specific event', async () => {
            // Crear segundo artista
            const artista2 = new Artista({
                nombre: 'Second Test Artista',
                genero: 'Pop',
                contacto: 'second@example.com',
                paisOrigen: 'Mexico',
                fechaDebut: new Date('2005-01-01')
            });
            const savedArtista2 = await artistaRepo.save(artista2);

            // Crear dos asociaciones para el mismo evento
            const ae1 = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: 'Main Act'
            });

            const ae2 = new ArtistaEvento({
                artistaId: savedArtista2.id!,
                eventoId: testEventoId!,
                rol: 'Opening Act'
            });

            const saved1 = await artistaEventoRepo.save(ae1);
            const saved2 = await artistaEventoRepo.save(ae2);

            const results = await artistaEventoRepo.findByEventoId(testEventoId!);

            expect(results.length).toBeGreaterThanOrEqual(2);
            expect(results).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ artistaId: testArtistaId }),
                    expect.objectContaining({ artistaId: savedArtista2.id })
                ])
            );

            // Limpiar
            await artistaEventoRepo.delete(saved1.id!);
            await artistaEventoRepo.delete(saved2.id!);
            await artistaRepo.delete(savedArtista2.id!);
            testArtistaEventoId = undefined;
        });

        test('should return empty array for event with no artists', async () => {
            const results = await artistaEventoRepo.findByEventoId(999999);
            expect(results).toEqual([]);
        });
    });
});
