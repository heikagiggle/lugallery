/*
  Warnings:

  - You are about to drop the column `image` on the `Career` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `UserData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Career" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "image";
