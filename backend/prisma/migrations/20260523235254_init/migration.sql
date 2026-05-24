-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CITIZEN',
    "region" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fraudType" TEXT NOT NULL DEFAULT 'OTHER',
    "phoneNumber" TEXT,
    "email" TEXT,
    "bankAccount" TEXT,
    "url" TEXT,
    "socialMediaProfile" TEXT,
    "region" TEXT,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "validatedBy" INTEGER,
    CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Report_validatedBy_fkey" FOREIGN KEY ("validatedBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,
    CONSTRAINT "Evidence_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompromiseIndicator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'phone',
    "value" TEXT NOT NULL,
    "description" TEXT,
    "reportId" INTEGER NOT NULL,
    CONSTRAINT "CompromiseIndicator_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "indicator" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Report_status_createdAt_idx" ON "Report"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Report_userId_createdAt_idx" ON "Report"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Report_validatedBy_idx" ON "Report"("validatedBy");

-- CreateIndex
CREATE INDEX "Report_phoneNumber_idx" ON "Report"("phoneNumber");

-- CreateIndex
CREATE INDEX "Report_email_idx" ON "Report"("email");

-- CreateIndex
CREATE INDEX "Report_bankAccount_idx" ON "Report"("bankAccount");

-- CreateIndex
CREATE INDEX "Report_url_idx" ON "Report"("url");

-- CreateIndex
CREATE INDEX "Report_fraudType_idx" ON "Report"("fraudType");

-- CreateIndex
CREATE INDEX "Report_region_idx" ON "Report"("region");

-- CreateIndex
CREATE INDEX "CompromiseIndicator_type_value_idx" ON "CompromiseIndicator"("type", "value");

-- CreateIndex
CREATE UNIQUE INDEX "Alert_indicator_type_key" ON "Alert"("indicator", "type");
