# Resumen de Actualización - Modelo Evento y Repositorio

## ✅ Cambios Completados

### 1. Modelo Evento Actualizado

#### **Interfaz `IEvento` - Campo Obligatorio Agregado**

**Antes:**
```typescript
export interface IEvento {
    id?: number;
    nombre?: string;      // Opcional
    descripcion?: string;
    fecha?: Date;         // Opcional
    ubicacion?: string;   // Opcional
}
```

**Ahora:**
```typescript
export interface IEvento {
    id?: number;
    nombre: string;          // ✅ Requerido
    descripcion?: string;
    fecha: Date;             // ✅ Requerido
    ubicacion: string;       // ✅ Requerido
    organizadorId: number;   // ✅ NUEVO - Requerido
}
```

#### **Clase Evento - Cambios Realizados**

**Propiedad privada agregada:**
```typescript
private _organizadorId: number;
```

**Constructor actualizado:**
```typescript
constructor(data: IEvento) {
    // ... campos existentes
    this._organizadorId = data.organizadorId;
    this.validar();
}
```

**Getter y Setter agregados:**
```typescript
get organizadorId(): number {
    return this._organizadorId;
}

set organizadorId(value: number) {
    if (!Evento.validarId(value)) {
        throw new Error('ID de organizador inválido');
    }
    this._organizadorId = value;
}
```

**Método de validación agregado:**
```typescript
private static validarId(id: number): boolean {
    return typeof id === 'number' && id > 0 && Number.isInteger(id);
}
```

**Método `toJSON()` agregado:**
```typescript
public toJSON(): IEvento {
    return {
        id: this._id,
        nombre: this._nombre,
        descripcion: this._descripcion,
        fecha: this._fecha,
        ubicacion: this._ubicacion,
        organizadorId: this._organizadorId
    };
}
```

**Método `fromDatabase()` actualizado:**
```typescript
public static fromDatabase(data: any): Evento {
    return new Evento({
        // ... campos existentes
        organizadorId: data.organizadorId || data.organizador_id
    });
}
```

---

### 2. Repositorio EventoRepository Actualizado

#### **Método `save()` actualizado**

```typescript
async save(evento: Evento): Promise<Evento> {
    try {
        const newEvento = await prisma.evento.create({
            data: {
                nombre: evento.nombre,
                descripcion: evento.descripcion,
                fecha: evento.fecha,
                ubicacion: evento.ubicacion,
                organizadorId: evento.organizadorId,  // ✅ NUEVO
            },
        });
        return Evento.fromDatabase(newEvento);
    } catch (error: any) {
        if (error.code === 'P2003') {
            throw new Error('Organizador no existe');  // ✅ Validación FK
        }
        throw new Error(`Error al guardar el evento: ${error.message}`);
    }
}
```

#### **Método `update()` actualizado**

```typescript
async update(evento: Evento): Promise<Evento> {
    try {
        const updatedEvento = await prisma.evento.update({
            where: { id: evento.id },
            data: {
                nombre: evento.nombre,
                descripcion: evento.descripcion,
                fecha: evento.fecha,
                ubicacion: evento.ubicacion,
                organizadorId: evento.organizadorId,  // ✅ Permite actualizar organizador
            },
        });
        return Evento.fromDatabase(updatedEvento);
    } catch (error: any) {
        if (error.code === 'P2003') {
            throw new Error('Organizador no existe');
        }
        if (error.code === 'P2025') {
            throw new Error('Evento no encontrado');
        }
        throw new Error(`Error al actualizar el evento: ${error.message}`);
    }
}
```

#### **Método `findMany()` mejorado**

```typescript
async findMany(): Promise<Evento[]> {
    try {
        const eventos = await prisma.evento.findMany({
            orderBy: {
                fecha: 'asc'  // ✅ Ordenado por fecha
            }
        });
        return eventos.map(Evento.fromDatabase);
    } catch (error) {
        throw new Error(`Error al buscar eventos: ${error}`);
    }
}
```

#### **Nuevos métodos agregados**

**1. `findByOrganizadorId(organizadorId: number)`**
Busca todos los eventos de un organizador específico.

```typescript
const eventos = await repository.findByOrganizadorId(organizadorId);
```

**2. `findByFechaRange(fechaInicio: Date, fechaFin: Date)`**
Busca eventos en un rango de fechas.

