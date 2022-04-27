import { Injectable, Logger } from '@nestjs/common';
import { Result } from '@badrap/result';
import { Transaction } from '@prisma/client';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class SaveTransactionHandler {
  constructor(private prisma: PrismaService, private logger: Logger) {}

  handle = async (transactionData: any): Promise<Result<Transaction>> => {
    try {
      const transactionHashExists = await this.prisma.transaction.findFirst({
        where: { transactionHash: transactionData.transactionHash },
      });

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
