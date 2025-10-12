/*
  Warnings:

  - You are about to alter the column `rol` on the `artista_evento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to alter the column `estado` on the `ordenes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to drop the `Boleto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Evento` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[usuario_id]` on the table `artistas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Boleto` DROP FOREIGN KEY `Boleto_evento_id_fkey`;

-- DropForeignKey
ALTER TABLE `Boleto` DROP FOREIGN KEY `Boleto_usuario_id_fkey`;

-- DropForeignKey
ALTER TABLE `artista_evento` DROP FOREIGN KEY `artista_evento_artista_id_fkey`;

-- DropForeignKey
ALTER TABLE `artista_evento` DROP FOREIGN KEY `artista_evento_evento_id_fkey`;

-- DropForeignKey
ALTER TABLE `orden_detalles` DROP FOREIGN KEY `orden_detalles_orden_id_fkey`;

-- DropForeignKey
ALTER TABLE `ordenes` DROP FOREIGN KEY `ordenes_usuario_id_fkey`;

-- DropIndex
DROP INDEX `artista_evento_evento_id_fkey` ON `artista_evento`;

-- AlterTable
ALTER TABLE `artista_evento` MODIFY `rol` ENUM('HEADLINER', 'TELONERO', 'INVITADO', 'COLABORADOR') NULL DEFAULT 'INVITADO';

-- AlterTable
ALTER TABLE `artistas` ADD COLUMN `usuario_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `ordenes` MODIFY `estado` ENUM('PENDIENTE', 'PAGADO', 'CANCELADO', 'REEMBOLSADO') NOT NULL DEFAULT 'PENDIENTE';

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `rol` ENUM('USER', 'ARTISTA', 'ORGANIZADOR', 'ADMIN') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `Boleto`;

-- DropTable
DROP TABLE `Evento`;

-- CreateTable
CREATE TABLE `organizadores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `contacto` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `fundacion` DATETIME(3) NOT NULL,
    `usuario_id` INTEGER NULL,

    UNIQUE INDEX `organizadores_usuario_id_key`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `organizador_id` INTEGER NOT NULL,

    INDEX `eventos_fecha_idx`(`fecha`),
    INDEX `eventos_organizador_id_idx`(`organizador_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boletos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `precio` DECIMAL(10, 2) NOT NULL,
    `tipo` ENUM('VIP', 'GENERAL', 'PLATINO', 'ORO') NOT NULL DEFAULT 'GENERAL',
    `disponible` BOOLEAN NOT NULL,
    `evento_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NULL,

    INDEX `boletos_evento_id_idx`(`evento_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `artistas_usuario_id_key` ON `artistas`(`usuario_id`);

-- CreateIndex
CREATE INDEX `ordenes_fecha_idx` ON `ordenes`(`fecha`);

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_email_key` ON `usuarios`(`email`);

-- AddForeignKey
ALTER TABLE `artistas` ADD CONSTRAINT `artistas_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organizadores` ADD CONSTRAINT `organizadores_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eventos` ADD CONSTRAINT `eventos_organizador_id_fkey` FOREIGN KEY (`organizador_id`) REFERENCES `organizadores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boletos` ADD CONSTRAINT `boletos_evento_id_fkey` FOREIGN KEY (`evento_id`) REFERENCES `eventos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boletos` ADD CONSTRAINT `boletos_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artista_evento` ADD CONSTRAINT `artista_evento_artista_id_fkey` FOREIGN KEY (`artista_id`) REFERENCES `artistas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artista_evento` ADD CONSTRAINT `artista_evento_evento_id_fkey` FOREIGN KEY (`evento_id`) REFERENCES `eventos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordenes` ADD CONSTRAINT `ordenes_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orden_detalles` ADD CONSTRAINT `orden_detalles_orden_id_fkey` FOREIGN KEY (`orden_id`) REFERENCES `ordenes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `orden_detalles` RENAME INDEX `orden_detalles_item_id_fkey` TO `orden_detalles_item_id_idx`;

-- RenameIndex
ALTER TABLE `orden_detalles` RENAME INDEX `orden_detalles_orden_id_fkey` TO `orden_detalles_orden_id_idx`;

-- RenameIndex
ALTER TABLE `ordenes` RENAME INDEX `ordenes_usuario_id_fkey` TO `ordenes_usuario_id_idx`;
