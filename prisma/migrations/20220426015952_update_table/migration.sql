/*
  Warnings:

  - You are about to drop the `transaction_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "transaction_data";

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "hexData" TEXT NOT NULL,
    "plainData" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "blockHash" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_transactionHash_key" ON "transaction"("transactionHash");
