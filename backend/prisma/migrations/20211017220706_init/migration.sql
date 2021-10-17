/*
  Warnings:

  - You are about to drop the column `userId` on the `UserMail` table. All the data in the column will be lost.
  - Added the required column `fromUserId` to the `UserMail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `UserMail` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserMail_emailId_userId_key";

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
INSERT INTO "new_UserMail" ("emailId", "typeOfBox") SELECT "emailId", "typeOfBox" FROM "UserMail";
DROP TABLE "UserMail";
ALTER TABLE "new_UserMail" RENAME TO "UserMail";
CREATE UNIQUE INDEX "UserMail_emailId_fromUserId_toUserId_key" ON "UserMail"("emailId", "fromUserId", "toUserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
