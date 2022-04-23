import { env } from 'process';

const RpcConfig = {
  protocol: 'http',
  user: env.RPC_USER,
  pass: env.RPC_PASSWORD,
  host: env.RPC_HOST,
  port: env.RPC_PORT,
};

export default RpcConfig;
