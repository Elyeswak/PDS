-- DropIndex
DROP INDEX "appointments_calComBookingId_key";

-- CreateIndex
CREATE INDEX "appointments_calComBookingId_idx" ON "appointments"("calComBookingId");
