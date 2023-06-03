/*
  Warnings:

  - You are about to drop the column `currentBookId` on the `Users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_currentBookId_fkey`;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `currentBookId`;

-- CreateTable
CREATE TABLE `_UserBooks` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserBooks_AB_unique`(`A`, `B`),
    INDEX `_UserBooks_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserBooks` ADD CONSTRAINT `_UserBooks_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserBooks` ADD CONSTRAINT `_UserBooks_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
