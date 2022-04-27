import { Inject, Injectable, Logger } from '@nestjs/common';
import { RPC_CONFIG } from '../constants';
import { RpcConfig } from '../interfaces';
import RpcClient from 'bitcoind-rpc';
import { Result } from '@badrap/result';

@Injectable()
export class DecodeRawTxHandler {
  private readonly rpcClient: RpcClient;

  constructor(
    @Inject(RPC_CONFIG) rpcConfig: RpcConfig,
    private logger: Logger,
  ) {
    this.rpcClient = new RpcClient(rpcConfig);
  }

  /**
   * Gets the raw Tx for a given raw Tx hex
   * @param {string} hex The hex string 
   * @return {object} response
   */
  handle = async (hex) => {
    try {
      const response = await new Promise((resolve, reject) => {
        this.rpcClient.decoderawtransaction(hex, (error, res) => {
          if (error) return reject(error);
          resolve(res);
        });
      });

      if (!response) {
        return Result.err(new Error('decode-raw-tx'));
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
