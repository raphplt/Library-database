/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `publishedAt` DATETIME(3) NULL,
    MODIFY `publisher` VARCHAR(191) NULL,
    MODIFY `idUserHasBook` INTEGER NULL;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `contractEnd` DATETIME(3) NULL,
    ADD COLUMN `contractStart` DATETIME(3) NULL,
    ADD COLUMN `phone` INTEGER NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    ADD COLUMN `salary` INTEGER NULL,
    MODIFY `subscriber` BOOLEAN NULL,
    MODIFY `currentBookId` INTEGER NULL;

-- DropTable
DROP TABLE `Employee`;
