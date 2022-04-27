import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { RpcModule } from './common/rpc/rpc.module';
import { TransactionModule } from './features/transaction/transaction.module';

@Module({
  imports: [
    RpcModule,
    TransactionModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
