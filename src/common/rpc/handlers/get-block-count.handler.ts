import { Inject, Injectable, Logger } from '@nestjs/common';
import { RPC_CONFIG } from './../constants';
import { RpcConfig } from './../interfaces';
import RpcClient from 'bitcoind-rpc';
import { Result } from '@badrap/result';

@Injectable()
export class GetBlockCountHandler {
  private readonly rpcClient: RpcClient;

  constructor(
    @Inject(RPC_CONFIG) rpcConfig: RpcConfig,
    private logger: Logger,
  ) {
    this.rpcClient = new RpcClient(rpcConfig);
  }

  /**
   * Gets the current block height of the bitcoin blockchain
   * @return {object} response
   */
  handle = async () => {
    try {
      const response = await new Promise((resolve, reject) => {
        this.rpcClient.getblockcount((error, data) => {
          if (error) return reject(error);
          resolve(data);
        });
      });

      if (!response) {
        return Result.err(new Error('get-block-count'));
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
