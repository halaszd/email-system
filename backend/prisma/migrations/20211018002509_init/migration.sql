/*
  Warnings:

  - You are about to drop the column `possessedById` on the `UserMail` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserMail_emailId_possessedById_fromUserId_toUserId_typeOfBox_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserMail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emailId" INTEGER NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "typeOfBox" TEXT NOT NULL,
    CONSTRAINT "UserMail_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMail_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMail_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserMail" ("emailId", "fromUserId", "id", "toUserId", "typeOfBox") SELECT "emailId", "fromUserId", "id", "toUserId", "typeOfBox" FROM "UserMail";
DROP TABLE "UserMail";
ALTER TABLE "new_UserMail" RENAME TO "UserMail";
CREATE UNIQUE INDEX "UserMail_emailId_fromUserId_toUserId_typeOfBox_key" ON "UserMail"("emailId", "fromUserId", "toUserId", "typeOfBox");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;