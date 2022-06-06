/*
  Warnings:

  - The `duration` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "reps" INTEGER,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER;

-- CreateTable
CREATE TABLE "Vitals" (
    "id" SERIAL NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vitals_pkey" PRIMARY KEY ("id")
);
