import { Inject, Injectable, Logger } from '@nestjs/common';
import { RPC_CONFIG } from './../constants';
import { RpcConfig } from './../interfaces';
import RpcClient from 'bitcoind-rpc';
import { Result } from '@badrap/result';

@Injectable()
export class GetBlockHandler {
  private readonly rpcClient: RpcClient;

  constructor(
    @Inject(RPC_CONFIG) rpcConfig: RpcConfig,
    private logger: Logger,
  ) {
    this.rpcClient = new RpcClient(rpcConfig);
  }

  /**
   * For a given block hash, gets the raw transactions contained in the block
   * @param {string} hash The block hash for which all transactions in the block is to be retrieved
   * @return {object} response
   */
  handle = async (hash) => {
    try {
      const response = await new Promise((resolve, reject) => {
        this.rpcClient.getblock(hash, 2, (error, res) => {
          if (error) return reject(error);
          resolve(res);
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
