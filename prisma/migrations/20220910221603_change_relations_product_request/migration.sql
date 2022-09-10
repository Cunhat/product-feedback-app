-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_productRequestId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "productRequestId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productRequestId_fkey" FOREIGN KEY ("productRequestId") REFERENCES "ProductRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
