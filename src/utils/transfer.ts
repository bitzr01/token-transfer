import { ethers } from 'ethers';

import { TransferContract__factory } from '../../types/ethers-contracts/factories/TransferContract__factory';
import EthersError from './EthersError';

/**
 * Transfers tokens from holders address to another.
 * @param {string} contractString - The address of the contract you want to interact with.
 * @param {string} toString - The address of the recipient.
 * @param {string} amount - The amount of tokens to transfer.
 * @param {ethers.Signer} signer - The signer object that will be used to sign the transaction.
 * @returns The hash of the transaction.
 */
export default async function transfer(
  contractString: string,
  toString: string,
  amount: string,
  signer: ethers.Signer,
): Promise<string> {
  if (!ethers.utils.isAddress(contractString)) {
    throw new Error('Invalid contract address');
  }

  if (!ethers.utils.isAddress(toString)) {
    throw new Error('Invalid to address');
  }

  // eslint-disable-next-line no-underscore-dangle
  if (!signer._isSigner) {
    throw new Error('Invalid signer');
  }

  try {
    const toAddress = ethers.utils.getIcapAddress(toString);
    const contractAddress = ethers.utils.getIcapAddress(contractString);
    const contract = TransferContract__factory.connect(contractAddress, signer);
    const decimals: number = await contract.decimals();
    const realAmount: ethers.BigNumber = ethers.utils.parseUnits(
      amount,
      decimals,
    );

    const tx = await contract.transfer(toAddress, realAmount);
    const res = await tx.wait();
    if (res.status === 1 && res.confirmations > 0) {
      return tx.hash;
    }

    throw new Error('Transaction failed');
  } catch (e) {
    const error = e as EthersError;

    if (error.code === ethers.errors.NUMERIC_FAULT) {
      throw new Error('Invalid amount');
    }

    if (error.code === ethers.errors.INVALID_ARGUMENT) {
      switch (error.value) {
        case amount:
          throw new Error('Invalid amount');
        default:
          throw new Error(error.reason);
      }
    }

    if (error.code === ethers.errors.UNPREDICTABLE_GAS_LIMIT) {
      throw new Error('Not enough ETH or Tokens in wallet to make transaction');
    }

    throw new Error(error.reason);
  }
}
