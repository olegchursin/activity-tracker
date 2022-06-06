-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "duration" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
