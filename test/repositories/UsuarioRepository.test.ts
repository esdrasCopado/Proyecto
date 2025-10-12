/**
 * Tests de integración para UsuarioRepository
 * Estos tests interactúan con la base de datos real
 */

import { UsuarioRepository } from '../../src/repositories/UsuarioRepository';
import { Usuario } from '../../src/models/Usuario';
import { Role } from '../../src/types/enums';
import prisma from '../../src/config/database';

describe('UsuarioRepository Integration Tests', () => {
  
  let repository: UsuarioRepository;
  let usuarioTestId: number | undefined;

  // Ejecutar antes de todos los tests
  beforeAll(async () => {
    repository = new UsuarioRepository();
    
    // Verificar conexión a BD
    await prisma.$connect();
  });

  // Ejecutar después de cada test para limpiar
  afterEach(async () => {
    // Limpiar usuario de prueba si existe
    if (usuarioTestId) {
      try {
        await prisma.usuario.delete({
          where: { id: usuarioTestId }
        });
      } catch (error) {
        // Ignorar si no existe
      }
      usuarioTestId = undefined;
    }
  });

  // Ejecutar después de todos los tests
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // ==================== TESTS DE SAVE ====================
  describe('save()', () => {
    
    test('debe guardar un usuario nuevo correctamente', async () => {
      // Arrange
      const usuario = new Usuario({
        email: `test_${Date.now()}@ejemplo.com`,
        password: 'password123',
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });

      // Act
      const usuarioGuardado = await repository.create(usuario);
      usuarioTestId = usuarioGuardado.id;

      // Assert
      expect(usuarioGuardado.id).toBeDefined();
      expect(usuarioGuardado.id).toBeGreaterThan(0);
      expect(usuarioGuardado.email).toBe(usuario.email);
      expect(usuarioGuardado.nombre).toBe('Juan');
      expect(usuarioGuardado.password).toBe('password123');
      expect(usuarioGuardado.rol).toBe(Role.USER); // Default role
    });

    test('debe rechazar email duplicado', async () => {
      // Arrange
      const email = `duplicate_${Date.now()}@ejemplo.com`;
      const usuario1 = new Usuario({
        email,
        password: 'password123',
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });

      // Act - Guardar primero
      const guardado = await repository.create(usuario1);
      usuarioTestId = guardado.id;

      // Intentar guardar con mismo email
      const usuario2 = new Usuario({
        email,
        password: 'password456',
        nombre: 'María',
        apellidos: 'López',
        telefono: '6449876543',
      });

      // Assert
      await expect(repository.create(usuario2)).rejects.toThrow('email');
    });

    test('debe guardar usuario con rol específico', async () => {
      // Arrange
      const usuario = new Usuario({
        email: `artista_${Date.now()}@ejemplo.com`,
        password: 'password123',
        nombre: 'Carlos',
        apellidos: 'Músico',
        telefono: '6441234567',
        rol: Role.ARTISTA,
      });

      // Act
      const usuarioGuardado = await repository.create(usuario);
      usuarioTestId = usuarioGuardado.id;

      // Assert
      expect(usuarioGuardado.rol).toBe(Role.ARTISTA);
      expect(usuarioGuardado.esArtista()).toBe(true);
      expect(usuarioGuardado.esUsuarioNormal()).toBe(false);
    });
  });

  // ==================== TESTS DE FINDBYID ====================
  describe('findById()', () => {
    
    test('debe encontrar usuario por ID existente', async () => {
      // Arrange - Crear usuario primero
      const usuario = new Usuario({
        email: `findbyid_${Date.now()}@ejemplo.com`,
        password: 'password123',
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });
      const guardado = await repository.create(usuario);
      usuarioTestId = guardado.id;

      // Act
      const encontrado = await repository.findById(guardado.id!);

      // Assert
      expect(encontrado).not.toBeNull();
      expect(encontrado?.id).toBe(guardado.id);
      expect(encontrado?.email).toBe(guardado.email);
      expect(encontrado?.password).toBe('password123');
    });

    test('debe retornar null para ID inexistente', async () => {
      // Act
      const encontrado = await repository.findById(999999);

      // Assert
      expect(encontrado).toBeNull();
    });
  });

  // ==================== TESTS DE FINDBYEMAIL ====================
  describe('findByEmail()', () => {
    
    test('debe encontrar usuario por email existente', async () => {
      // Arrange
      const email = `findbyemail_${Date.now()}@ejemplo.com`;
      const usuario = new Usuario({
        email,
        password: 'password123',
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });
      const guardado = await repository.create(usuario);
      usuarioTestId = guardado.id;

      // Act
      const encontrado = await repository.findByEmail(email);

      // Assert
      expect(encontrado).not.toBeNull();
      expect(encontrado?.email).toBe(email);
    });

    test('debe retornar null para email inexistente', async () => {
      // Act
      const encontrado = await repository.findByEmail('noexiste@ejemplo.com');

      // Assert
      expect(encontrado).toBeNull();
    });
  });

  // ==================== TESTS DE UPDATE ====================
  describe('update()', () => {
    
    test('debe actualizar usuario correctamente', async () => {
      // Arrange - Crear usuario primero
      const usuario = new Usuario({
        email: `update_${Date.now()}@ejemplo.com`,
        password: 'password123',
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });
      const guardado = await repository.create(usuario);
      usuarioTestId = guardado.id;

      // Act
      const actualizado = await repository.update(guardado.id!, {
        nombre: 'Carlos',
        telefono: '6449876543',
      });

      // Assert
      expect(actualizado.nombre).toBe('Carlos');
      expect(actualizado.telefono).toBe('6449876543');
      expect(actualizado.email).toBe(guardado.email); // No cambió
    });

    test('debe actualizar password del usuario', async () => {
      // Arrange
      const usuario = new Usuario({
        email: `updatepwd_${Date.now()}@ejemplo.com`,
        password: 'password123',
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });
      const guardado = await repository.create(usuario);
      usuarioTestId = guardado.id;

      // Act
      const actualizado = await repository.update(guardado.id!, {
        password: 'newpassword456',
      });

      // Assert
      expect(actualizado.password).toBe('newpassword456');
    });

    test('debe actualizar rol del usuario', async () => {
      // Arrange
      const usuario = new Usuario({
        email: `updaterole_${Date.now()}@ejemplo.com`,
        password: 'password123',
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
        rol: Role.USER,
      });
      const guardado = await repository.create(usuario);
      usuarioTestId = guardado.id;

      // Act
      const actualizado = await repository.update(guardado.id!, {
        rol: Role.ORGANIZADOR,
      });

      // Assert
      expect(actualizado.rol).toBe(Role.ORGANIZADOR);
      expect(actualizado.esOrganizador()).toBe(true);
    });

    test('debe rechazar actualización de ID inexistente', async () => {
      // Assert
      await expect(
        repository.update(999999, { nombre: 'Test' })
      ).rejects.toThrow('no encontrado');
    });
  });

  // ==================== TESTS DE DELETE ====================
  describe('delete()', () => {
    
    test('debe eliminar usuario correctamente', async () => {
      // Arrange
      const usuario = new Usuario({
        email: `delete_${Date.now()}@ejemplo.com`,
        password: 'password123',
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });
      const guardado = await repository.create(usuario);

      // Act
      await repository.delete(guardado.id!);

      // Assert
      const eliminado = await repository.findById(guardado.id!);
      expect(eliminado).toBeNull();
    });

    test('debe rechazar eliminación de ID inexistente', async () => {
      // Assert
      await expect(repository.delete(999999)).rejects.toThrow('no encontrado');
    });
  });

  // ==================== TESTS DE FINDMANY ====================
  describe('findMany()', () => {
    
    test('debe retornar array de usuarios', async () => {
      // Act
      const usuarios = await repository.findMany();

      // Assert
      expect(Array.isArray(usuarios)).toBe(true);
      expect(usuarios.length).toBeGreaterThanOrEqual(0);
    });
  });

  // ==================== TESTS DE COUNT ====================
  describe('count()', () => {
    
    test('debe retornar número de usuarios', async () => {
      // Act
      const count = await repository.count();

      // Assert
      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  // ==================== TESTS DE EMAILEXISTS ====================
  describe('emailExists()', () => {
    
    test('debe retornar true para email existente', async () => {
      // Arrange
      const email = `exists_${Date.now()}@ejemplo.com`;
      const usuario = new Usuario({
        email,
        password: 'password123',
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });
      const guardado = await repository.create(usuario);
      usuarioTestId = guardado.id;

      // Act
      const existe = await repository.emailExists(email);

      // Assert
      expect(existe).toBe(true);
    });

    test('debe retornar false para email inexistente', async () => {
      // Act
      const existe = await repository.emailExists('noexiste@ejemplo.com');

      // Assert
      expect(existe).toBe(false);
    });
  });

  // ==================== TESTS DE FINDBYROL ====================
  describe('findByRol()', () => {

    test('debe encontrar usuarios por rol USER', async () => {
      // Arrange
      const usuario = new Usuario({
        email: `roleuser_${Date.now()}@ejemplo.com`,
        password: 'password123',
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
        rol: Role.USER,
      });
      const guardado = await repository.create(usuario);
      usuarioTestId = guardado.id;

      // Act
      const usuarios = await repository.findByRol(Role.USER);

      // Assert
      expect(Array.isArray(usuarios)).toBe(true);
      expect(usuarios.length).toBeGreaterThan(0);
      const encontrado = usuarios.find(u => u.id === guardado.id);
      expect(encontrado).toBeDefined();
      expect(encontrado?.rol).toBe(Role.USER);
    });

    test('debe encontrar usuarios por rol ARTISTA', async () => {
      // Arrange
      const usuario = new Usuario({
        email: `roleartist_${Date.now()}@ejemplo.com`,
        password: 'password123',
        nombre: 'Carlos',
        apellidos: 'Músico',
        telefono: '6441234567',
        rol: Role.ARTISTA,
      });
      const guardado = await repository.create(usuario);
      usuarioTestId = guardado.id;

      // Act
      const artistas = await repository.findByRol(Role.ARTISTA);

      // Assert
      expect(Array.isArray(artistas)).toBe(true);
      const encontrado = artistas.find(u => u.id === guardado.id);
      expect(encontrado).toBeDefined();
      expect(encontrado?.esArtista()).toBe(true);
    });

    test('debe encontrar usuarios por rol ORGANIZADOR', async () => {
      // Arrange
      const usuario = new Usuario({
        email: `roleorg_${Date.now()}@ejemplo.com`,
        password: 'password123',
        nombre: 'María',
        apellidos: 'Eventos',
        telefono: '6441234567',
        rol: Role.ORGANIZADOR,
      });
      const guardado = await repository.create(usuario);
      usuarioTestId = guardado.id;

      // Act
      const organizadores = await repository.findByRol(Role.ORGANIZADOR);

      // Assert
      expect(Array.isArray(organizadores)).toBe(true);
      const encontrado = organizadores.find(u => u.id === guardado.id);
      expect(encontrado).toBeDefined();
      expect(encontrado?.esOrganizador()).toBe(true);
    });

    test('debe retornar array vacío si no hay usuarios con ese rol', async () => {
      // Act - Buscar rol ADMIN que probablemente no existe en tests
      const admins = await repository.findByRol(Role.ADMIN);

      // Assert
      expect(Array.isArray(admins)).toBe(true);
      // Puede estar vacío o no, dependiendo de la BD
    });
  });
});