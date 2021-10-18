/*
  Warnings:

  - A unique constraint covering the columns `[id,possessedById]` on the table `UserMail` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserMail_emailId_possessedById_typeOfBox_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserMail_id_possessedById_key" ON "UserMail"("id", "possessedById");
