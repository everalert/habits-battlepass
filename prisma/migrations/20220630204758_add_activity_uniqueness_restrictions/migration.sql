/*
  Warnings:

  - A unique constraint covering the columns `[unit]` on the table `ActivityUnit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activityId,label]` on the table `ActivityVariation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activityId,variationId]` on the table `ActivityVariationCombo` will be added. If there are existing duplicate values, this will fail.
  - Made the column `unit` on table `ActivityUnit` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_unitId_fkey";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "unitId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ActivityUnit" ALTER COLUMN "unit" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ActivityUnit_unit_key" ON "ActivityUnit"("unit");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityVariation_activityId_label_key" ON "ActivityVariation"("activityId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityVariationCombo_activityId_variationId_key" ON "ActivityVariationCombo"("activityId", "variationId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "ActivityUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
