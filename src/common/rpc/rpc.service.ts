import { Injectable } from '@nestjs/common';
import { GetBlockCountHandler } from './handlers/get-block-count.handler';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class RpcService {
  constructor(
    @InjectQueue('rpc') private rpcQueue: Queue,
    private getBlockCount: GetBlockCountHandler,
  ) {}

  /**
   * Retrieves all the transaction on the blockchain up to the lastest mined block
   * Loop through all transactions in chunks
   * Get raw transactions
   * Filter and store only transaction with OP_RETURN data
   * @return {object} response
   */
  initialSync = async () => {
    //Get current block height
    const response: any = await this.getBlockCount.handle();

    /**
     * At the time of writing this code, the current block height was 87571
     * It will be memory intensive to process all 87571 records at a go
     * So 87571 blocks will be proccessed in a batch of ${chunkSize} each
     * That is, 200 records in each batch.
     */
    const chunkSize = 2000;

    let start = 0;

    const chunks = Math.ceil(response.result / chunkSize);
    // const chunks = Math.ceil(5000 / chunkSize);

    for (let i = 0; i < chunks; i++) {
      const heightRange = [...Array(chunkSize).keys()].map((x) => x + start);
      // console.log(heightRange);
      // await this.rpcQueue.empty();

      /**
       * Add job in a queue
       */
      await this.rpcQueue.add(
        'sync',
        {
          heightRange,
        },
        { delay: 10000 }, // 10 seconds delayed
      );

      start = chunkSize * (i + 1);
    }
  };
}
