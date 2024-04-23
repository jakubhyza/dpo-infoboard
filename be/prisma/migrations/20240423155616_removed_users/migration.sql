/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `Infoboard` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Infoboard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "stops" TEXT NOT NULL,
    "layout" TEXT NOT NULL DEFAULT 'simple',
    "primaryColor" TEXT NOT NULL DEFAULT 'orange',
    "backgroundColor" TEXT NOT NULL DEFAULT 'black'
);
INSERT INTO "new_Infoboard" ("backgroundColor", "id", "layout", "primaryColor", "slug", "stops", "title") SELECT "backgroundColor", "id", "layout", "primaryColor", "slug", "stops", "title" FROM "Infoboard";
DROP TABLE "Infoboard";
ALTER TABLE "new_Infoboard" RENAME TO "Infoboard";
CREATE UNIQUE INDEX "Infoboard_slug_key" ON "Infoboard"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
