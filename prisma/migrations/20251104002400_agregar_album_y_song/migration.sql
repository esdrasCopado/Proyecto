-- CreateTable
CREATE TABLE `albums` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `font_image_url` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `lanzamiento` DATETIME(3) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `artista_id` INTEGER NOT NULL,

    INDEX `albums_artista_id_idx`(`artista_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `songs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `font_image_url` VARCHAR(191) NOT NULL,
    `video_url` VARCHAR(191) NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `duracion` INTEGER NOT NULL,
    `album_id` INTEGER NOT NULL,

    INDEX `songs_album_id_idx`(`album_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `albums` ADD CONSTRAINT `albums_artista_id_fkey` FOREIGN KEY (`artista_id`) REFERENCES `artistas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `songs` ADD CONSTRAINT `songs_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
