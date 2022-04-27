import { Controller, Get } from '@nestjs/common';
import { RpcService } from '../../common/rpc/rpc.service';

@Controller('opreturn')
export class TransactionController {
  constructor(private readonly rpcService: RpcService) {}

  @Get('sync')
  async triggerInitialSync() {
    try {
      const response = await this.rpcService.initialSync();
    } catch (error) {}
  }
}
