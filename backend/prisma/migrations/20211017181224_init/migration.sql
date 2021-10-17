/*
  Warnings:

  - You are about to drop the `UsersMail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UsersMail";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserMail" (
    "emailId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "typeOfBox" TEXT NOT NULL,

    PRIMARY KEY ("userId", "emailId"),
    CONSTRAINT "UserMail_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
