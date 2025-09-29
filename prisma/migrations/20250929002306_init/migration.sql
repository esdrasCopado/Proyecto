-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descipcion` TEXT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Boleto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `precio` DECIMAL(65, 30) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `disponible` BOOLEAN NOT NULL,
    `evento_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artistas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `contacto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artista_evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artista_id` INTEGER NOT NULL,
    `evento_id` INTEGER NOT NULL,

    UNIQUE INDEX `artista_evento_artista_id_evento_id_key`(`artista_id`, `evento_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordenes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` DECIMAL(10, 2) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` VARCHAR(191) NOT NULL DEFAULT 'pendiente',
    `usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orden_detalles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `orden_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Boleto` ADD CONSTRAINT `Boleto_evento_id_fkey` FOREIGN KEY (`evento_id`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Boleto` ADD CONSTRAINT `Boleto_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artista_evento` ADD CONSTRAINT `artista_evento_artista_id_fkey` FOREIGN KEY (`artista_id`) REFERENCES `artistas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artista_evento` ADD CONSTRAINT `artista_evento_evento_id_fkey` FOREIGN KEY (`evento_id`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordenes` ADD CONSTRAINT `ordenes_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orden_detalles` ADD CONSTRAINT `orden_detalles_orden_id_fkey` FOREIGN KEY (`orden_id`) REFERENCES `ordenes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orden_detalles` ADD CONSTRAINT `orden_detalles_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
