# Plan de Migración de Modelos y Repositorios

## Resumen de Cambios en el Schema

### Cambios Principales

#### 1. **Enums Añadidos**
- `Role`: USER, ARTISTA, ORGANIZADOR, ADMIN
- `TipoBoleto`: VIP, GENERAL, PLATINO, ORO
- `EstadoOrden`: PENDIENTE, PAGADO, CANCELADO, REEMBOLSADO
- `RolArtista`: HEADLINER, TELONERO, INVITADO, COLABORADOR

#### 2. **Modelo Usuario**
**Cambios:**
- ✅ Añadir: `password: string` (requerido)
- ✅ Añadir: `rol: Role` (default: USER)
- ✅ Añadir: `email` ahora es `@unique`
- ✅ Añadir relaciones: `artista?: Artista` y `organizador?: Organizador`

#### 3. **Modelo Artista**
**Cambios:**
- ✅ Añadir: `usuarioId?: number` (@unique, nullable)
- ✅ Añadir relación: `usuario?: Usuario` (onDelete: Cascade)

#### 4. **Nuevo Modelo: Organizador**
**Campos:**
- `id: number`
- `nombre: string`
- `contacto: string`
- `pais: string`
- `fundacion: DateTime`
- `usuarioId?: number` (@unique, nullable)
- Relación: `usuario?: Usuario` (onDelete: Cascade)
- Relación: `eventos: Evento[]`

#### 5. **Modelo Evento**
**Cambios:**
- ✅ Añadir: `organizadorId: number` (requerido)
- ✅ Añadir relación: `organizador: Organizador` (onDelete: Cascade)
- ✅ Añadir índices: `@@index([fecha])` y `@@index([organizadorId])`
- ✅ Cambiar tabla: `Evento` → `eventos` (@@map)

#### 6. **Modelo Boleto**
**Cambios:**
- ✅ Cambiar: `tipo` de `string` → `TipoBoleto` enum (default: GENERAL)
- ✅ Añadir: `@@index([eventoId])`
- ✅ Cambiar tabla: `Boleto` → `boletos` (@@map)
- ✅ Actualizar relaciones con onDelete: Cascade/SetNull

#### 7. **Modelo ArtistaEvento**
**Cambios:**
- ✅ Cambiar: `rol` de `string?` → `RolArtista?` enum (default: INVITADO)
- ✅ Actualizar relaciones con onDelete: Cascade

#### 8. **Modelo Orden**
**Cambios:**
- ✅ Cambiar: `estado` de `string` → `EstadoOrden` enum (default: PENDIENTE)
- ✅ Añadir índices: `@@index([usuarioId])` y `@@index([fecha])`
- ✅ Actualizar relaciones con onDelete: Cascade

---

## Orden Recomendado de Actualización

### Fase 1: Crear Enums y Tipos (TypeScript)
1. Crear archivo `src/types/enums.ts` con todos los enums
2. Esto permitirá que los modelos importen estos tipos

### Fase 2: Actualizar Modelos Base (sin dependencias complejas)
1. **Usuario** - Añadir password y rol
2. **Organizador** - Crear modelo nuevo
3. **Artista** - Añadir usuarioId
4. **Boleto** - Cambiar tipo a enum
5. **Orden** - Cambiar estado a enum

### Fase 3: Actualizar Modelos con Relaciones
1. **Evento** - Añadir organizadorId
2. **ArtistaEvento** - Cambiar rol a enum

### Fase 4: Actualizar Repositorios
1. **UserRepository** - Manejar password y rol
2. **ArtistaRepository** - Manejar usuarioId
3. **OrganizadorRepository** - Crear nuevo
4. **EventoRepository** - Manejar organizadorId
5. **BoletoRepository** - Manejar tipo enum
6. **OrdenRepository** - Manejar estado enum
7. **ArtistaEventoRepository** - Manejar rol enum

### Fase 5: Actualizar Interfaces
1. Actualizar todas las interfaces de repositorios
2. Ajustar tipos de retorno según nuevos modelos

---

## Impacto y Consideraciones

### Alto Impacto (Requieren atención inmediata)
- ✅ **Usuario.password**: Campo requerido - afecta autenticación
- ✅ **Evento.organizadorId**: Campo requerido - necesita migración de datos
- ✅ **Organizador**: Modelo completamente nuevo

### Medio Impacto (Cambios de tipo)
- ✅ **Boleto.tipo**: String → Enum
- ✅ **Orden.estado**: String → Enum
- ✅ **ArtistaEvento.rol**: String → Enum

### Bajo Impacto (Campos opcionales)
- ✅ **Usuario.rol**: Default USER
- ✅ **Artista.usuarioId**: Opcional
- ✅ **Organizador.usuarioId**: Opcional

---

## Próximos Pasos

1. ✅ Resolver el problema de migración de Prisma (MIGRATION_FIX_STEPS.md)
2. Crear archivo de enums TypeScript
3. Actualizar modelos uno por uno
4. Actualizar repositorios correspondientes
5. Ejecutar tests después de cada actualización
6. Actualizar documentación

---

## Notas Importantes

- **NO** eliminar campos existentes hasta confirmar que no se usan
- **SIEMPRE** mantener compatibilidad hacia atrás cuando sea posible
- **PROBAR** cada cambio individualmente
- **DOCUMENTAR** cualquier breaking change
