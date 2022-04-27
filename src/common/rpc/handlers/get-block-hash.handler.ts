import { Inject, Injectable, Logger } from '@nestjs/common';
import { RPC_CONFIG } from './../constants';
import { RpcConfig } from './../interfaces';
import RpcClient from 'bitcoind-rpc';
import { Result } from '@badrap/result';

@Injectable()
export class GetBlockHashHandler {
  private readonly rpcClient: RpcClient;

  constructor(
    @Inject(RPC_CONFIG) rpcConfig: RpcConfig,
    private logger: Logger,
  ) {
    this.rpcClient = new RpcClient(rpcConfig);
  }

  /**
   * For a given block height, gets the correspondng blockhash
   * @param {number} height The block height for which the corresponding block hash is to retrieved
   * @return {object} response
   */
  handle = async (height) => {
    try {
      const response = await new Promise((resolve, reject) => {
        this.rpcClient.getblockhash(height, (error, data) => {
          if (error) return reject(error);
          resolve(data);
        });
      });

      if (!response) {
        return Result.err(new Error('get-block-hash'));
      }

      if (response) {
        return Result.ok(response);
      }
    } catch (error) {
      this.logger.error(error);
      return Result.err(error);
    }
  };
}