```typescript
const eventos = await repository.findByFechaRange(
    new Date('2025-01-01'),
    new Date('2025-12-31')
);
```

**3. `findProximos(limite?: number)`**
Busca eventos futuros (próximos eventos).

```typescript
// Todos los eventos futuros
const proximos = await repository.findProximos();

// Próximos 10 eventos
const proximos10 = await repository.findProximos(10);
```

**4. `findPasados(limite?: number)`**
Busca eventos pasados (ya realizados).

```typescript
// Todos los eventos pasados
const pasados = await repository.findPasados();

// Últimos 5 eventos pasados
const ultimos5 = await repository.findPasados(5);
```

**5. `count()`**
Cuenta el total de eventos.

```typescript
const totalEventos = await repository.count();
```

---

### 3. Interfaz IEventoRepository Actualizada

```typescript
export interface IEventoRepository {
    save(evento: Evento): Promise<Evento>;
    findById(id: number): Promise<Evento | null>;
    update(evento: Evento): Promise<Evento>;
    delete(id: number): Promise<void>;
    findMany(): Promise<Evento[]>;

    // ✅ Nuevos métodos
    findByOrganizadorId(organizadorId: number): Promise<Evento[]>;
    findByFechaRange(fechaInicio: Date, fechaFin: Date): Promise<Evento[]>;
    findProximos(limite?: number): Promise<Evento[]>;
    findPasados(limite?: number): Promise<Evento[]>;
    count(): Promise<number>;
}
```

---

## 📊 Ejemplos de Uso

### Crear evento con organizador

```typescript
const evento = new Evento({
    nombre: 'Festival de Rock 2025',
    descripcion: 'Gran festival de música rock',
    fecha: new Date('2025-06-15'),
    ubicacion: 'Estadio Nacional',
    organizadorId: 1  // ✅ Requerido
});

const eventoGuardado = await repository.save(evento);
```

### Buscar eventos de un organizador

```typescript
// Obtener todos los eventos de un organizador
const eventosOrganizador = await repository.findByOrganizadorId(1);

console.log(`El organizador tiene ${eventosOrganizador.length} eventos`);
```

### Buscar eventos próximos

```typescript
// Próximos 5 eventos
const proximos = await repository.findProximos(5);

proximos.forEach(evento => {
    console.log(`${evento.nombre} - ${evento.fecha.toLocaleDateString()}`);
});
```

### Buscar eventos por rango de fechas

```typescript
// Eventos del primer trimestre de 2025
const eventosQ1 = await repository.findByFechaRange(
    new Date('2025-01-01'),
    new Date('2025-03-31')
);
```

### Cambiar organizador de un evento

```typescript
const evento = await repository.findById(eventId);

if (evento) {
    evento.organizadorId = nuevoOrganizadorId;
    await repository.update(evento);
}
```

---

## 🔄 Relación con Organizador

### Diagrama de Relación

```
Organizador (1) ──< (N) Evento
```

- Un **Organizador** puede tener **muchos** Eventos
- Un **Evento** pertenece a **un** Organizador (requerido)
- La relación es **obligatoria** (organizadorId no puede ser null)

### Validación de Integridad Referencial

El repositorio maneja errores de clave foránea:

```typescript
try {
    await repository.save(evento);
} catch (error) {
    if (error.message === 'Organizador no existe') {
        // El organizadorId no existe en la base de datos
        console.error('Debe crear el organizador primero');
    }
}
```

---

## 🎯 Casos de Uso

### 1. Dashboard de Organizador

```typescript
// Obtener estadísticas de un organizador
const organizadorId = 1;

const eventosTotal = await repository.findByOrganizadorId(organizadorId);
const eventosFuturos = (await repository.findProximos())
    .filter(e => e.organizadorId === organizadorId);
const eventosPasados = (await repository.findPasados())
    .filter(e => e.organizadorId === organizadorId);

console.log(`Total: ${eventosTotal.length}`);
console.log(`Próximos: ${eventosFuturos.length}`);
console.log(`Pasados: ${eventosPasados.length}`);
```

### 2. Calendario de Eventos

```typescript
// Eventos del mes actual
const hoy = new Date();
const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

const eventosDelMes = await repository.findByFechaRange(inicioMes, finMes);
```

### 3. Página de Inicio

