/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "imageUrl",
ADD COLUMN     "distance" INTEGER;
