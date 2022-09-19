-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_productRequestId_fkey";

-- DropForeignKey
ALTER TABLE "ProductRequest" DROP CONSTRAINT "ProductRequest_userId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productRequestId_fkey" FOREIGN KEY ("productRequestId") REFERENCES "ProductRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRequest" ADD CONSTRAINT "ProductRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
