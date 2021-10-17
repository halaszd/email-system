/*
  Warnings:

  - The primary key for the `UserMail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserMail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emailId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "typeOfBox" TEXT NOT NULL,
    CONSTRAINT "UserMail_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserMail" ("emailId", "typeOfBox", "userId") SELECT "emailId", "typeOfBox", "userId" FROM "UserMail";
DROP TABLE "UserMail";
ALTER TABLE "new_UserMail" RENAME TO "UserMail";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
