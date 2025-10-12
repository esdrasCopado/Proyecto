# Resumen de Actualización - Modelo ArtistaEvento y Repositorio

## ✅ Cambios Completados

### 1. Modelo ArtistaEvento Actualizado

#### **Interfaz `IArtistaEvento` - Cambio de tipo**

**Antes:**
```typescript
export interface IArtistaEvento {
  // ...
  rol?: string;  // ❌ String genérico
}
```

**Ahora:**
```typescript
import { RolArtista } from '../types/enums';

export interface IArtistaEvento {
  // ...
  rol?: RolArtista;  // ✅ Enum tipado
}
```

#### **Clase ArtistaEvento - Cambios Realizados**

**Propiedad privada actualizada:**
```typescript
private _rol: RolArtista;  // Era: string
```

**Constructor actualizado:**
```typescript
constructor(data: IArtistaEvento) {
  // ...
  this._rol = data.rol || RolArtista.INVITADO;  // Default: INVITADO
}
```

**Getter y Setter actualizados:**
```typescript
get rol(): RolArtista {
  return this._rol;
}

set rol(value: RolArtista) {
  this._rol = value;
}
```

### 2. Métodos de Negocio Mejorados

#### **Métodos anteriores eliminados:**
- ❌ `esArtistaPrincipal()` - Buscaba "principal" en string
- ✅ Reemplazado por métodos específicos del enum

#### **Nuevos métodos específicos por rol:**

**`esHeadliner(): boolean`**
```typescript
artistaEvento.esHeadliner()  // true si rol === HEADLINER
```

**`esTelonero(): boolean`**
```typescript
artistaEvento.esTelonero()  // true si rol === TELONERO
```

**`esInvitado(): boolean`**
```typescript
artistaEvento.esInvitado()  // true si rol === INVITADO
```

**`esColaborador(): boolean`**
```typescript
artistaEvento.esColaborador()  // true si rol === COLABORADOR
```

**`getRolFormateado(): string`**
```typescript
artistaEvento.getRolFormateado()  // "Headliner", "Telonero", etc.
```

### 3. Validaciones Simplificadas

**Método `validarRol()` eliminado** - Ya no es necesario validar strings

**Antes:**
```typescript
private static validarRol(rol: string): boolean {
  if (!rol || rol.trim().length === 0) return false;
  if (rol.length > 100) return false;
  return true;
}
```

**Ahora:**
El enum TypeScript garantiza que solo valores válidos sean asignados.

### 4. Repositorio ArtistaEventoRepository Actualizado

#### **Imports agregados:**
```typescript
import { RolArtista } from "../types/enums";
```

#### **Nuevos métodos agregados:**

**`findByRol(rol: RolArtista): Promise<ArtistaEvento[]>`**
Busca todas las participaciones con un rol específico.

```typescript
const headliners = await repository.findByRol(RolArtista.HEADLINER);
const teloneros = await repository.findByRol(RolArtista.TELONERO);
```

**`findHeadliners(): Promise<ArtistaEvento[]>`**
Atajo para buscar solo headliners.

```typescript
const headliners = await repository.findHeadliners();
```

**`findByEventoIdAndRol(eventoId: number, rol: RolArtista): Promise<ArtistaEvento[]>`**
Busca participaciones por evento y rol específico.

```typescript
// Obtener headliners de un evento específico
const headliners = await repository.findByEventoIdAndRol(
  eventoId,
  RolArtista.HEADLINER
);

// Obtener teloneros de un evento
const teloneros = await repository.findByEventoIdAndRol(
  eventoId,
  RolArtista.TELONERO
);
```

### 5. Interfaz IArtistaEventoRepository Actualizada

```typescript
import { RolArtista } from '../types/enums';

export interface IArtistaEventoRepository {
  // ... métodos existentes
  findByRol(rol: RolArtista): Promise<ArtistaEvento[]>;
  findHeadliners(): Promise<ArtistaEvento[]>;
  findByEventoIdAndRol(eventoId: number, rol: RolArtista): Promise<ArtistaEvento[]>;
}
```

---

## 📊 Ejemplos de Uso

### Crear participación con rol específico

```typescript
import { ArtistaEvento } from './models/ArtistaEvento';
import { RolArtista } from './types/enums';

// Headliner (artista principal)
const headliner = new ArtistaEvento({
  artistaId: 1,
  eventoId: 5,
  rol: RolArtista.HEADLINER,
  compensacion: 50000,
  fechaConfirmacion: new Date()
});

// Telonero (acto de apertura)
const telonero = new ArtistaEvento({
  artistaId: 2,
  eventoId: 5,
  rol: RolArtista.TELONERO,
  compensacion: 15000
});

// Default: INVITADO
const invitado = new ArtistaEvento({
  artistaId: 3,
  eventoId: 5,
  compensacion: 10000
  // rol se establece automáticamente como INVITADO
});
```

### Verificar roles

```typescript
console.log(headliner.esHeadliner());      // true
console.log(headliner.getRolFormateado()); // "Headliner"

console.log(telonero.esTelonero());        // true
console.log(telonero.getRolFormateado());  // "Telonero"

console.log(invitado.esInvitado());        // true
```

### Buscar por rol

```typescript
const repository = new ArtistaEventoRepository();

// Buscar todos los headliners del sistema
const headliners = await repository.findHeadliners();

// Buscar todos los teloneros
const teloneros = await repository.findByRol(RolArtista.TELONERO);

// Buscar headliners de un evento específico
const eventoHeadliners = await repository.findByEventoIdAndRol(
  eventoId,
  RolArtista.HEADLINER
);

// Buscar todas las participaciones de un evento
const todasParticipaciones = await repository.findByEventoId(eventoId);

// Filtrar por rol manualmente
const colaboradores = todasParticipaciones.filter(p => p.esColaborador());
```

