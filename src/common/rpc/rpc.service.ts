import { Inject, Injectable } from '@nestjs/common';
import { RPC_CONFIG } from './constants';
import { RpcConfig } from './interfaces';
import RpcClient from 'bitcoind-rpc';

@Injectable()
export class RpcService {
  private readonly rpcClient: RpcClient;

  constructor(@Inject(RPC_CONFIG) rpcConfig: RpcConfig) {
    this.rpcClient = new RpcClient(rpcConfig);
  }
}
