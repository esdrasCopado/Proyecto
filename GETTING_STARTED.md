# Getting Started - API de Gestión de Eventos

## 🚀 Inicio Rápido

### 1. Instalación de dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Asegúrate de tener el archivo `.env` con las siguientes variables:

```env
# Database
DATABASE_URL="mysql://root:example_root@localhost:3306/eventos_db"

# JWT Configuration
JWT_SECRET="PROYECTO_EVENTOS_SECRET_MIN_32_CHARS"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="PROYECTO_EVENTOS_REFRESH_SECRET_MIN_32"
JWT_REFRESH_EXPIRES_IN="30d"

# Application
NODE_ENV="development"
PORT="3000"
```

### 3. Generar cliente de Prisma

```bash
npm run db:generate
```

### 4. Ejecutar migraciones

```bash
npm run db:migrate
```

### 5. Iniciar el servidor

#### Modo desarrollo (con hot-reload):
```bash
npm run dev
```

#### Modo desarrollo con watch (nodemon):
```bash
npm run dev:watch
```

#### Modo producción:
```bash
# Primero compilar TypeScript
npm run build

# Luego iniciar el servidor
npm start
```

## 📚 Documentación de la API

Una vez que el servidor esté corriendo, puedes acceder a:

- **Swagger UI**: http://localhost:3000/api-docs
- **Swagger JSON**: http://localhost:3000/api-docs.json
- **API Base URL**: http://localhost:3000/api

## 🧪 Comandos disponibles

### Desarrollo
```bash
npm run dev              # Inicia servidor de desarrollo
npm run dev:watch        # Inicia servidor con hot-reload
npm run build            # Compila TypeScript a JavaScript
npm start                # Inicia servidor de producción
```

### Base de datos
```bash
npm run db:generate      # Genera cliente de Prisma
npm run db:migrate       # Ejecuta migraciones
npm run db:studio        # Abre Prisma Studio
npm run db:seed          # Ejecuta seed de datos
npm run db:reset         # Resetea la base de datos
```

### Testing
```bash
npm test                 # Ejecuta todos los tests
npm run test:watch       # Ejecuta tests en modo watch
npm run test:coverage    # Ejecuta tests con cobertura
npm run test:models      # Tests solo de modelos
npm run test:repositories # Tests solo de repositorios
npm run test:verbose     # Tests con output verbose
```

### Otros
```bash
npm run lint             # Ejecuta ESLint
npm run clean            # Limpia directorio dist
```

## 🔐 Autenticación con JWT

### 1. Registrar un usuario

```bash
POST http://localhost:3000/api/usuarios
Content-Type: application/json

{
  "email": "test@ejemplo.com",
  "password": "MiPassword123!",
  "nombre": "Usuario",
  "apellidos": "Prueba",
  "telefono": "5551234567"
}
```

### 2. Login

```bash
POST http://localhost:3000/api/usuarios/login
Content-Type: application/json

{
  "email": "test@ejemplo.com",
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
      "email": "test@ejemplo.com",
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

Para endpoints protegidos, incluye el token en el header:

```bash
GET http://localhost:3000/api/usuarios/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📦 Estructura del proyecto

```
proyecto-eventos/
├── src/
│   ├── config/           # Configuración (env, database, swagger)
│   ├── controllers/      # Controladores HTTP
│   ├── middlewares/      # Middlewares (auth, authorize)
│   ├── models/           # Modelos de dominio
│   ├── repositories/     # Capa de acceso a datos
│   ├── routes/           # Definición de rutas
│   ├── services/         # Lógica de negocio
│   ├── types/            # Tipos y enums
│   ├── utils/            # Utilidades (jwt, bcrypt)
│   ├── app.ts           # Configuración de Express
│   └── server.ts        # Punto de entrada del servidor
├── prisma/
│   └── schema.prisma    # Schema de Prisma
├── test/                # Tests
├── .env                 # Variables de entorno
├── tsconfig.json        # Configuración de TypeScript
└── package.json         # Dependencias y scripts
```

## 🔑 Roles y permisos

| Rol | Descripción |
|-----|-------------|
| **USER** | Usuario regular que puede comprar boletos |
| **ARTISTA** | Artista que participa en eventos |
| **ORGANIZADOR** | Organizador que crea y gestiona eventos |
| **ADMIN** | Administrador con acceso completo |

## 🛠️ Tecnologías utilizadas

- **Node.js** - Runtime de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express** - Framework web
- **Prisma** - ORM para base de datos
- **MySQL** - Base de datos relacional
- **JWT** - Autenticación basada en tokens
- **Bcrypt** - Hashing de contraseñas
- **Swagger** - Documentación de API
- **Zod** - Validación de schemas
- **Jest** - Framework de testing

## 🐛 Solución de problemas

### Error: "Unknown file extension .ts"

**Solución:** Usa `npm run dev` en lugar de `npm start` para desarrollo.

### Error: "Cannot find module"

**Solución:**
```bash
npm install
npm run db:generate
```

### Error de conexión a base de datos

**Solución:** Verifica que MySQL esté corriendo y que `DATABASE_URL` en `.env` sea correcta.

### Error: "JWT_SECRET debe tener al menos 32 caracteres"

**Solución:** Actualiza `JWT_SECRET` y `JWT_REFRESH_SECRET` en `.env` con strings de al menos 32 caracteres.

## 📞 Soporte

Para más información, consulta:
- [README.md](README.md) - Documentación principal
- [SWAGGER_GUIDE.md](SWAGGER_GUIDE.md) - Guía de Swagger
- [Swagger UI](http://localhost:3000/api-docs) - Documentación interactiva

## 🎯 Próximos pasos

1. Explora la [documentación de Swagger](http://localhost:3000/api-docs)
2. Revisa los [tests](./test) para ver ejemplos de uso
3. Lee la arquitectura en [README.md](README.md)
4. Comienza a crear endpoints para Eventos, Artistas, etc.
