/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `ActivityUnit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActivityUnit_type_key" ON "ActivityUnit"("type");
