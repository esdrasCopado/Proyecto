# proyecto-eventos

Sistema de gestión de eventos desarrollado con Node.js, Express y Prisma.

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
4. Configura las variables de entorno creando un archivo `.env` basado en el archivo `.env.example`.    
5. Ejecutar Docker-compose para levantar la base de datos MySQL:
   ```bash
   docker-compose up -d
   ```
6. Ejecuta las migraciones de la base de datos:
   ```bash
   npm run db:migrate
   ```
### Diagrama ERD
Puedes visualizar el diagrama ERD de la base de datos ejecutando:
![ERD Diagram](https://github.com/esdrasCopado/proyecto-eventos/blob/main/prisma/ERD.svg)

