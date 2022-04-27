import { Injectable, Logger } from '@nestjs/common';
import * as zmq from 'zeromq';
import { DecodeRawTxHandler } from '../rpc/handlers/decode-raw-tx-handler';
import { SaveTransactionHandler } from './../rpc/handlers/save-transaction.handle';

@Injectable()
export class SubscriberService {
  private readonly sock;

  constructor(
    private decodeRawTx: DecodeRawTxHandler,
    private saveTransaction: SaveTransactionHandler,
    private logger: Logger,
  ) {
    this.sock = zmq.socket('sub');
    this.sock.connect('tcp://127.0.0.1:3001');
    this.sock.subscribe('rawtx');
    this.listener();
  }

  listener() {
    this.sock.on('message', async (topic, message) => {
      if (topic.toString() === 'rawtx') {
        // Message is a buffer. But we want it as a hex string.
        const rawTx = message.toString('hex');

        const response: any = await this.decodeRawTx.handle(rawTx);

        if (response.isErr)
          this.logger.error({ SUBSCRIBER_ERROR_DECODE_RAW_TX: rawTx });

        const { result } = response.unwrap();

        // console.log(result);

        const { vout, txid, hash } = result;

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
              transactionHash: txid,
              plainData,
              blockHash: hash,
            };

            const saveData = await this.saveTransaction.handle(data);

            if (saveData.isErr) this.logger.error({ GET_RAW_TX_ERROR: data });

            if (saveData.isOk)
              this.logger.log({ NEW_TX_WITH_OP_RETURN_DATA: data });
          }
        });
      }
    });
  }
}
