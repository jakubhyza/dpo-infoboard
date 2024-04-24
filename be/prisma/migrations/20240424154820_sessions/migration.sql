/*
  Warnings:

  - You are about to drop the column `sessionId` on the `UserSessions` table. All the data in the column will be lost.
  - The required column `token` was added to the `UserSessions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    CONSTRAINT "UserSessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserSessions" ("id", "userId") SELECT "id", "userId" FROM "UserSessions";
DROP TABLE "UserSessions";
ALTER TABLE "new_UserSessions" RENAME TO "UserSessions";
CREATE UNIQUE INDEX "UserSessions_token_key" ON "UserSessions"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
