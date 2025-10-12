# proyecto-eventos

Sistema de gestión de eventos desarrollado con Node.js, Prisma.
Para este proyecto se ha utilizado MySQL como base de datos y TypeScript como lenguaje principal, la razon principal de escojer MySQL es por su facilidad de uso y amplia adopción en la industria, además de su robustez y escalabilidad para manejar grandes volúmenes de datos, lo que es esencial para una aplicación de gestión de eventos que puede tener muchos usuarios y transacciones simultáneas.

### Segundo Avance: 
Se realizó la implementación de los modelos (Usuario, Artista, Organizador, Evento, Boleto, Orden), Se crearon los repositorios y 5 pruebas de integracion con 49 tests automaticos.

[![Tests de Integracion](https://github.com/esdrasCopado/Proyecto/actions/workflows/pruebasIntegracion.yml/badge.svg)](https://github.com/esdrasCopado/Proyecto/actions/workflows/pruebasIntegracion.yml)

## Tabla de Contenidos
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Scripts Disponibles](#scripts-disponibles)
- [Pruebas](#pruebas)
- [Diagrama ERD](#diagrama-erd)
- [Troubleshooting](#troubleshooting)

## Diagrama ERD

Puedes visualizar el diagrama ERD de la base de datos:

![ERD Diagram](https://github.com/esdrasCopado/Proyecto/blob/main/prisma/ERD.svg)

## Tecnologías

- **Backend:** Node.js + Express
- **ORM:** Prisma
- **Base de Datos:** MySQL
- **Validación:** Zod
- **Testing:** Jest + Supertest
- **Seguridad:** Helmet + CORS
- **Lenguaje:** TypeScript

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Docker** >= 20.x
- **Docker Compose** >= 2.x

Verifica las versiones instaladas:
```bash
node --version
npm --version
docker --version
docker compose version
```

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/proyecto-eventos.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd proyecto-eventos
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto:
   ```bash
   DATABASE_URL="mysql://root:example_root@localhost:3306/eventos_db"
   ```
   > **Nota:** Puedes modificar las credenciales según tus necesidades.    
5. Ejecutar Docker Compose para levantar la base de datos MySQL:
   ```bash
   docker compose up -d
   ```
6. Genera el cliente de Prisma:
   ```bash
   npm run db:generate
   ```
7. Ejecuta las migraciones de la base de datos:
   ```bash
   npm run db:migrate
   ```
8. (Opcional) Si deseas poblar la base de datos con datos de prueba, ejecuta:
   ```bash
   npm run db:seed
   ```

## Uso

### Iniciar la aplicación en modo desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`

### Iniciar la aplicación en modo producción
```bash
npm start
```

### Acceder a Prisma Studio
Para gestionar visualmente tu base de datos:
```bash
npm run db:studio
```
Se abrirá en `http://localhost:5555`

## Scripts Disponibles

### Desarrollo
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm start` - Inicia el servidor en modo producción

### Base de Datos
- `npm run db:migrate` - Ejecuta las migraciones de Prisma
- `npm run db:generate` - Genera el cliente de Prisma
- `npm run db:studio` - Abre Prisma Studio
- `npm run db:seed` - Popula la base de datos con datos de prueba
- `npm run db:reset` - Resetea la base de datos (¡cuidado!)
- `npm run test:db` - Prueba la conexión a la base de datos

### Testing
- `npm test` - Ejecuta todas las pruebas
- `npm run test:watch` - Ejecuta las pruebas en modo watch
- `npm run test:coverage` - Genera reporte de cobertura
- `npm run test:models` - Ejecuta pruebas de modelos
- `npm run test:repositories` - Ejecuta pruebas de repositorios
- `npm run test:verbose` - Ejecuta las pruebas con salida detallada

### Otros
- `npm run lint` - Ejecuta el linter en el código fuente
- `npm run clean` - Limpia archivos de compilación

## Pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas con cobertura
```bash
npm run test:coverage
```

### Ejecutar pruebas específicas
```bash
npm run test:models
npm run test:repositories
```


## Troubleshooting

### Error: Puerto 3306 ya está en uso
Si MySQL ya está corriendo localmente, detén el servicio o cambia el puerto en `docker-compose.yml`:
```yaml
ports:
  - "3307:3306"  # Cambia 3306 por 3307
```
Y actualiza el `DATABASE_URL` en `.env`:
```
DATABASE_URL="mysql://root:example_root@localhost:3307/eventos_db"
```

### Error: Cannot find module '@prisma/client'
Ejecuta:
```bash
npm run db:generate
```

### Error de migraciones
Resetea la base de datos (esto borrará todos los datos):
```bash
npm run db:reset
```

### Docker no levanta
Verifica que Docker esté corriendo:
```bash
docker ps
```
Si no hay contenedores, intenta:
```bash
docker compose down
docker compose up -d
```

