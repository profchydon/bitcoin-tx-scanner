import { Test, TestingModule } from '@nestjs/testing';
import { RpcService } from './rpc.service';
import { RPC_CONFIG } from './constants';
import RpcConfig from './rpc.config';

jest.mock('dotenv');

describe('RpcService', () => {
  let rpcService: RpcService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RpcService,
        {
          provide: RPC_CONFIG,
          useValue: RpcConfig,
        },
      ],
    }).compile();

    rpcService = moduleRef.get<RpcService>(RpcService);
  });

  it('should be defined', () => {
    expect(rpcService).toBeDefined();
  });
});
