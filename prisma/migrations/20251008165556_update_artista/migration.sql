/*
  Warnings:

  - Added the required column `fechaDebut` to the `artistas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paisOrigen` to the `artistas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `artistas` ADD COLUMN `disquera` VARCHAR(191) NULL,
    ADD COLUMN `fechaDebut` DATETIME(3) NOT NULL,
    ADD COLUMN `paisOrigen` VARCHAR(191) NOT NULL;
