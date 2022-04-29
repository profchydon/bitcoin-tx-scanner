import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { GetRawTxHandler } from './handlers/get-raw-tx.handler';

@Processor('rpc')
export class RpcProcessor {
  private readonly logger = new Logger(RpcProcessor.name);

  constructor(
    /**
     * Handler to get the raw transactions for a block
     */
    private getRawTx: GetRawTxHandler,
  ) {}

  @Process('sync')
  async handle(job: Job) {
    this.logger.debug('Sync intiated...');

    /**
     * For a given range of block heights, get the raw transactions for each block
     */
    setTimeout(() => {
      this.getRawTx.handle(job.data);
    }, 30000);

    this.logger.debug('Sync end.');
  }
}
