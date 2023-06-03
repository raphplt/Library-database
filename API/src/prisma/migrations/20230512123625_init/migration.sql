/*
  Warnings:

  - You are about to drop the `_UserBooks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `currentBookId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_UserBooks` DROP FOREIGN KEY `_UserBooks_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserBooks` DROP FOREIGN KEY `_UserBooks_B_fkey`;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `currentBookId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_UserBooks`;
