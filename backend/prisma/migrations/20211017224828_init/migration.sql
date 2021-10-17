/*
  Warnings:

  - Added the required column `possessedById` to the `UserMail` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserMail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emailId" INTEGER NOT NULL,
    "possessedById" INTEGER NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "typeOfBox" TEXT NOT NULL,
    CONSTRAINT "UserMail_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMail_possessedById_fkey" FOREIGN KEY ("possessedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMail_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMail_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserMail" ("emailId", "fromUserId", "id", "toUserId", "typeOfBox") SELECT "emailId", "fromUserId", "id", "toUserId", "typeOfBox" FROM "UserMail";
DROP TABLE "UserMail";
ALTER TABLE "new_UserMail" RENAME TO "UserMail";
CREATE UNIQUE INDEX "UserMail_emailId_fromUserId_toUserId_typeOfBox_key" ON "UserMail"("emailId", "fromUserId", "toUserId", "typeOfBox");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
