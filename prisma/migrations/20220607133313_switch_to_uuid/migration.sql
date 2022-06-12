/*
  Warnings:

  - The primary key for the `Activity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Vitals` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Activity_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Activity_id_seq";

-- DropTable
DROP TABLE "Vitals";

-- CreateTable
CREATE TABLE "Vital" (
    "id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vital_pkey" PRIMARY KEY ("id")
);
