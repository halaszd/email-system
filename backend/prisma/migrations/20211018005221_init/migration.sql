/*
  Warnings:

  - A unique constraint covering the columns `[emailId,fromUserId,toUserId,typeOfBox]` on the table `UserMail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailId]` on the table `UserMail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fromUserId]` on the table `UserMail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[toUserId]` on the table `UserMail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserMail_emailId_fromUserId_toUserId_typeOfBox_key" ON "UserMail"("emailId", "fromUserId", "toUserId", "typeOfBox");

-- CreateIndex
CREATE UNIQUE INDEX "UserMail_emailId_key" ON "UserMail"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMail_fromUserId_key" ON "UserMail"("fromUserId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMail_toUserId_key" ON "UserMail"("toUserId");
