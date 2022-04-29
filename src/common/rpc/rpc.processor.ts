import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { GetRawTxHandler } from './handlers/get-raw-tx.handler';

@Processor('rpc')
export class RpcProcessor {
  private readonly logger = new Logger(RpcProcessor.name);

  constructor(private getRawTx: GetRawTxHandler) {}

  @Process('sync')
  async handle(job: Job) {

    
    this.logger.debug('Sync intiated...');

    await this.getRawTx.handle(job.data);

    this.logger.debug('Sync end.');

  }
}
