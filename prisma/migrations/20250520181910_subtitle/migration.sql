/*
  Warnings:

  - You are about to drop the column `img` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Builds" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "img" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "img",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "subtitle" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "href" DROP NOT NULL;
