import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from 'src/common/interceptors/response-transform.interceptor';
import { RpcService } from '../../common/rpc/rpc.service';
import { GetTransactionHandler } from './handlers/get-transaction.handler';

@Controller('opreturn')
export class TransactionController {
  constructor(
    private readonly rpcService: RpcService,
    private getTransaction: GetTransactionHandler,
  ) {}

  @Get('sync')
  async triggerInitialSync() {
    try {
      const response = await this.rpcService.initialSync();
    } catch (error) {}
  }
  @Get(':opReturnData')
  @UseInterceptors(ResponseInterceptor)
  async getTransactions(@Param('opReturnData') opReturnData: string) {
    try {
      const transactions = await this.getTransaction.handle(opReturnData);
      return {
        message: 'Success',
        response: transactions,
      };
    } catch (error) {}
  }
}
