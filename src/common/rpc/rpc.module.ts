import { Module } from '@nestjs/common';
import { RpcService } from './rpc.service';
import RpcConfig from './rpc.config';
import { RPC_CONFIG } from './constants';

@Module({
  imports: [],
  providers: [
    RpcService,
    {
      provide: RPC_CONFIG,
      useValue: RpcConfig,
    },
  ],
  exports: [RpcService],
})
export class RpcModule {}
