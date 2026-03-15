/*
  Warnings:

  - You are about to drop the column `sender` on the `SupportMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SupportMessage" DROP COLUMN "sender",
ADD COLUMN     "senderId" TEXT,
ADD COLUMN     "senderRole" "MessageSender" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "SupportMessage" ADD CONSTRAINT "SupportMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
