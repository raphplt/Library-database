/*
  Warnings:

  - You are about to drop the column `currentBooks` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Users` DROP COLUMN `currentBooks`,
    ADD COLUMN `currentBookId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_currentBookId_fkey` FOREIGN KEY (`currentBookId`) REFERENCES `Book`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
