/*
  Warnings:

  - You are about to drop the column `floatId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `floatId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `floatId`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `floatId`;
