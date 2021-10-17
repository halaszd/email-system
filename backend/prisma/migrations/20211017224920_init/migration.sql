/*
  Warnings:

  - A unique constraint covering the columns `[emailId,possessedById,fromUserId,toUserId,typeOfBox]` on the table `UserMail` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserMail_emailId_fromUserId_toUserId_typeOfBox_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserMail_emailId_possessedById_fromUserId_toUserId_typeOfBox_key" ON "UserMail"("emailId", "possessedById", "fromUserId", "toUserId", "typeOfBox");
