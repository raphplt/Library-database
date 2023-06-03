/*
  Warnings:

  - Added the required column `password` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `password` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `password` LONGBLOB NOT NULL;
