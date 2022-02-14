# TokenTransfer

ASSIGNMENT:
At FunTech, we want to use our own crypto token called FUN.

- Create an ERC20 token implementation of FUN token in Solidity. It should be mintable and burnable.
- Create the tooling and deploy it into a test net.
- Create a back-end module running on node.js that allows the transfer of FUN token from one address to another. For example a function transfer() allowing the sender to send token to a third party (assuming he has tokens)
- We want to be notified when a transfer is completed or it has failed. It could a simplie display to console for this exercise.

We just want to see basic understanding on how smart contracts work and how to interact with them. This should not take more than one hour. You can use the libraries and tools of your choice.

##### Plan:
As it is a very simple ERC20 token i will use the openzeppelin contracts and remix instead of hardhat for deployment to rinkeby.

To make transactions we need to sign them with a private key. It is a simple back-end module to show basic understanding so a proper way of handling the private key is out of the scope of this assignment.
As this is usually done in the front-end i will create a function that can be used in the front or back-end and a script to call this function from the command line.

the function will take the following arguments:
- contractString
- toString
- amount
- signer


##### Result:


0xb30f47d1eE482F5886c8BaA76E32ad083Ea56A7A
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YFunToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Fun Token", "FUN") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```
[contracts/YFuntoken.sol](contracts/YFuntoken.sol)


Transfer function
[src/utils/transfer.ts](src/utils/transfer.ts)

Script
[src/transfer.ts](src/transfer.ts)

Environment variables
- PRIVATEKEY
- INFURAID
- INFURASECRET
- CONTRACT

run
```zsh
npm i
npm run build
npm run transfer [address] [amount]
```


