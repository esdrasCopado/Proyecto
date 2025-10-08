-- AlterTable
ALTER TABLE `artista_evento` ADD COLUMN `compensacion` DECIMAL(10, 2) NULL,
    ADD COLUMN `fecha_confirmacion` DATETIME(3) NULL,
    ADD COLUMN `rol` VARCHAR(191) NULL;
