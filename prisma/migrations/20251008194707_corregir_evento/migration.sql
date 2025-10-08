/*
  Warnings:

  - You are about to drop the column `descipcion` on the `Evento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Evento` DROP COLUMN `descipcion`,
    ADD COLUMN `descripcion` TEXT NULL;
