-- CreateTable
CREATE TABLE "transaction_data" (
    "id" TEXT NOT NULL,
    "hexData" TEXT NOT NULL,
    "plainData" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "blockHash" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_data_pkey" PRIMARY KEY ("id")
);
