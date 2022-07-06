/*
  Warnings:

  - You are about to drop the column `seasonXpRatio` on the `Goal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,label]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[goalId,activityId,target]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lagActivityId,seasonId]` on the table `Goal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,activityId,timestamp]` on the table `Log` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seasonId,label]` on the table `Reward` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,start,length]` on the table `Season` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ActivityVariationCombo" DROP CONSTRAINT "ActivityVariationCombo_variationId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "type" STRING;

-- AlterTable
ALTER TABLE "ActivityVariationCombo" ALTER COLUMN "variationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "icon" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "seasonXpRatio";
ALTER TABLE "Goal" ADD COLUMN     "seasonXPWeight" FLOAT8 NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Season" ALTER COLUMN "levelMax" SET DEFAULT 120;

-- CreateIndex
CREATE UNIQUE INDEX "Activity_userId_label_key" ON "Activity"("userId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "Category_userId_name_key" ON "Category"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_goalId_activityId_target_key" ON "Challenge"("goalId", "activityId", "target");

-- CreateIndex
CREATE UNIQUE INDEX "Goal_lagActivityId_seasonId_key" ON "Goal"("lagActivityId", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "Log_userId_activityId_timestamp_key" ON "Log"("userId", "activityId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "Reward_seasonId_label_key" ON "Reward"("seasonId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "Season_userId_start_length_key" ON "Season"("userId", "start", "length");

-- AddForeignKey
ALTER TABLE "ActivityVariationCombo" ADD CONSTRAINT "ActivityVariationCombo_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "ActivityVariation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
