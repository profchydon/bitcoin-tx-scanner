import { Controller, Get } from '@nestjs/common';
import { RpcService } from './../common/rpc/rpc.service';
import { IResponse } from './../common/rpc/interfaces/response.interface';

@Controller('opreturn')
export class TransactionController {
  constructor(private readonly rpcService: RpcService) {}

  @Get()
  async triggerInitialSync() {
    try {
      const response = await this.rpcService.initialSync();
    } catch (error) {}
  }
}
