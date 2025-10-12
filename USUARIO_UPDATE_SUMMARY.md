# Resumen de Actualización - Modelo Usuario

## ✅ Cambios Completados

### 1. Enums Creados
- ✅ Archivo `src/types/enums.ts` con todos los enums necesarios:
  - `Role`: USER, ARTISTA, ORGANIZADOR, ADMIN
  - `TipoBoleto`: VIP, GENERAL, PLATINO, ORO
  - `EstadoOrden`: PENDIENTE, PAGADO, CANCELADO, REEMBOLSADO
  - `RolArtista`: HEADLINER, TELONERO, INVITADO, COLABORADOR

### 2. Modelo Usuario Actualizado

#### Interfaz `IUsuario`
```typescript
export interface IUsuario {
  id?: number;
  email: string;
  password: string;        // ✅ NUEVO - Requerido
  nombre: string;
  apellidos: string;
  telefono: string;
  fechaRegistro?: Date | string;
  rol?: Role;              // ✅ NUEVO - Opcional (default: USER)
}
```

#### Clase `Usuario`
**Propiedades privadas añadidas:**
- ✅ `_password: string`
- ✅ `_rol: Role`

**Getters añadidos:**
- ✅ `get password(): string`
- ✅ `get rol(): Role`

**Setters añadidos:**
- ✅ `set password(value: string)` - Con validación mínimo 6 caracteres
- ✅ `set rol(value: Role)`

**Validaciones añadidas:**
- ✅ `validarPassword(password: string)` - Mínimo 6 caracteres

**Métodos de negocio añadidos:**
- ✅ `esAdmin(): boolean` - Verifica si es admin
- ✅ `esArtista(): boolean` - Verifica si es artista
- ✅ `esOrganizador(): boolean` - Verifica si es organizador
- ✅ `esUsuarioNormal(): boolean` - Verifica si es usuario normal
- ✅ `getRolFormateado(): string` - Retorna el rol en español

**Métodos actualizados:**
- ✅ `constructor()` - Inicializa `password` y `rol` (default: USER)
- ✅ `validar()` - Valida password
- ✅ `toJSON()` - Incluye `password` y `rol`
- ✅ `fromDatabase()` - Mapea `password` y `rol`

### 3. Repositorio Usuario Actualizado

#### `UsuarioRepository`
**Métodos actualizados:**
- ✅ `save()` - Guarda `password` y `rol`
- ✅ `update()` - Actualiza `password` y `rol` si se proveen

**Métodos nuevos:**
- ✅ `findByRol(rol: Role): Promise<Usuario[]>` - Busca usuarios por rol

### 4. Interfaz IUserRepository Actualizada
- ✅ Import de `Role` enum
- ✅ Método `findByRol(rol: Role): Promise<Usuario[]>`

---

## 🔍 Ejemplos de Uso

### Crear usuario con rol
```typescript
const usuario = new Usuario({
  email: 'artista@example.com',
  password: 'password123',
  nombre: 'Juan',
  apellidos: 'Pérez',
  telefono: '1234567890',
  rol: Role.ARTISTA
});

console.log(usuario.esArtista()); // true
console.log(usuario.getRolFormateado()); // "Artista"
```

### Buscar usuarios por rol
```typescript
const repository = new UsuarioRepository();

// Obtener todos los artistas
const artistas = await repository.findByRol(Role.ARTISTA);

// Obtener todos los administradores
const admins = await repository.findByRol(Role.ADMIN);
```

### Actualizar rol de usuario
```typescript
const repository = new UsuarioRepository();

await repository.update(userId, {
  rol: Role.ORGANIZADOR
});
```

---

## 📋 Próximos Pasos

Según el [MIGRATION_PLAN.md](MIGRATION_PLAN.md), los siguientes modelos a actualizar son:

1. **Organizador** - Crear modelo nuevo
2. **Artista** - Añadir `usuarioId` opcional
3. **Boleto** - Cambiar `tipo` a enum `TipoBoleto`
4. **Orden** - Cambiar `estado` a enum `EstadoOrden`
5. **Evento** - Añadir `organizadorId` requerido
6. **ArtistaEvento** - Cambiar `rol` a enum `RolArtista`

---

## ⚠️ Notas Importantes

### Migración de Base de Datos
Antes de usar estos cambios en producción, asegúrate de:
1. Resolver el problema de migración de Prisma (ver [MIGRATION_FIX_STEPS.md](MIGRATION_FIX_STEPS.md))
2. Los usuarios existentes necesitarán valores por defecto para `password` y `rol`
3. Considera implementar un sistema de hashing de contraseñas (bcrypt, argon2, etc.)

### Seguridad
⚠️ **IMPORTANTE**: La contraseña se está almacenando y retornando en texto plano.

**Se recomienda:**
- Implementar hashing de contraseñas con bcrypt o argon2
- No incluir la contraseña en `toJSON()` cuando se envíe al cliente
- Crear un método separado como `toPublicJSON()` que excluya información sensible
- Crear un método `comparePassword(plainPassword: string)` para verificar contraseñas

---

## ✅ Verificación

No se encontraron errores de TypeScript:
```bash
npx tsc --noEmit --project tsconfig.json
# ✅ Sin errores en Usuario.ts
# ✅ Sin errores en userRepository.ts
# ✅ Sin errores en IUserRepository.ts
```
