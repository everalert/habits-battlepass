/*
  Warnings:

  - The `lagProjectionCurve` column on the `Goal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GoalProjectionCurve" AS ENUM ('LINEAR');

-- DropIndex
DROP INDEX "ActivityUnit_type_key";

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "lagProjectionCurve";
ALTER TABLE "Goal" ADD COLUMN     "lagProjectionCurve" "GoalProjectionCurve" NOT NULL DEFAULT E'LINEAR';
