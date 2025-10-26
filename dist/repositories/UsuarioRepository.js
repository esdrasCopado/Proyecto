"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const Usuario_1 = require("../models/Usuario");
const database_1 = __importDefault(require("../config/database"));
class UsuarioRepository {
    async create(usuario) {
        try {
            const existe = await database_1.default.usuario.findFirst({
                where: { email: usuario.email }
            });
            if (existe) {
                throw new Error(`El email ${usuario.email} ya está registrado`);
            }
            const usuarioCreado = await database_1.default.usuario.create({
                data: {
                    email: usuario.email,
                    password: usuario.password,
                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    telefono: usuario.telefono,
                    fechaRegistro: usuario.fechaRegistro,
                    rol: usuario.rol,
                }
            });
            return Usuario_1.Usuario.fromDatabase(usuarioCreado);
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new Error('El email ya está registrado');
            }
            throw new Error(`Error al guardar usuario: ${error.message}`);
        }
    }
    async findMany() {
        try {
            const usuarios = await database_1.default.usuario.findMany({
                orderBy: {
                    fechaRegistro: 'desc'
                }
            });
            return usuarios.map(u => Usuario_1.Usuario.fromDatabase(u));
        }
        catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const usuario = await database_1.default.usuario.findUnique({
                where: { id }
            });
            if (!usuario) {
                return null;
            }
            return Usuario_1.Usuario.fromDatabase(usuario);
        }
        catch (error) {
            throw new Error(`Error al buscar usuario por ID: ${error.message}`);
        }
    }
    async update(id, usuario) {
        try {
            return await database_1.default.$transaction(async (tx) => {
                // Verificar que el usuario existe
                const existe = await tx.usuario.findUnique({
                    where: { id }
                });
                if (!existe) {
                    throw new Error(`Usuario con ID ${id} no encontrado`);
                }
                // Si se actualiza el email, verificar que no esté en uso
                if (usuario.email && usuario.email !== existe.email) {
                    const emailEnUso = await tx.usuario.findFirst({
                        where: {
                            email: usuario.email,
                            id: { not: id }
                        }
                    });
                    if (emailEnUso) {
                        throw new Error(`El email ${usuario.email} ya está en uso`);
                    }
                }
                // Filtrar campos undefined para evitar sobrescribir con undefined
                const updateData = {};
                if (usuario.email !== undefined)
                    updateData.email = usuario.email;
                if (usuario.password !== undefined)
                    updateData.password = usuario.password;
                if (usuario.nombre !== undefined)
                    updateData.nombre = usuario.nombre;
                if (usuario.apellidos !== undefined)
                    updateData.apellidos = usuario.apellidos;
                if (usuario.telefono !== undefined)
                    updateData.telefono = usuario.telefono;
                if (usuario.rol !== undefined)
                    updateData.rol = usuario.rol;
                // Actualizar usuario solo si hay campos para actualizar
                if (Object.keys(updateData).length === 0) {
                    return Usuario_1.Usuario.fromDatabase(existe);
                }
                const usuarioActualizado = await tx.usuario.update({
                    where: { id },
                    data: updateData
                });
                return Usuario_1.Usuario.fromDatabase(usuarioActualizado);
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new Error(`Usuario con ID ${id} no encontrado`);
            }
            if (error.code === 'P2002') {
                throw new Error('El email ya está en uso');
            }
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            // Verificar que el usuario existe
            const existe = await database_1.default.usuario.findUnique({
                where: { id },
                include: {
                    boletos: true,
                    ordenes: true,
                }
            });
            if (!existe) {
                throw new Error(`Usuario con ID ${id} no encontrado`);
            }
            // Verificar si tiene boletos u órdenes asociadas
            if (existe.boletos.length > 0 || existe.ordenes.length > 0) {
                throw new Error('No se puede eliminar un usuario con boletos u órdenes asociadas');
            }
            // Eliminar usuario
            await database_1.default.usuario.delete({
                where: { id }
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new Error(`Usuario con ID ${id} no encontrado`);
            }
            if (error.code === 'P2003') {
                throw new Error('No se puede eliminar el usuario debido a relaciones existentes');
            }
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }
    async findByEmail(email) {
        try {
            const usuario = await database_1.default.usuario.findFirst({
                where: { email },
                include: {
                    artista: true,
                    organizador: true
                }
            });
            if (!usuario) {
                return null;
            }
            return Usuario_1.Usuario.fromDatabase(usuario);
        }
        catch (error) {
            throw new Error(`Error al buscar usuario por email: ${error.message}`);
        }
    }
    async findByNombre(nombre) {
        try {
            const usuarios = await database_1.default.usuario.findMany({
                where: {
                    OR: [
                        { nombre: { contains: nombre } },
                        { apellidos: { contains: nombre } }
                    ],
                },
                orderBy: {
                    nombre: 'asc'
                },
            });
            return usuarios.map(u => Usuario_1.Usuario.fromDatabase(u));
        }
        catch (error) {
            throw new Error(`Error al buscar usuarios por nombre: ${error.message}`);
        }
    }
    async findByRangoFecha(fechaInicio, fechaFin) {
        try {
            const usuarios = await database_1.default.usuario.findMany({
                where: {
                    fechaRegistro: {
                        gte: fechaInicio,
                        lte: fechaFin
                    }
                },
                orderBy: {
                    fechaRegistro: 'desc'
                }
            });
            return usuarios.map(u => Usuario_1.Usuario.fromDatabase(u));
        }
        catch (error) {
            throw new Error(`Error al buscar usuarios por rango de fecha: ${error.message}`);
        }
    }
    async findWithPaginatio(page, pageSize) {
        try {
            const skip = (page - 1) * pageSize;
            const usuarios = await database_1.default.usuario.findMany({
                skip,
                take: pageSize,
                orderBy: {
                    fechaRegistro: 'desc'
                }
            });
            return usuarios.map(u => Usuario_1.Usuario.fromDatabase(u));
        }
        catch (error) {
            throw new Error(`Error al obtener usuarios con paginación: ${error.message}`);
        }
    }
    async count() {
        try {
            return await database_1.default.usuario.count();
        }
        catch (error) {
            throw new Error(`Error al contar usuarios: ${error.message}`);
        }
    }
    async emailExists(email) {
        try {
            const usuario = await database_1.default.usuario.findFirst({
                where: { email }
            });
            return usuario !== null;
        }
        catch (error) {
            throw new Error(`Error al verificar email: ${error.message}`);
        }
    }
    async findByRol(rol) {
        try {
            const usuarios = await database_1.default.usuario.findMany({
                where: { rol },
                orderBy: {
                    fechaRegistro: 'desc'
                }
            });
            return usuarios.map(u => Usuario_1.Usuario.fromDatabase(u));
        }
        catch (error) {
            throw new Error(`Error al buscar usuarios por rol: ${error.message}`);
        }
    }
}
exports.UsuarioRepository = UsuarioRepository;
//# sourceMappingURL=UsuarioRepository.js.map