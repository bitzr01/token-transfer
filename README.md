# TokenTransfer

ASSIGNMENT:
At FunTech, we want to use our own crypto token called FUN.

- Create an ERC20 token implementation of FUN token in Solidity. It should be mintable and burnable.
- Create the tooling and deploy it into a test net.
- Create a back-end module running on node.js that allows the transfer of FUN token from one address to another. For example a function transfer() allowing the sender to send token to a third party (assuming he has tokens)
- We want to be notified when a transfer is completed or it has failed. It could a simplie display to console for this exercise.

We just want to see basic understanding on how smart contracts work and how to interact with them. This should not take more than one hour. You can use the libraries and tools of your choice.

#####Plan:

Smart Contact
As it is a very simple ERC20 token i will use the openzeppelin contracts and remix instead of hardhat for deployment to rinkeby.

Back-end module
To make transactions we need to sign them with a private key. It is a simple back-end module to show basic understanding so a proper way of handling the private key is out of the scope of this assignment.
As this is usually done in the front-end i will create a function that can be used in the front or back-end and a script to call this function from the command line.

the function will take the following arguments:
- contractString
- toString
- amount
- signer


#####Result:
