/*
  Warnings:

  - A unique constraint covering the columns `[type,unit]` on the table `ActivityUnit` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ActivityUnit_unit_key";

-- AlterTable
ALTER TABLE "ActivityUnit" ALTER COLUMN "unit" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ActivityUnit_type_unit_key" ON "ActivityUnit"("type", "unit");
