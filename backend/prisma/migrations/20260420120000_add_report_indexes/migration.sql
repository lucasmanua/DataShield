-- AddIndex
CREATE INDEX "Report_status_createdAt_idx" ON "Report"("status", "createdAt");

-- AddIndex
CREATE INDEX "Report_userId_createdAt_idx" ON "Report"("userId", "createdAt");

-- AddIndex
CREATE INDEX "Report_validatedBy_idx" ON "Report"("validatedBy");

-- AddIndex
CREATE INDEX "Report_phoneNumber_idx" ON "Report"("phoneNumber");

-- AddIndex
CREATE INDEX "Report_email_idx" ON "Report"("email");

-- AddIndex
CREATE INDEX "Report_bankAccount_idx" ON "Report"("bankAccount");
