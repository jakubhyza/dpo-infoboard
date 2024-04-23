-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Infoboard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "stops" TEXT NOT NULL,
    "layout" TEXT NOT NULL DEFAULT 'simple',
    "primaryColor" TEXT NOT NULL DEFAULT 'orange',
    "backgroundColor" TEXT NOT NULL DEFAULT 'black',
    "userId" TEXT NOT NULL,
    CONSTRAINT "Infoboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Infoboard_slug_key" ON "Infoboard"("slug");
