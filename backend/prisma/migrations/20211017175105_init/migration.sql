/*
  Warnings:

  - You are about to drop the column `toId` on the `Email` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "UsersMail" (
    "emailId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "typeOfBox" TEXT NOT NULL,

    PRIMARY KEY ("userId", "emailId"),
    CONSTRAINT "UsersMail_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersMail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Email" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromId" INTEGER NOT NULL,
    "subject" TEXT,
    "message" TEXT,
    CONSTRAINT "Email_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Email" ("createdAt", "fromId", "id", "message") SELECT "createdAt", "fromId", "id", "message" FROM "Email";
DROP TABLE "Email";
ALTER TABLE "new_Email" RENAME TO "Email";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
