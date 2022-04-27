import { Module } from '@nestjs/common';
import { RpcModule } from 'src/common/rpc/rpc.module';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [RpcModule],
  controllers: [TransactionController],
  providers: [],
  exports: [],
})
export class TransactionModule {}
