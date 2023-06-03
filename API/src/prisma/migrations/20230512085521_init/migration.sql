/*
  Warnings:

  - You are about to drop the column `endsuscription` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `suscriber` on the `Users` table. All the data in the column will be lost.
  - Added the required column `idGenre` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriber` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Book` ADD COLUMN `idGenre` INTEGER NOT NULL,
    ADD COLUMN `publisher` VARCHAR(191) NOT NULL,
    MODIFY `dateLeave` DATETIME(3) NULL,
    MODIFY `dateReturn` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `endsuscription`,
    DROP COLUMN `suscriber`,
    ADD COLUMN `endsSubscription` DATETIME(3) NULL,
    ADD COLUMN `subscriber` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `Genre` (
    `idGenre` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idGenre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_idGenre_fkey` FOREIGN KEY (`idGenre`) REFERENCES `Genre`(`idGenre`) ON DELETE RESTRICT ON UPDATE CASCADE;
