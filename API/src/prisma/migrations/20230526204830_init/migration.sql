/*
  Warnings:

  - You are about to alter the column `isbn` on the `book` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `isbn` DOUBLE NOT NULL;
