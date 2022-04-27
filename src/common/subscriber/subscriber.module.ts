import { Logger, Module } from '@nestjs/common';
import { RpcModule } from '../rpc/rpc.module';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [RpcModule],
  controllers: [],
  providers: [SubscriberService, Logger],
  exports: [SubscriberService],
})
export class SubscriberModule {}
