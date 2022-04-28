import { Logger, Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RpcModule } from 'src/common/rpc/rpc.module';
import { GetTransactionHandler } from './handlers/get-transaction.handler';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [RpcModule],
  controllers: [TransactionController],
  providers: [PrismaService, Logger, GetTransactionHandler],
  exports: [],
})
export class TransactionModule {}
