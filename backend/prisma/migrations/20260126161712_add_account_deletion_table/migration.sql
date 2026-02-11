-- CreateTable
CREATE TABLE "AccountDeletion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reasons" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountDeletion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountDeletion" ADD CONSTRAINT "AccountDeletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
