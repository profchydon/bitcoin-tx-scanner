import { Injectable } from '@nestjs/common';
import { IResponse } from './interfaces/response.interface';
import { GetBlockCountHandler } from './handlers/get-block-count.handler';
import { GetRawTxHandler } from './handlers/get-raw-tx.handler';

@Injectable()
export class RpcService {
  constructor(
    private getBlockCount: GetBlockCountHandler,
    private getRawTx: GetRawTxHandler,
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
    const response = await this.getBlockCount.handle();

    /**
     * At the time of writing this code, the current block height was 87571
     * It will be memory intensive to process all 87571 records at a go
     * So 87571 blocks will be proccessed in a batch of ${chunkSize} each
     * That is, 2000 records in each batch.
     */
    const chunkSize = 10;

    let start = 0;

    // const chunks = Math.ceil(response.result / chunkSize);
    const chunks = Math.ceil(10 / chunkSize);

    for (let i = 0; i < chunks; i++) {
      const heightRange = [...Array(chunkSize).keys()].map((x) => x + start);

      // setInterval(await this.getRawTxs(heightRange), [2000]);
      await this.getRawTx.handle(heightRange);

      start = chunkSize * (i + 1);
    }
  };
}
