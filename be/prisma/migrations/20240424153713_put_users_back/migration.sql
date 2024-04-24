/*
  Warnings:

  - Added the required column `userId` to the `Infoboard` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Infoboard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "stops" TEXT NOT NULL,
    "layout" TEXT NOT NULL DEFAULT 'simple',
    "primaryColor" TEXT NOT NULL DEFAULT 'orange',
    "backgroundColor" TEXT NOT NULL DEFAULT 'black',
    CONSTRAINT "Infoboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Infoboard" ("backgroundColor", "id", "layout", "primaryColor", "stops", "title") SELECT "backgroundColor", "id", "layout", "primaryColor", "stops", "title" FROM "Infoboard";
DROP TABLE "Infoboard";
ALTER TABLE "new_Infoboard" RENAME TO "Infoboard";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
