import { env } from 'process';

const RpcConfig = {
  /**
   * RPC protocol
   */
  protocol: 'http',

  /**
   * RPC User
   * This is set in the bitcoin.conf file
   */
  user: env.RPC_USER,

  /**
   * RPC Password
   * This is set in the bitcoin.conf file
   */
  pass: env.RPC_PASSWORD,

  /**
   * RPC Host
   * This is set in the bitcoin.conf file
   */
  host: env.RPC_HOST,

  /**
   * RPC Port
   * This is set in the bitcoin.conf file
   */
  port: env.RPC_PORT,
};

export default RpcConfig;
