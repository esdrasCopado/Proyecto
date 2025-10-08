/**
 * Test de integracion para el repositorio de Artista
*/
import { ArtistaRepository } from '../../src/repositories/artistaRepository';
import prisma from '../../src/config/database';
import { Artista } from '../../src/models/Artista';

describe('ArtistaRepository Integration Tests', () => {
    let artistaRepo: ArtistaRepository;
    let artistaTestId: number | undefined;

    beforeAll(async () => {
        artistaRepo = new ArtistaRepository();
        await prisma.$connect();
    });
    afterEach(async () => {
        if (artistaTestId) {
            try {
                await prisma.artista.deleteMany({ where: { id: artistaTestId } });
            } catch { }
            artistaTestId = undefined;
        }
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('save', () => {
        test('should save a new artista', async () => {
            const artista = new Artista({
                nombre: 'Test Artista',
                genero: 'Rock',
                contacto: 'test@example.com',
                paisOrigen: 'USA',
                fechaDebut: new Date('2000-01-01'),
                disquera: 'Test Disquera'
            });
            const savedArtista = await artistaRepo.save(artista);

            expect(savedArtista).toBeDefined();
            expect(savedArtista.id).toBeDefined();
            expect(savedArtista.nombre).toBe('Test Artista');
            expect(savedArtista.genero).toBe('Rock');

            artistaTestId = savedArtista.id;
        });

        test('should reject duplicate artista name', async () => {
            const artista1 = new Artista({
                nombre: 'Duplicate Artista',
                genero: 'Pop',
                contacto: 'dup@example.com',
                paisOrigen: 'Mexico',
                fechaDebut: new Date('2010-01-01'),
                disquera: 'Universal'
            });
            const saved = await artistaRepo.save(artista1);
            artistaTestId = saved.id;

            const artista2 = new Artista({
                nombre: 'Duplicate Artista',
                genero: 'Rock',
                contacto: 'other@example.com',
                paisOrigen: 'Spain',
                fechaDebut: new Date('2015-01-01')
            });

            await expect(artistaRepo.save(artista2)).rejects.toThrow();
        });
    });

    describe('findById', () => {
        test('should find artista by existing ID', async () => {
            const artista = new Artista({
                nombre: 'FindById Test',
                genero: 'Jazz',
                contacto: 'find@example.com',
                paisOrigen: 'Brazil',
                fechaDebut: new Date('2005-01-01')
            });
            const saved = await artistaRepo.save(artista);
            artistaTestId = saved.id;

            const found = await artistaRepo.findById(saved.id!);

            expect(found).toBeDefined();
            expect(found?.id).toBe(saved.id);
            expect(found?.nombre).toBe('FindById Test');
        });

        test('should return null for non-existent ID', async () => {
            const found = await artistaRepo.findById(999999);
            expect(found).toBeNull();
        });
    });

    describe('update', () => {
        test('should update artista correctly', async () => {
            const artista = new Artista({
                nombre: 'Update Test',
                genero: 'Blues',
                contacto: 'update@example.com',
                paisOrigen: 'USA',
                fechaDebut: new Date('2000-01-01')
            });
            const saved = await artistaRepo.save(artista);
            artistaTestId = saved.id;

            const updated = await artistaRepo.update(saved.id!, {
                genero: 'Blues Rock',
                contacto: 'newemail@example.com'
            });

            expect(updated).not.toBeNull();
            expect(updated!.genero).toBe('Blues Rock');
            expect(updated!.contacto).toBe('newemail@example.com');
            expect(updated!.nombre).toBe('Update Test');
        });

        test('should reject update of non-existent ID', async () => {
            const result = await artistaRepo.update(999999, { genero: 'New Genre' });
            expect(result).toBeNull();
        });
    });

    describe('delete', () => {
        test('should delete artista correctly', async () => {
            const artista = new Artista({
                nombre: 'Delete Test',
                genero: 'Classical',
                contacto: 'delete@example.com',
                paisOrigen: 'Austria',
                fechaDebut: new Date('1990-01-01')
            });
            const saved = await artistaRepo.save(artista);

            await artistaRepo.delete(saved.id!);

            const found = await artistaRepo.findById(saved.id!);
            expect(found).toBeNull();

            artistaTestId = undefined;
        });

        test('should reject deletion of non-existent ID', async () => {
            await expect(artistaRepo.delete(999999)).rejects.toThrow();
        });
    });

    describe('findMany', () => {
        test('should return array of artistas', async () => {
            const artista1 = new Artista({
                nombre: 'Many Test 1',
                genero: 'Rock',
                contacto: 'many1@example.com',
                paisOrigen: 'UK',
                fechaDebut: new Date('2000-01-01')
            });
            const artista2 = new Artista({
                nombre: 'Many Test 2',
                genero: 'Pop',
                contacto: 'many2@example.com',
                paisOrigen: 'USA',
                fechaDebut: new Date('2005-01-01')
            });

            const saved1 = await artistaRepo.save(artista1);
            const saved2 = await artistaRepo.save(artista2);

            const artistas = await artistaRepo.findMany();

            expect(artistas.length).toBeGreaterThanOrEqual(2);
            expect(artistas).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ nombre: 'Many Test 1' }),
                    expect.objectContaining({ nombre: 'Many Test 2' })
                ])
            );

            await artistaRepo.delete(saved1.id!);
            await artistaRepo.delete(saved2.id!);
        });
    });

});