/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import 'dotenv/config';

import { ethers } from 'ethers';

import EthersError from './utils/EthersError';
import transfer from './utils/transfer';

const contract = process.env.CONTRACT || '';
const to = process.argv[2];
const amount = process.argv[3];
try {
  const provider = new ethers.providers.InfuraProvider('rinkeby', {
    projectId: process.env.INFURAID,
    projectSecret: process.env.INFURASECRET,
  });
  const signer: ethers.Wallet = new ethers.Wallet(
    process.env.PRIVATEKEY || '',
    provider,
  );
  console.info(`transfer ${amount} to ${to}`);
  transfer(contract, to, amount, signer)
    .then((txid: string) => {
      console.info(`transfer completed: \n${txid}`);
    })
    .catch((e: Error) => {
      console.error(e.message);
    });
} catch (e) {
  const error: EthersError = e as EthersError;
  if (error.code === ethers.errors.INVALID_ARGUMENT) {
    switch (error.value) {
      case process.env.PRIVATEKEY:
      case '':
        console.error('Invalid private key');
        break;
      default:
        console.error(error.reason);
    }
  } else {
    console.error(e);
  }
}
