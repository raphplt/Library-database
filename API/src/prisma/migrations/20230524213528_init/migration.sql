/*
  Warnings:

  - You are about to drop the column `currentsBooks` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `currentsBooks`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_idUserHasBook_fkey` FOREIGN KEY (`idUserHasBook`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
