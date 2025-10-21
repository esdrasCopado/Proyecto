# Guía de Swagger API Documentation

## Acceso a la documentación

Una vez que el servidor esté corriendo, puedes acceder a la documentación de Swagger en:

```
http://localhost:3000/api-docs
```

## Características implementadas

### ✅ Documentación completa de endpoints de Usuarios
- **POST** `/api/usuarios/login` - Login con JWT
- **POST** `/api/usuarios` - Registro de usuario
- **GET** `/api/usuarios` - Listar usuarios (con paginación y filtros)
- **GET** `/api/usuarios/:id` - Obtener usuario por ID
- **PUT** `/api/usuarios/:id` - Actualizar usuario
- **DELETE** `/api/usuarios/:id` - Eliminar usuario
- **GET** `/api/usuarios/stats/count` - Estadísticas de conteo
- **GET** `/api/usuarios/stats/general` - Estadísticas generales
- **GET** `/api/usuarios/nuevos` - Usuarios nuevos (últimos 30 días)
- **GET** `/api/usuarios/email/:email` - Buscar por email
- **PUT** `/api/usuarios/:id/rol` - Cambiar rol de usuario
- **GET** `/api/usuarios/check-email/:email` - Verificar disponibilidad de email

### 🔐 Autenticación JWT en Swagger

La documentación incluye soporte completo para JWT:

1. **Login**: Usa el endpoint `/api/usuarios/login` para obtener tu token
2. **Autorizar**: Haz clic en el botón **"Authorize"** 🔓 en la parte superior
3. **Ingresa el token**: Pega el `accessToken` obtenido del login
4. **Formato**: `Bearer <tu-token-aqui>` (Swagger agrega "Bearer" automáticamente)
5. **Prueba**: Ahora puedes probar los endpoints protegidos

### 📝 Schemas y Modelos

Los siguientes schemas están documentados:

- **Usuario** - Modelo completo de usuario
- **UsuarioCreate** - Schema para crear usuario
- **LoginRequest** - Credenciales de login
- **LoginResponse** - Respuesta con tokens JWT
- **SuccessResponse** - Respuesta exitosa genérica
- **ErrorResponse** - Respuesta de error
- **PaginationInfo** - Información de paginación

### 🏷️ Tags (Categorías)

Los endpoints están organizados por tags:

- **Autenticación** - Login y tokens
- **Usuarios** - CRUD de usuarios
- **Eventos** - Gestión de eventos (próximamente)
- **Artistas** - Gestión de artistas (próximamente)
- **Organizadores** - Gestión de organizadores (próximamente)

## Ejemplo de uso

### 1. Registrar un usuario

```json
POST /api/usuarios
{
  "email": "juan@ejemplo.com",
  "password": "MiPassword123!",
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "telefono": "5551234567",
  "rol": "USER"
}
```

### 2. Login

```json
POST /api/usuarios/login
{
  "email": "juan@ejemplo.com",
  "password": "MiPassword123!"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": 1,
      "email": "juan@ejemplo.com",
      "nombre": "Juan",
      "apellidos": "Pérez García",
      ...
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### 3. Usar el token

Copia el `accessToken` y úsalo en el header Authorization:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Probar endpoint protegido

```
GET /api/usuarios/1
Headers:
  Authorization: Bearer <tu-token>
```

## Códigos de estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Error de validación |
| 401 | Unauthorized - Token inválido o faltante |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Recurso duplicado |
| 500 | Internal Server Error - Error del servidor |

## Roles y permisos

| Endpoint | USER | ARTISTA | ORGANIZADOR | ADMIN |
|----------|------|---------|-------------|-------|
| POST /login | ✅ | ✅ | ✅ | ✅ |
| POST /usuarios | ✅ | ✅ | ✅ | ✅ |
| GET /usuarios/:id (propio) | ✅ | ✅ | ✅ | ✅ |
| GET /usuarios/:id (otros) | ❌ | ❌ | ❌ | ✅ |
| PUT /usuarios/:id (propio) | ✅ | ✅ | ✅ | ✅ |
| PUT /usuarios/:id (otros) | ❌ | ❌ | ❌ | ✅ |
| GET /usuarios | ❌ | ❌ | ✅ | ✅ |
| DELETE /usuarios/:id | ❌ | ❌ | ❌ | ✅ |
| PUT /usuarios/:id/rol | ❌ | ❌ | ❌ | ✅ |
| GET /usuarios/stats/* | ❌ | ❌ | ✅ | ✅ |

## Exportar documentación

Puedes exportar la especificación OpenAPI en formato JSON:

```
http://localhost:3000/api-docs.json
```

Esto te permite:
- Importar en Postman
- Generar código cliente
- Usar con otras herramientas de API testing

## Personalización

La configuración de Swagger está en:
```
src/config/swagger.ts
```

Puedes personalizar:
- Título y descripción
- Versión de la API
- Información de contacto
- Servidores (desarrollo, producción)
- Schemas y modelos
- Security schemes

## Tips de uso

1. **Explorar**: Usa el modo "explorer" para navegar por todos los endpoints
2. **Try it out**: Haz clic en "Try it out" para probar directamente desde Swagger
3. **Ejemplos**: Todos los endpoints tienen ejemplos de request/response
4. **Validación**: Swagger muestra los tipos de datos y validaciones requeridas
5. **Errores**: Cada endpoint documenta los posibles códigos de error

## Próximos pasos

- [ ] Documentar endpoints de Eventos
- [ ] Documentar endpoints de Artistas
- [ ] Documentar endpoints de Organizadores
- [ ] Documentar endpoints de Boletos
- [ ] Documentar endpoints de Órdenes
- [ ] Agregar ejemplos de respuestas de error
- [ ] Agregar refresh token endpoint
