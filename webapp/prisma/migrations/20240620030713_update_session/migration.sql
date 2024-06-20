-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "approve" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'member';
