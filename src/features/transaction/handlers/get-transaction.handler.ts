import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../../../common/prisma/prisma.service';
import { GetTransactionResponse } from '../dto/get-transaction-response.dto';

@Injectable()
export class GetTransactionHandler {
  constructor(private prisma: PrismaService, private logger: Logger) {}

  handle = async (opReturnData: string): Promise<GetTransactionResponse> => {
    try {
      const transactions = await this.prisma.transaction.findMany({
        where: {
          hexData: opReturnData,
        },
      });

      if (!transactions)
        throw new NotFoundException(
          `Transaction with OP_RETURN DATA #${opReturnData} not found`,
        );

      return transactions;
    } catch (error) {
      this.logger.error(error);
    }
  };
}
