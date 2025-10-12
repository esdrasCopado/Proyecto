import prisma from '../../src/config/database';
import { Usuario } from '../../src/models/Usuario';
import { UsuarioRepository } from '../../src/repositories/UsuarioRepository';
import { Organizador } from '../../src/models/Organizador';
import { OrganizadorRepository } from '../../src/repositories/OrganizadorRepository';

describe('OrganizadorRepository', () => {
  let usuario: Usuario;
  let usuarioRepo: UsuarioRepository;
  let organizadorRepo: OrganizadorRepository;
  let organizadorGlobal: Organizador;

  beforeAll(async () => {
    usuarioRepo = new UsuarioRepository();
    organizadorRepo = new OrganizadorRepository();

    await prisma.$connect();

    // Limpia cualquier rastro previo antes de crear datos de prueba
    await prisma.organizador.deleteMany();
    await prisma.usuario.deleteMany();

    //  Crea un usuario base
    usuario = new Usuario({
      email: 'test@usuario.com',
      password: 'password123',
      nombre: 'Test Usuario',
      apellidos: 'Usuario',
      telefono: '1234567890',
    });
    usuario = await usuarioRepo.create(usuario);

    //  Crea un organizador base global
    const organizador = new Organizador({
      nombre: 'Test Organizador Base',
      contacto: 'base@organizador.com',
      pais: 'México',
      fundacion: new Date('2000-01-01'),
      usuarioId: usuario.id!,
    });
    organizadorGlobal = await organizadorRepo.create(organizador);
  });

  afterAll(async () => {
    //  Limpieza global al terminar todas las pruebas
    await prisma.organizador.deleteMany();
    await prisma.usuario.deleteMany();

    await prisma.$disconnect();
  });

  it('debería crear un nuevo organizador', async () => {
    const usuario = new Usuario({
      email: `test_${Date.now()}@usuario.com`,
      password: 'password123',
      nombre: 'Test Usuario',
      apellidos: 'Usuario',
      telefono: '1234567890',
    });
    const usuarioCreado = await usuarioRepo.create(usuario);

    const organizador = new Organizador({
      nombre: `Test Organizador ${Date.now()}`,
      contacto: `test_${Date.now()}@organizador.com`,
      pais: 'México',
      fundacion: new Date('2000-01-01'),
      usuarioId: usuarioCreado.id!,
    });

    const creado = await organizadorRepo.create(organizador);
    expect(creado.id).toBeDefined();
    expect(creado.nombre).toBe(organizador.nombre);
  });

  it('debería encontrar un organizador por ID', async () => {
    const encontrado = await organizadorRepo.findById(organizadorGlobal.id!);
    expect(encontrado).not.toBeNull();
    expect(encontrado!.id).toBe(organizadorGlobal.id);
    expect(encontrado!.nombre).toBe(organizadorGlobal.nombre);
  });

  it('debería actualizar un organizador', async () => {
    const nuevoNombre = `Organizador Actualizado ${Date.now()}`;
    organizadorGlobal.nombre = nuevoNombre;

    const actualizado = await organizadorRepo.update(organizadorGlobal);
    expect(actualizado).not.toBeNull();
    expect(actualizado!.nombre).toBe(nuevoNombre);
  });

  it('debería eliminar un organizador', async () => {
    // Crea un usuario temporal
    const usuarioTemp = new Usuario({
      email: `temp_${Date.now()}@usuario.com`,
      password: 'password123',
      nombre: 'Temp Usuario',
      apellidos: 'Usuario',
      telefono: '1234567890',
    });
    const usuarioCreado = await usuarioRepo.create(usuarioTemp);

    //  Crea organizador temporal asociado a ese usuario
    const organizadorTemp = await organizadorRepo.create(
      new Organizador({
        nombre: `Temp ${Date.now()}`,
        contacto: `temp_${Date.now()}@organizador.com`,
        pais: 'México',
        fundacion: new Date('2000-01-01'),
        usuarioId: usuarioCreado.id!,
      })
    );

    //  Elimina el organizador
    const eliminado = await organizadorRepo.delete(organizadorTemp.id!);
    expect(eliminado).toBe(true);
  });
});


