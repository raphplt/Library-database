/*
  Warnings:

  - You are about to drop the column `idGenre` on the `book` table. All the data in the column will be lost.
  - You are about to alter the column `isbn` on the `book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `genre` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publishedAt` on table `book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publisher` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_idGenre_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `idGenre`,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `genre` JSON NOT NULL,
    ADD COLUMN `lastModified` DATETIME(3) NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `isbn` INTEGER NOT NULL,
    MODIFY `publishedAt` DATETIME(3) NOT NULL,
    MODIFY `publisher` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `genre`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` INTEGER NULL,
    `password` LONGBLOB NOT NULL,
    `endSubscription` DATETIME(3) NULL,
    `currentsBooks` JSON NOT NULL,
    `contractStart` DATETIME(3) NULL,
    `contractEnd` DATETIME(3) NULL,
    `subscriber` BOOLEAN NULL,
    `salary` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastModified` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
