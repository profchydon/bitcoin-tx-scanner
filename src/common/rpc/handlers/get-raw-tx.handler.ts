import { Inject, Injectable, Logger } from '@nestjs/common';
import { RPC_CONFIG } from './../constants';
import { RpcConfig } from './../interfaces';
import RpcClient from 'bitcoind-rpc';
import { GetBlockHashHandler } from './get-block-hash.handler';
import { GetBlockHandler } from './get-block.handler';
import { SaveTransactionHandler } from './save-transaction.handle';
import { IResponse } from '../interfaces/response.interface';
import { Result } from '@badrap/result';

@Injectable()
export class GetRawTxHandler {
  private readonly rpcClient: RpcClient;

  constructor(
    @Inject(RPC_CONFIG) rpcConfig: RpcConfig,
    private getBlockHash: GetBlockHashHandler,
    private getBlock: GetBlockHandler,
    private saveTransaction: SaveTransactionHandler,
    private logger: Logger,
  ) {
    this.rpcClient = new RpcClient(rpcConfig);
  }

  /**
   * Given an array of block heights, loops to get the block hash and raw transactions for each block height
   * @param {Array} heightRange Array containing a range of block heights
   * @return {object} response
   */
  handle = (heightRange) => {
    try {
      heightRange.forEach(async (height) => {
        const response = await this.getBlockHash.handle(height);

        const hash: IResponse = response.unwrap();

        if (response.isErr) this.logger.error({ GET_BLOCK_HEIGHT_ERROR: hash });

        const block: any = await this.getBlock.handle(hash.result);

        const { result } = block.unwrap();

        const { vout } = result.tx[0];

        console.log(vout);
        

        vout.forEach(async (value) => {
          if (value.scriptPubKey.asm.includes('OP_RETURN')) {
            const strippedAsm = value.scriptPubKey.asm.replace(
              'OP_RETURN ',
              '',
            );

            const convert = (from, to) => (str) =>
              Buffer.from(str, from).toString(to);

            const hexToUtf8 = convert('hex', 'utf8');

            const plainData = hexToUtf8(strippedAsm);

            const data = {
              hexData: strippedAsm,
              transactionHash: result.tx[0].txid,
              plainData,
              blockHash: result.tx[0].hash,
            };

            const saveData = await this.saveTransaction.handle(data);

            if (saveData.isErr) this.logger.error({ GET_RAW_TX_ERROR: data });

            if (saveData.isOk) return Result.ok(saveData);
          }
        });
      });
    } catch (error) {
      this.logger.error(error);
      return Result.err(error);
    }
  };
}