### Actualizar rol de participación

```typescript
const participacion = await repository.findById(1);

if (participacion) {
  // Promover telonero a headliner
  participacion.rol = RolArtista.HEADLINER;
  await repository.update(participacion);
}
```

---

## 🎯 Ventajas del Enum

### 1. **Type Safety**
```typescript
// ✅ TypeScript valida en tiempo de compilación
artistaEvento.rol = RolArtista.HEADLINER;  // OK

// ❌ Error de TypeScript
artistaEvento.rol = "headliner";  // Error: Type '"headliner"' is not assignable
artistaEvento.rol = "Principal";  // Error
```

### 2. **Autocompletado en IDE**
El IDE sugiere automáticamente:
- `RolArtista.HEADLINER`
- `RolArtista.TELONERO`
- `RolArtista.INVITADO`
- `RolArtista.COLABORADOR`

### 3. **Refactoring Seguro**
Si cambias un valor del enum, TypeScript te avisará en todos los lugares donde se usa.

### 4. **Consistencia Garantizada**
No hay riesgo de typos:
- ❌ Antes: `"Headliner"`, `"headliner"`, `"HEADLINER"`, `"Artista Principal"`
- ✅ Ahora: Solo `RolArtista.HEADLINER`

### 5. **Documentación Clara**
```typescript
// Valores posibles están claramente definidos
enum RolArtista {
  HEADLINER,     // Artista principal
  TELONERO,      // Acto de apertura
  INVITADO,      // Artista invitado
  COLABORADOR    // Colaborador especial
}
```

---

## 🔄 Migración de Datos

### Mapeo de valores antiguos a enum

Si tienes datos existentes con strings, necesitarás mapearlos:

```typescript
// Script de migración
const mapeoRoles: Record<string, RolArtista> = {
  'Artista Principal': RolArtista.HEADLINER,
  'Principal': RolArtista.HEADLINER,
  'Headliner': RolArtista.HEADLINER,
  'Telonero': RolArtista.TELONERO,
  'Apertura': RolArtista.TELONERO,
  'Invitado': RolArtista.INVITADO,
  'Colaborador': RolArtista.COLABORADOR,
};

// Convertir string antiguo a enum
function convertirRolString(rolString: string): RolArtista {
  return mapeoRoles[rolString] || RolArtista.INVITADO;
}
```

---

## ✅ Verificación

### TypeScript
```bash
npx tsc --noEmit
# ✅ Sin errores en ArtistaEvento.ts ni artistaEventoRepository.ts
```

### Tests Sugeridos

```typescript
describe('ArtistaEvento - Rol Enum', () => {
  test('debe crear con rol por defecto INVITADO', () => {
    const ae = new ArtistaEvento({
      artistaId: 1,
      eventoId: 1,
      compensacion: 5000
    });
    expect(ae.rol).toBe(RolArtista.INVITADO);
    expect(ae.esInvitado()).toBe(true);
  });

  test('debe crear con rol HEADLINER', () => {
    const ae = new ArtistaEvento({
      artistaId: 1,
      eventoId: 1,
      rol: RolArtista.HEADLINER,
      compensacion: 50000
    });
    expect(ae.esHeadliner()).toBe(true);
    expect(ae.getRolFormateado()).toBe('Headliner');
  });

  test('debe actualizar rol correctamente', () => {
    const ae = new ArtistaEvento({
      artistaId: 1,
      eventoId: 1,
      rol: RolArtista.TELONERO,
      compensacion: 15000
    });
    ae.rol = RolArtista.HEADLINER;
    expect(ae.esHeadliner()).toBe(true);
  });
});

describe('ArtistaEventoRepository - findByRol', () => {
  test('debe buscar por rol HEADLINER', async () => {
    const headliners = await repository.findByRol(RolArtista.HEADLINER);
    expect(Array.isArray(headliners)).toBe(true);
    headliners.forEach(h => {
      expect(h.esHeadliner()).toBe(true);
    });
  });

  test('debe buscar headliners con método específico', async () => {
    const headliners = await repository.findHeadliners();
    expect(Array.isArray(headliners)).toBe(true);
  });
});
```

---

## 📝 Archivos Actualizados

1. ✅ [src/models/ArtistaEvento.ts](src/models/ArtistaEvento.ts)
   - Interface actualizada con enum `RolArtista`
   - Constructor con default `INVITADO`
   - 4 métodos nuevos: `esHeadliner()`, `esTelonero()`, `esInvitado()`, `esColaborador()`
   - 1 método nuevo: `getRolFormateado()`
   - Validación de rol eliminada (ya no necesaria)

2. ✅ [src/repositories/artistaEventoRepository.ts](src/repositories/artistaEventoRepository.ts)
   - Import de `RolArtista`
   - 3 métodos nuevos: `findByRol()`, `findHeadliners()`, `findByEventoIdAndRol()`

3. ✅ [src/interfaces/IArtista-EventoRepository.ts](src/interfaces/IArtista-EventoRepository.ts)
   - Interface actualizada con 3 métodos nuevos

---

## 🎯 Resumen de Estado del Proyecto

### Modelos Actualizados:
- ✅ Usuario (password, rol)
- ✅ Artista (usuarioId)
- ✅ Boleto (tipo enum, ordenId)
- ✅ ArtistaEvento (rol enum)

### Modelos Pendientes:
- ⏳ Organizador (crear nuevo)
- ⏳ Evento (organizadorId)
- ⏳ Orden (estado enum, relación directa con boletos)

### Schema:
- ✅ Simplificado (eliminados Item y OrdenDetalle)
- ✅ Enums definidos
- ⏳ Pendiente: Aplicar migración
