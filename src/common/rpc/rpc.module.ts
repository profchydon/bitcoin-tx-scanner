import { Logger, Module } from '@nestjs/common';
import { RpcService } from './rpc.service';
import RpcConfig from './rpc.config';
import { RPC_CONFIG } from './constants';
import { PrismaModule } from '../prisma/prisma.module';
import { GetBlockHashHandler } from './handlers/get-block-hash.handler';
import { GetBlockHandler } from './handlers/get-block.handler';
import { SaveTransactionHandler } from './handlers/save-transaction.handle';
import { GetRawTxHandler } from './handlers/get-raw-tx.handler';
import { GetBlockCountHandler } from './handlers/get-block-count.handler';
import { InitialSyncHandler } from './handlers/initial-sync.handler';
import { DecodeRawTxHandler } from './handlers/decode-raw-tx-handler';

@Module({
  imports: [PrismaModule],
  providers: [
    GetBlockCountHandler,
    GetRawTxHandler,
    GetBlockHashHandler,
    GetBlockHandler,
    SaveTransactionHandler,
    InitialSyncHandler,
    DecodeRawTxHandler,
    RpcService,
    Logger,
    {
      provide: RPC_CONFIG,
      useValue: RpcConfig,
    },
  ],
  exports: [RpcService, DecodeRawTxHandler, SaveTransactionHandler],
})
export class RpcModule {}
