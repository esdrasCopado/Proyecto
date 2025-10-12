# Resumen de Simplificación del Schema

## ✅ Cambios Realizados

### Modelos Eliminados
- ❌ **Item** - Eliminado completamente (no se necesita)
- ❌ **OrdenDetalle** - Eliminado (relación indirecta innecesaria)

### Modelos Modificados

#### 1. **Boleto** - Nueva relación directa con Orden
**Antes:**
```prisma
model Boleto {
  // ...
  detalleCompra OrdenDetalle?
}
```

**Ahora:**
```prisma
model Boleto {
  // ...
  ordenId Int? @map("orden_id")
  orden   Orden? @relation(fields: [ordenId], references: [id], onDelete: SetNull)

  @@index([ordenId])
}
```

**Cambios:**
- ✅ Agregado campo `ordenId` (nullable)
- ✅ Relación directa con `Orden`
- ✅ Índice en `ordenId` para búsquedas rápidas
- ✅ `onDelete: SetNull` - Si se elimina la orden, el boleto queda sin orden

#### 2. **Orden** - Relación directa con Boletos
**Antes:**
```prisma
model Orden {
  // ...
  detalles OrdenDetalle[]
}
```

**Ahora:**
```prisma
model Orden {
  // ...
  boletos Boleto[]
}
```

**Cambios:**
- ✅ Relación directa con `Boleto[]`
- ✅ Más simple y directa
- ✅ Una orden puede tener múltiples boletos

---

## 🎯 Nueva Estructura de Datos

### Relaciones Actuales

```
Usuario (1) ──< (N) Orden
Usuario (1) ──< (N) Boleto

Orden (1) ──< (N) Boleto

Evento (1) ──< (N) Boleto
```

### Flujo de Compra Simplificado

1. **Usuario** crea una **Orden**
2. **Usuario** selecciona **Boletos** disponibles
3. Los **Boletos** se asocian a la **Orden** y al **Usuario**
4. La **Orden** calcula el total sumando los precios de los boletos

---

## 📊 Ejemplo de Uso

### Crear una orden con boletos

```typescript
// 1. Crear la orden
const orden = await prisma.orden.create({
  data: {
    usuarioId: 1,
    total: 0, // Se calculará después
    estado: 'PENDIENTE'
  }
});

// 2. Asociar boletos a la orden
const boletos = await prisma.boleto.findMany({
  where: {
    id: { in: [1, 2, 3] }, // IDs de boletos seleccionados
    disponible: true,
    usuarioId: null
  }
});

// 3. Actualizar boletos
await prisma.boleto.updateMany({
  where: {
    id: { in: boletos.map(b => b.id) }
  },
  data: {
    ordenId: orden.id,
    usuarioId: 1,
    disponible: false
  }
});

// 4. Calcular y actualizar total
const total = boletos.reduce((sum, b) => sum + Number(b.precio), 0);
await prisma.orden.update({
  where: { id: orden.id },
  data: { total }
});
```

### Consultar orden con boletos

```typescript
const orden = await prisma.orden.findUnique({
  where: { id: 1 },
  include: {
    usuario: true,
    boletos: {
      include: {
        evento: true
      }
    }
  }
});

console.log(`Orden #${orden.id}`);
console.log(`Usuario: ${orden.usuario.nombre}`);
console.log(`Total: $${orden.total}`);
console.log(`Boletos: ${orden.boletos.length}`);
orden.boletos.forEach(boleto => {
  console.log(`  - ${boleto.evento.nombre} - ${boleto.tipo}`);
});
```

---

## ⚠️ Impacto en el Código Existente

### Archivos que necesitan actualización:

1. **Modelos TypeScript**
   - ✅ `src/models/Boleto.ts` - Ya actualizado con `ordenId`
   - ⚠️ `src/models/Orden.ts` - Necesita actualización
   - ❌ `src/models/OrdenDetalle.ts` - Eliminar archivo
   - ❌ `src/models/Item.ts` - Eliminar archivo

2. **Repositorios**
   - ⚠️ `src/repositories/ordenRepository.ts` - Actualizar lógica
   - ⚠️ `src/repositories/boletoRepository.ts` - Verificar métodos
   - ❌ `src/repositories/ordenDetalleRepository.ts` - Eliminar archivo
   - ❌ `src/repositories/itemRepository.ts` - Eliminar archivo

3. **Interfaces**
   - ❌ `src/interfaces/IOrdenDetalleRepository.ts` - Si existe, eliminar
   - ❌ `src/interfaces/IItemRepository.ts` - Si existe, eliminar

---

## 📝 Próximos Pasos

### 1. Migración de Base de Datos
```bash
# IMPORTANTE: Resolver primero el problema de migración pendiente
# Ver: MIGRATION_FIX_STEPS.md

# Luego crear la nueva migración
npx prisma migrate dev --name simplify_orders_remove_items
```

### 2. Actualizar Modelos TypeScript
- [ ] Actualizar `Orden.ts` para eliminar referencia a `OrdenDetalle`
- [ ] Eliminar `OrdenDetalle.ts`
- [ ] Eliminar `Item.ts`
- [ ] Actualizar `Boleto.ts` para incluir `ordenId` (si no está)

### 3. Actualizar Repositorios
- [ ] Actualizar `ordenRepository.ts` para trabajar con boletos directamente
- [ ] Eliminar `ordenDetalleRepository.ts`
- [ ] Eliminar `itemRepository.ts`

### 4. Actualizar Lógica de Negocio
- [ ] Implementar método para crear orden con boletos
- [ ] Implementar cálculo automático del total
- [ ] Implementar validaciones (boletos disponibles, etc.)

---

## 🔍 Ventajas de la Simplificación

1. **Menos complejidad**
   - Menos tablas = menos joins
   - Menos código = menos bugs

2. **Mejor rendimiento**
   - Consultas más directas
   - Menos relaciones intermedias

3. **Más fácil de entender**
   - Relación directa Orden → Boletos
   - Flujo más intuitivo

4. **Más fácil de mantener**
   - Menos archivos
   - Menos código duplicado

---

## ✅ Schema Validado

```bash
npx prisma validate
# ✅ The schema at prisma\schema.prisma is valid 🚀
```

El schema está listo para migración una vez que resuelvas el problema de migración pendiente (ver [MIGRATION_FIX_STEPS.md](MIGRATION_FIX_STEPS.md)).
