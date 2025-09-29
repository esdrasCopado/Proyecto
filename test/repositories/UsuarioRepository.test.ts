/**
 * Tests de integración para UsuarioRepository
 * Estos tests interactúan con la base de datos real
 */

import { UsuarioRepository } from '../../src/repositories/userRepository';
import { Usuario } from '../../src/models/Usuario';
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
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });

      // Act
      const usuarioGuardado = await repository.save(usuario);
      usuarioTestId = usuarioGuardado.id;

      // Assert
      expect(usuarioGuardado.id).toBeDefined();
      expect(usuarioGuardado.id).toBeGreaterThan(0);
      expect(usuarioGuardado.email).toBe(usuario.email);
      expect(usuarioGuardado.nombre).toBe('Juan');
    });

    test('debe rechazar email duplicado', async () => {
      // Arrange
      const email = `duplicate_${Date.now()}@ejemplo.com`;
      const usuario1 = new Usuario({
        email,
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });

      // Act - Guardar primero
      const guardado = await repository.save(usuario1);
      usuarioTestId = guardado.id;

      // Intentar guardar con mismo email
      const usuario2 = new Usuario({
        email,
        nombre: 'María',
        apellidos: 'López',
        telefono: '6449876543',
      });

      // Assert
      await expect(repository.save(usuario2)).rejects.toThrow('email');
    });
  });

  // ==================== TESTS DE FINDBYID ====================
  describe('findById()', () => {
    
    test('debe encontrar usuario por ID existente', async () => {
      // Arrange - Crear usuario primero
      const usuario = new Usuario({
        email: `findbyid_${Date.now()}@ejemplo.com`,
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });
      const guardado = await repository.save(usuario);
      usuarioTestId = guardado.id;

      // Act
      const encontrado = await repository.findById(guardado.id!);

      // Assert
      expect(encontrado).not.toBeNull();
      expect(encontrado?.id).toBe(guardado.id);
      expect(encontrado?.email).toBe(guardado.email);
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
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });
      const guardado = await repository.save(usuario);
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
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });
      const guardado = await repository.save(usuario);
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
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });
      const guardado = await repository.save(usuario);

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
        nombre: 'Juan',
        apellidos: 'Pérez',
        telefono: '6441234567',
      });
      const guardado = await repository.save(usuario);
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
});