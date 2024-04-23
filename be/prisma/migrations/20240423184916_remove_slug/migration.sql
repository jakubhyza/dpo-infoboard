/*
  Warnings:

  - You are about to drop the column `slug` on the `Infoboard` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Infoboard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "stops" TEXT NOT NULL,
    "layout" TEXT NOT NULL DEFAULT 'simple',
    "primaryColor" TEXT NOT NULL DEFAULT 'orange',
    "backgroundColor" TEXT NOT NULL DEFAULT 'black'
);
INSERT INTO "new_Infoboard" ("backgroundColor", "id", "layout", "primaryColor", "stops", "title") SELECT "backgroundColor", "id", "layout", "primaryColor", "stops", "title" FROM "Infoboard";
DROP TABLE "Infoboard";
ALTER TABLE "new_Infoboard" RENAME TO "Infoboard";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
