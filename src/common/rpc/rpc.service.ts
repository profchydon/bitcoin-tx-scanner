import { Inject, Injectable } from '@nestjs/common';
import { RPC_CONFIG } from './constants';
import { RpcConfig } from './interfaces';
import RpcClient from 'bitcoind-rpc';
import { IResponse } from './interfaces/response.interface';

@Injectable()
export class RpcService {
  private readonly rpcClient: RpcClient;

  constructor(@Inject(RPC_CONFIG) rpcConfig: RpcConfig) {
    this.rpcClient = new RpcClient(rpcConfig);
  }

  /**
   * Gets the current block height of the bitcoin blockchain
   * @return {object} response
   */
  getBlockCount = () => {
    try {
      const response = new Promise((resolve, reject) => {
        this.rpcClient.getblockcount((error, data) => {
          if (error) return reject(error);
          resolve(data);
        });
      });

      if (response) {
        return response;
      }
    } catch (error) {}
  };

  /**
   * For a given block height, gets the correspondng blockhash
   * @param {number} height The block height for which the corresponding block hash is to retrieved
   * @return {object} response
   */
  getBlockHash = (height) => {
    try {
      const response = new Promise((resolve, reject) => {
        this.rpcClient.getblockhash(height, (error, data) => {
          if (error) return reject(error);
          resolve(data);
        });
      });

      if (response) {
        return response;
      }
    } catch (error) {}
  };

  /**
   * For a given block hash, gets the raw transactions contained in the block
   * @param {string} hash The block hash for which all transactions in the block is to be retrieved
   * @return {object} response
   */
  getBlock = (hash) => {
    try {
      const response = new Promise((resolve, reject) => {
        this.rpcClient.getblock(hash, 2, (error, res) => {
          if (error) return reject(error);
          resolve(res);
        });
      });

      if (response) {
        return response;
      }
    } catch (error) {}
  };

  /**
   * Given an array of block heights, loops to get the block hash and raw transactions for each block height
   * @param {Array} heightRange Array containing a range of block heights
   * @return {object} response
   */
  getRawTxs(heightRange) {
    heightRange.forEach(async (height) => {
      const hash: IResponse = await this.getBlockHash(height);
      const block = await this.getBlock(hash.result);
    });
  }

  /**
   * Retrieves all the transaction on the blockchain up to the lastest mined block
   * Loop through all transactions in chunks
   * Get raw transactions
   * Filter and store only transaction with OP_RETURN data
   * @return {object} response
   */
  initialSync = async () => {
    //Get current block height
    const response: IResponse = await this.getBlockCount();

    /**
     * At the time of writing this code, the current block height was 87571
     * It will be memory intensive to process all 87571 records at a go
     * So 87571 blocks will be proccessed in a batch of ${chunkSize} each
     * That is, 2000 records in each batch.
     */
    const chunkSize = 2000;

    let start = 0;

    const chunks = Math.ceil(Number(response.result / chunkSize));

    for (let i = 0; i < chunks; i++) {
      const heightRange = [...Array(chunkSize).keys()].map((x) => x + start);

      const blocks = await this.getRawTxs(heightRange);

      start = chunkSize * (i + 1);
    }
  };
}
