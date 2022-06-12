/*
  Warnings:

  - You are about to drop the column `weight` on the `Vital` table. All the data in the column will be lost.
  - Added the required column `name` to the `Vital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Vital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vital" DROP COLUMN "weight",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
