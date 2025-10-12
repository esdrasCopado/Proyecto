# Resumen de Actualización - Modelo Artista

## ✅ Cambios Completados

### 1. Interfaz `IArtistaData` - Campo Agregado

```typescript
export interface IArtistaData {
  id?: number;
  nombre: string;
  genero: string;
  contacto: string;
  paisOrigen: string;
  fechaDebut: Date;
  disquera?: string | null;
  usuarioId?: number | null;  // ✅ NUEVO - Opcional
}
```

### 2. Clase `Artista` - Cambios Realizados

#### **Propiedad privada añadida:**
```typescript
private _usuarioId?: number | null;
```

#### **Constructor actualizado:**
```typescript
constructor(data: IArtistaData) {
  // ... campos existentes
  this._usuarioId = data.usuarioId;  // ✅ NUEVO
  this.validar();
}
```

#### **Getter añadido:**
```typescript
get usuarioId(): number | null | undefined {
  return this._usuarioId;
}
```

#### **Setter añadido con validación:**
```typescript
set usuarioId(value: number | null | undefined) {
  if (value !== null && value !== undefined) {
    if (typeof value !== 'number' || value <= 0 || !Number.isInteger(value)) {
      throw new Error('El ID de usuario debe ser un número entero positivo');
    }
  }
  this._usuarioId = value;
}
```

### 3. Validaciones Actualizadas

El método `validar()` ahora incluye validación de `usuarioId`:

```typescript
// Validar Usuario ID (si existe)
if (this._usuarioId !== null && this._usuarioId !== undefined) {
    if (typeof this._usuarioId !== 'number' || this._usuarioId <= 0 || !Number.isInteger(this._usuarioId)) {
        throw new Error('El ID de usuario es inválido.');
    }
}
```

### 4. Métodos de Negocio Agregados

#### **`tieneUsuarioAsociado(): boolean`**
Verifica si el artista tiene un usuario asociado.

```typescript
const artista = new Artista({ /* ... */ });
console.log(artista.tieneUsuarioAsociado()); // false

artista.usuarioId = 123;
console.log(artista.tieneUsuarioAsociado()); // true
```

#### **`asociarUsuario(usuarioId: number): void`**
Asocia el artista a un usuario con validación.

```typescript
artista.asociarUsuario(123);
console.log(artista.usuarioId); // 123
```

#### **`desasociarUsuario(): void`**
Desasocia el artista del usuario.

```typescript
artista.desasociarUsuario();
console.log(artista.usuarioId); // null
console.log(artista.tieneUsuarioAsociado()); // false
```

#### **`estaAsociadoAUsuario(usuarioId: number): boolean`**
Verifica si está asociado a un usuario específico.

```typescript
artista.usuarioId = 123;
console.log(artista.estaAsociadoAUsuario(123)); // true
console.log(artista.estaAsociadoAUsuario(456)); // false
```

### 5. Métodos de Conversión Actualizados

#### **`toJSON()` actualizado:**
```typescript
public toJSON(): IArtistaData {
  return {
    id: this._id,
    nombre: this._nombre,
    genero: this._genero,
    contacto: this._contacto,
    paisOrigen: this._paisOrigen,
    fechaDebut: this._fechaDebut,
    disquera: this._disquera,
    usuarioId: this._usuarioId,  // ✅ INCLUIDO
  };
}
```

#### **`fromDatabase()` actualizado:**
```typescript
public static fromDatabase(data: any): Artista {
  return new Artista({
    id: data.id,
    nombre: data.nombre,
    genero: data.genero,
    contacto: data.contacto,
    paisOrigen: data.paisOrigen,
    fechaDebut: data.fechaDebut,
    disquera: data.disquera,
    usuarioId: data.usuarioId || data.usuario_id,  // ✅ Soporta ambos formatos
  });
}
```

---

## 📊 Relación con Usuario

### Diagrama de Relación

```
Usuario (1) ───< (0..1) Artista
```

- Un **Usuario** puede tener **0 o 1** perfil de Artista
- Un **Artista** puede estar asociado a **0 o 1** Usuario
- La relación es **opcional** (usuarioId puede ser null)

### Casos de Uso

#### **1. Artista sin usuario (registro independiente)**
```typescript
const artista = new Artista({
  nombre: 'Juan Pérez',
  genero: 'Rock',
  contacto: 'juan@example.com',
  paisOrigen: 'México',
  fechaDebut: new Date('2020-01-01'),
  usuarioId: null  // Sin usuario asociado
});
```

#### **2. Artista con usuario (usuario del sistema)**
```typescript
const artista = new Artista({
  nombre: 'María López',
  genero: 'Pop',
  contacto: 'maria@example.com',
  paisOrigen: 'España',
  fechaDebut: new Date('2019-05-15'),
  usuarioId: 123  // Asociado al usuario con ID 123
});
```

