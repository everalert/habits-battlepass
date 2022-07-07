/*
  Warnings:

  - You are about to drop the column `taskXP` on the `Challenge` table. All the data in the column will be lost.
  - The `period` column on the `Challenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `xp` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChallengePeriod" AS ENUM ('DAILY', 'WEEKLY', 'CUSTOM');

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "taskXP";
ALTER TABLE "Challenge" ADD COLUMN     "customPeriod" INT4;
ALTER TABLE "Challenge" ADD COLUMN     "xp" INT4 NOT NULL;
ALTER TABLE "Challenge" DROP COLUMN "period";
ALTER TABLE "Challenge" ADD COLUMN     "period" "ChallengePeriod" NOT NULL DEFAULT E'DAILY';
