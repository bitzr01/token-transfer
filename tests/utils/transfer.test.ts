import 'dotenv/config';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ethers } from 'ethers';
import { describe, it } from 'mocha';

import transfer from '../../src/utils/transfer';

const expect = chai.expect;
chai.use(chaiAsPromised);

const contract = process.env.CONTRACT || '';
const to = '0x000000000000000000000000000000000000dEaD';
const amount = '0.0000013';

const provider = new ethers.providers.InfuraProvider('rinkeby', {
  projectId: process.env.INFURAID,
  projectSecret: process.env.INFURASECRET,
});
const signer: ethers.Wallet = new ethers.Wallet(
  process.env.PRIVATEKEY || '',
  provider,
);

describe('TransferTokens', () => {
  it('should throw error on invalid contract address', async () => {
    await expect(transfer('', to, amount, signer)).to.be.rejectedWith(
      `Invalid contract address`,
    );
  });

  it('should throw error on invalid to address', async () => {
    await expect(transfer(contract, '', amount, signer)).to.be.rejectedWith(
      `Invalid to address`,
    );
  });

  it('should throw error on invalid amount', async () => {
    await expect(transfer(contract, to, '', signer)).to.be.rejectedWith(
      `Invalid amount`,
    );
  });

  it('should throw error on to much decimals', async () => {
    await expect(
      transfer(contract, to, '0.0000000000000000001', signer),
    ).to.be.rejectedWith(`Invalid amount`);
  });

  it('should throw error when not enough tokens', async () => {
    await expect(transfer(contract, to, '10000', signer)).to.be.rejectedWith(
      `Not enough ETH or Tokens in wallet to make transaction`,
    );
  });

  it('should return txid', async () => {
    const txid = await transfer(contract, to, amount, signer);
    expect(txid).to.be.string;
    expect(txid.startsWith('0x')).to.be.true;
  });
});