```typescript
// Mostrar próximos 3 eventos en homepage
const proximosEventos = await repository.findProximos(3);

proximosEventos.forEach(evento => {
    console.log(`
        ${evento.nombre}
        Fecha: ${evento.fecha.toLocaleDateString()}
        Lugar: ${evento.ubicacion}
    `);
});
```

---

## ⚠️ Cambios Breaking

### Impacto en Código Existente

1. **Interfaz IEvento cambió** - `organizadorId` es ahora requerido
   ```typescript
   // ❌ Esto ya NO funciona
   const evento = new Evento({
       nombre: 'Concierto',
       fecha: new Date(),
       ubicacion: 'Teatro'
   });

   // ✅ Ahora requiere organizadorId
   const evento = new Evento({
       nombre: 'Concierto',
       fecha: new Date(),
       ubicacion: 'Teatro',
       organizadorId: 1  // Requerido
   });
   ```

2. **Tests existentes necesitan actualización**
   - Todos los tests que crean eventos deben incluir `organizadorId`
   - Los mocks deben incluir el nuevo campo

3. **Migración de datos existentes**
   - Eventos existentes sin `organizadorId` necesitan ser actualizados
   - Se debe crear un organizador "por defecto" si es necesario

---

## ✅ Verificación

### TypeScript
```bash
npx tsc --noEmit
# ✅ Sin errores en Evento.ts ni eventoRepository.ts
```

### Tests Sugeridos

```typescript
describe('Evento - OrganizadorId', () => {
    test('debe crear evento con organizadorId', () => {
        const evento = new Evento({
            nombre: 'Festival',
            fecha: new Date('2025-06-15'),
            ubicacion: 'Estadio',
            organizadorId: 1
        });
        expect(evento.organizadorId).toBe(1);
    });

    test('debe rechazar organizadorId inválido', () => {
        expect(() => {
            new Evento({
                nombre: 'Festival',
                fecha: new Date(),
                ubicacion: 'Estadio',
                organizadorId: -1
            });
        }).toThrow('ID de organizador inválido');
    });
});

describe('EventoRepository - findByOrganizadorId', () => {
    test('debe buscar eventos de un organizador', async () => {
        const eventos = await repository.findByOrganizadorId(1);
        expect(Array.isArray(eventos)).toBe(true);
        eventos.forEach(e => {
            expect(e.organizadorId).toBe(1);
        });
    });
});

describe('EventoRepository - findProximos', () => {
    test('debe retornar solo eventos futuros', async () => {
        const proximos = await repository.findProximos();
        const ahora = new Date();
        proximos.forEach(e => {
            expect(e.fecha.getTime()).toBeGreaterThan(ahora.getTime());
        });
    });

    test('debe respetar el límite', async () => {
        const proximos = await repository.findProximos(5);
        expect(proximos.length).toBeLessThanOrEqual(5);
    });
});
```

---

## 📝 Archivos Actualizados

1. ✅ [src/models/Evento.ts](src/models/Evento.ts)
   - Interface actualizada con `organizadorId` requerido
   - Campos requeridos: `nombre`, `fecha`, `ubicacion`, `organizadorId`
   - Getter/setter con validación
   - Método `toJSON()` agregado
   - Método `fromDatabase()` actualizado

2. ✅ [src/repositories/eventoRepository.ts](src/repositories/eventoRepository.ts)
   - `save()` y `update()` actualizados con `organizadorId`
   - Manejo de errores de FK mejorado
   - 5 métodos nuevos agregados
   - `findMany()` con ordenamiento por fecha

3. ✅ [src/interfaces/IEventoRepository.ts](src/interfaces/IEventoRepository.ts)
   - Interface actualizada con 5 métodos nuevos

---

## 🎯 Resumen de Estado del Proyecto

### Modelos Actualizados:
- ✅ Usuario (password, rol)
- ✅ Artista (usuarioId)
- ✅ Boleto (tipo enum, ordenId)
- ✅ ArtistaEvento (rol enum)
- ✅ Evento (organizadorId) ← **RECIÉN COMPLETADO**

### Modelos Pendientes:
- ⏳ **Organizador** (crear modelo nuevo - necesario para usar Evento)
- ⏳ Orden (estado enum)

### Schema:
- ✅ Simplificado (eliminados Item y OrdenDetalle)
- ✅ Enums definidos
- ⏳ Pendiente: Aplicar migración
