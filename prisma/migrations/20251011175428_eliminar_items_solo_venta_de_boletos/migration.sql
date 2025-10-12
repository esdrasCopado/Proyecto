/*
  Warnings:

  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orden_detalles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orden_detalles` DROP FOREIGN KEY `orden_detalles_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `orden_detalles` DROP FOREIGN KEY `orden_detalles_orden_id_fkey`;

-- AlterTable
ALTER TABLE `boletos` ADD COLUMN `orden_id` INTEGER NULL;

-- DropTable
DROP TABLE `items`;

-- DropTable
DROP TABLE `orden_detalles`;

-- CreateIndex
CREATE INDEX `boletos_orden_id_idx` ON `boletos`(`orden_id`);

-- AddForeignKey
ALTER TABLE `boletos` ADD CONSTRAINT `boletos_orden_id_fkey` FOREIGN KEY (`orden_id`) REFERENCES `ordenes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `boletos` RENAME INDEX `boletos_usuario_id_fkey` TO `boletos_usuario_id_idx`;
