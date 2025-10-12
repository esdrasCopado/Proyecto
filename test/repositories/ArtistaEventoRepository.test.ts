/**
 * Test de integración para el repositorio de ArtistaEvento
 */
// Artistas 
import { ArtistaEventoRepository } from '../../src/repositories/artistaEventoRepository';
import { ArtistaRepository } from '../../src/repositories/artistaRepository';
import { EventoRepository } from '../../src/repositories/eventoRepository';
import { Artista } from '../../src/models/Artista';

import { ArtistaEvento } from '../../src/models/ArtistaEvento';

import { Evento } from '../../src/models/Evento';
import { OrganizadorRepository } from '../../src/repositories/OrganizadorRepository';
import { Organizador } from '../../src/models/Organizador';

// Usuarios
import { Usuario } from '../../src/models/Usuario';
import { UsuarioRepository } from '../../src/repositories/UsuarioRepository';


import { RolArtista } from '../../src/types/enums';
import prisma from '../../src/config/database';

describe('ArtistaEventoRepository Integration Tests', () => {
    let artistaEventoRepo: ArtistaEventoRepository;
    let artistaRepo: ArtistaRepository;
    let eventoRepo: EventoRepository;
    let organizadorRepo: OrganizadorRepository;

    let usuarioRepo: UsuarioRepository;

    let testArtistaId: number | undefined;
    let testEventoId: number | undefined;
    let testArtistaEventoId: number | undefined;
    let testOrganizadorId: number | undefined;

    beforeAll(async () => {
        artistaEventoRepo = new ArtistaEventoRepository();
        artistaRepo = new ArtistaRepository();
        eventoRepo = new EventoRepository();
        usuarioRepo = new UsuarioRepository();
        organizadorRepo = new OrganizadorRepository();
        await prisma.$connect();
    });

    beforeEach(async () => {
        // crea un usuario Unico
        const usuario = new Usuario({
            email: `unique_${Date.now()}@test.com`,
            password: 'password123',
            nombre: 'Test',
            apellidos: 'User',
            telefono: '1234567890'
        });
        const savedUsuario = await usuarioRepo.create(usuario);

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
        // Crear un organizador de prueba con nombre único
        const organizador = new Organizador({
            nombre: `Test Organizador ${timestamp}`,
            contacto: `test${timestamp}@example.com`,
            pais: 'USA',
            fundacion: new Date('2000-01-01'),
            usuarioId: savedUsuario.id!
        });
        const savedOrganizador = await organizadorRepo.create(organizador);
        testOrganizadorId = savedOrganizador.id;

        // Crear un evento de prueba con nombre único
        const evento = new Evento({
            nombre: `Test Evento ${timestamp}`,
            descripcion: 'Evento de prueba',
            fecha: new Date('2025-12-31'),
            ubicacion: 'Test Location',

            organizadorId: testOrganizadorId ? testOrganizadorId : 1, 
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
                rol: RolArtista.HEADLINER,
                compensacion: 5000,
                fechaConfirmacion: new Date()
            });

            const saved = await artistaEventoRepo.create(artistaEvento);

            expect(saved).toBeDefined();
            expect(saved.id).toBeDefined();
            expect(saved.artistaId).toBe(testArtistaId);
            expect(saved.eventoId).toBe(testEventoId);
            expect(saved.rol).toBe(RolArtista.HEADLINER);
            expect(saved.compensacion).toBe(5000);

            testArtistaEventoId = saved.id;
        });

        test('should reject duplicate artistaId and eventoId combination', async () => {
            const artistaEvento1 = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: RolArtista.HEADLINER,
                compensacion: 10000
            });

            const saved = await artistaEventoRepo.create(artistaEvento1);
            testArtistaEventoId = saved.id;

            const artistaEvento2 = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: RolArtista.INVITADO,
                compensacion: 3000
            });

            await expect(artistaEventoRepo.create(artistaEvento2)).rejects.toThrow();
        });

        test('should reject invalid foreign keys', async () => {
            const artistaEvento = new ArtistaEvento({
                artistaId: 999999,
                eventoId: 999999,
                rol: RolArtista.INVITADO
            });

            await expect(artistaEventoRepo.create(artistaEvento)).rejects.toThrow();
        });
    });

    describe('findById', () => {
        test('should find artistaEvento by existing ID', async () => {
            const artistaEvento = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: RolArtista.COLABORADOR,
                compensacion: 2000
            });

            const saved = await artistaEventoRepo.create(artistaEvento);
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
                rol: RolArtista.HEADLINER,
                compensacion: 1500
            });

            const saved = await artistaEventoRepo.create(artistaEvento);
            testArtistaEventoId = saved.id;

            const updatedData = new ArtistaEvento({
                id: saved.id,
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: RolArtista.HEADLINER,
                compensacion: 7500
            });

            const updated = await artistaEventoRepo.update(updatedData);

            expect(updated.id).toBe(saved.id);
            expect(updated.rol).toBe(RolArtista.HEADLINER);
            expect(updated.compensacion).toBe(7500);
        });

        test('should reject update of non-existent ID', async () => {
            const artistaEvento = new ArtistaEvento({
                id: 999999,
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: RolArtista.INVITADO
            });

            await expect(artistaEventoRepo.update(artistaEvento)).rejects.toThrow();
        });
    });

    describe('delete', () => {
        test('should delete artistaEvento correctly', async () => {
            const artistaEvento = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: RolArtista.COLABORADOR
            });

            const saved = await artistaEventoRepo.create(artistaEvento);

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
                rol: RolArtista.HEADLINER,
                compensacion: 4000
            });

            const saved = await artistaEventoRepo.create(artistaEvento);
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
                ubicacion: 'Another Location',
                organizadorId: testOrganizadorId! // Usar el organizador del test
            });
            const savedEvento2 = await eventoRepo.save(evento2);

            // Crear dos asociaciones para el mismo artista
            const ae1 = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: testEventoId!,
                rol: RolArtista.HEADLINER
            });

            const ae2 = new ArtistaEvento({
                artistaId: testArtistaId!,
                eventoId: savedEvento2.id!,
                rol: RolArtista.TELONERO
            });

            const saved1 = await artistaEventoRepo.create(ae1);
            const saved2 = await artistaEventoRepo.create(ae2);

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
                rol: RolArtista.HEADLINER
            });

            const ae2 = new ArtistaEvento({
                artistaId: savedArtista2.id!,
                eventoId: testEventoId!,
                rol: RolArtista.TELONERO
            });

            const saved1 = await artistaEventoRepo.create(ae1);
            const saved2 = await artistaEventoRepo.create(ae2);

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
