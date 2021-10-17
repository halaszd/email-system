/*
  Warnings:

  - You are about to drop the column `fromId` on the `Email` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Email" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" TEXT,
    "message" TEXT
);
INSERT INTO "new_Email" ("createdAt", "id", "message", "subject") SELECT "createdAt", "id", "message", "subject" FROM "Email";
DROP TABLE "Email";
ALTER TABLE "new_Email" RENAME TO "Email";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
