/*
  Warnings:

  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedRt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `email` VARCHAR(250) NOT NULL,
    ADD COLUMN `hash` VARCHAR(250) NOT NULL,
    ADD COLUMN `hashedRt` VARCHAR(250) NOT NULL;