#### **3. Asociar usuario después de crear artista**
```typescript
const artista = new Artista({ /* ... */ });

// Más tarde, cuando el artista se registra como usuario
artista.asociarUsuario(456);

// El artista ahora tiene acceso al sistema como usuario
```

---

## 🔄 Flujo de Integración con Usuario

### Escenario 1: Usuario se convierte en Artista

1. Usuario se registra en el sistema (rol: USER)
2. Usuario solicita ser artista
3. Se crea perfil de Artista con `usuarioId`
4. Se actualiza rol del usuario a ARTISTA

```typescript
// 1. Usuario existente
const usuario = await usuarioRepo.findById(123);

// 2. Crear perfil de artista asociado
const artista = new Artista({
  nombre: usuario.nombre + ' ' + usuario.apellidos,
  genero: 'Rock',
  contacto: usuario.email,
  paisOrigen: 'México',
  fechaDebut: new Date(),
  usuarioId: usuario.id
});

// 3. Guardar artista
await artistaRepo.save(artista);

// 4. Actualizar rol del usuario
await usuarioRepo.update(usuario.id!, { rol: Role.ARTISTA });
```

### Escenario 2: Artista registrado sin usuario

1. Artista se registra directamente (sin usuarioId)
2. Más tarde puede crear cuenta de usuario
3. Se vincula el artista al usuario

```typescript
// 1. Artista sin usuario
const artista = new Artista({
  nombre: 'Carlos Músico',
  genero: 'Jazz',
  contacto: 'carlos@example.com',
  paisOrigen: 'Argentina',
  fechaDebut: new Date('2018-03-20'),
  usuarioId: null
});
await artistaRepo.save(artista);

// 2. Más tarde, el artista crea cuenta
const usuario = new Usuario({
  email: 'carlos@example.com',
  password: 'password123',
  nombre: 'Carlos',
  apellidos: 'Músico',
  telefono: '1234567890',
  rol: Role.ARTISTA
});
await usuarioRepo.save(usuario);

// 3. Vincular artista con usuario
artista.asociarUsuario(usuario.id!);
await artistaRepo.update(artista.id!, artista);
```

---

## ✅ Verificación

### TypeScript
```bash
npx tsc --noEmit
# ✅ Sin errores en Artista.ts
```

### Tests Unitarios Sugeridos

```typescript
describe('Artista - Usuario Relationship', () => {
  test('debe crear artista sin usuario', () => {
    const artista = new Artista({
      nombre: 'Test',
      genero: 'Rock',
      contacto: 'test@test.com',
      paisOrigen: 'México',
      fechaDebut: new Date(),
      usuarioId: null
    });
    expect(artista.tieneUsuarioAsociado()).toBe(false);
  });

  test('debe crear artista con usuario', () => {
    const artista = new Artista({
      nombre: 'Test',
      genero: 'Rock',
      contacto: 'test@test.com',
      paisOrigen: 'México',
      fechaDebut: new Date(),
      usuarioId: 123
    });
    expect(artista.tieneUsuarioAsociado()).toBe(true);
    expect(artista.estaAsociadoAUsuario(123)).toBe(true);
  });

  test('debe asociar usuario correctamente', () => {
    const artista = new Artista({
      nombre: 'Test',
      genero: 'Rock',
      contacto: 'test@test.com',
      paisOrigen: 'México',
      fechaDebut: new Date()
    });
    artista.asociarUsuario(456);
    expect(artista.usuarioId).toBe(456);
  });

  test('debe desasociar usuario', () => {
    const artista = new Artista({
      nombre: 'Test',
      genero: 'Rock',
      contacto: 'test@test.com',
      paisOrigen: 'México',
      fechaDebut: new Date(),
      usuarioId: 123
    });
    artista.desasociarUsuario();
    expect(artista.tieneUsuarioAsociado()).toBe(false);
  });

  test('debe rechazar ID de usuario inválido', () => {
    const artista = new Artista({
      nombre: 'Test',
      genero: 'Rock',
      contacto: 'test@test.com',
      paisOrigen: 'México',
      fechaDebut: new Date()
    });
    expect(() => artista.asociarUsuario(-1)).toThrow();
    expect(() => artista.asociarUsuario(0)).toThrow();
    expect(() => artista.asociarUsuario(1.5)).toThrow();
  });
});
```

---

## 📝 Próximos Pasos

1. ✅ Modelo Artista actualizado
2. ⏳ Actualizar ArtistaRepository para manejar usuarioId
3. ⏳ Crear modelo Organizador (similar a Artista)
4. ⏳ Actualizar modelo Orden con enum EstadoOrden
5. ⏳ Actualizar modelo ArtistaEvento con enum RolArtista

---

## 🎯 Resumen de Archivos Modificados

- ✅ [src/models/Artista.ts](src/models/Artista.ts)
  - Interfaz actualizada con `usuarioId`
  - Getter/setter con validación
  - 4 métodos de negocio nuevos
  - Validación actualizada
  - toJSON() y fromDatabase() actualizados
