import { Injectable, Logger } from '@nestjs/common';
import { Result } from '@badrap/result';
import { Transaction } from '@prisma/client';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class SaveTransactionHandler {
  constructor(private prisma: PrismaService, private logger: Logger) {}

  /**
   * @param {object} transactionData The transaction data object to be saved
   * @return {object} transaction
   */
  handle = async (transactionData: any): Promise<Result<Transaction>> => {
    try {

      /**
       * Check if transaction hash exists in the DB. 
       * If yes, then this transaction has been processed before
       * We don't want to duplicate records in the DB
       */
      const transactionHashExists = await this.prisma.transaction.findFirst({
        where: { transactionHash: transactionData.transactionHash },
      });

      /**
       * Save transaction data in the DB
       */
      if (!transactionHashExists) {
        const transaction = await this.prisma.transaction.create({
          data: {
            hexData: transactionData.hexData,
            transactionHash: transactionData.transactionHash,
            plainData: transactionData.plainData,
            blockHash: transactionData.blockHash,
          },
        });

        return Result.ok(transaction);
      }
    } catch (error) {
      this.logger.error(error);
      return Result.err(error);
    }
  };
}
