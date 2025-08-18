-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('kashmiriArtisiancollective', 'handicraftTrader', 'artisanNgo', 'womenLeadSelfHelpGroup', 'boutiqueWorkshop', 'individualartisan');

-- CreateTable
CREATE TABLE "Vendor" (
    "vendorId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "businessType" "BusinessType" NOT NULL,
    "location" TEXT NOT NULL,
    "yearsOfExperience" INTEGER,
    "businessDescription" TEXT NOT NULL,
    "idCard" TEXT NOT NULL,
    "giCertificate" TEXT,
    "sampleProductPhoto" TEXT NOT NULL,
    "businessRegistration" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("vendorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");
