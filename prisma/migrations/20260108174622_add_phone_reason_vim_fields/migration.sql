/*
  Warnings:

  - A unique constraint covering the columns `[calComUid]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "attendeePhoneNumber" TEXT,
ADD COLUMN     "reason" TEXT,
ADD COLUMN     "vim" TEXT;

-- AlterTable
ALTER TABLE "webhook_logs" ADD COLUMN     "processingTime" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "appointments_calComUid_key" ON "appointments"("calComUid");

-- CreateIndex
CREATE INDEX "appointments_calComUid_idx" ON "appointments"("calComUid");

-- CreateIndex
CREATE INDEX "webhook_logs_success_idx" ON "webhook_logs"("success");
