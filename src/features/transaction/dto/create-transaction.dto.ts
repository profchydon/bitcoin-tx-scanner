import { IsNotEmpty, IsString } from 'class-validator';

export class TransactionDto {
  constructor(
    id: string,
    hexData: string,
    plainData: string,
    transactionHash: string,
    blockHash: string
  ) {
    this.id = id;
    this.hexData = hexData;
    this.plainData = plainData;
    this.transactionHash = transactionHash;
    this.blockHash = blockHash;
  }

  @IsNotEmpty()
  @IsString()
  public id: string;

  @IsNotEmpty()
  @IsString()
  public hexData: string;

  @IsNotEmpty()
  @IsString()
  public plainData: string;

  @IsNotEmpty()
  @IsString()
  public transactionHash: string;

  @IsNotEmpty()
  @IsString()
  public blockHash: string;

}