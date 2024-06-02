# Mina zkApp: Dsid Mock Up

This repository contains the initial prototype for the DSID Mina demo, the contract will use experimental Offchain storage to deal with registration 
and update of information for a particular account.


# The case for Mina blockchain as an account aggregator for DSID multiblockchain solution:

Part of our experience with Mina has led us to recognize the capabilities of the offchain storage, as it is publicaly known the off-chain storage of Mina and o1js functions by allowing data to be stored outside the main blockchain while still being verifiable and accessible when needed, of course instead of storing the actual data on the blockchain, a reference or hash of the data is often stored on-chain. This reference can be used to verify the integrity and authenticity of the off-chain data whenever it is requested.

When the off-chain data needs to be accessed or verified, smart contracts or other mechanisms can be used to retrieve the data from the off-chain storage, validate it, and perform necessary actions based on the data. Both Mina and o1js ensure that the off-chain data remains available and accessible to authorized parties, maintaining transparency and reliability in data storage and retrieval processes.

Taking this brief explanation into account, the current DSID proposal for a multichain account aggregator states that it is not only possible but prefferable to use Mina's offchain capabilities to store data and signatures that come from an user account. 

This allows DSID solution to store important information of the user, and at the same time store signatures of different blockchains to Mina itself, thus effectively enabling the solution as a multichain account aggregator, it is not neccesary to bridge anything from external blockchains to Mina, it is only necessary to store the corresponding signatures for on demand future validations. At this moment is not on the scope of the proyect to implement a direct interaction between Mina's blockchain and another blockchain.

# Project description:

The current state of the repository contains two folders, the 'contracts' folder and the 'ui' folder

## Contracts folder:

This folder contains all the necessary code for implementing DSID's Smart contracts for the current version of the prototype, in the same fashion it contains a README file that describes the internal structure of the backend of the ZKApp

## UI folder:

This folder contains all the necessary code for implementing DSID's Web app for the current version of the prototype, in the same fashion it contains a README file that describes the internal structure of the frontend of the ZKApp

# Prerequisites for developing

## Dependencies

* NodeJS v18 and later
* NPM v10 and later
* [Typescript](https://www.youtube.com/watch?v=ahCwqrYpIuM&ab_channel=Fireship)
* git v2 and later
* Running ```npm install -g zkapp-cli``` in your terminal and then ```zk --version``` just to verify that everything runs as expected


# Additional setup for the project

In the general sense the project follows the guidelines found on [MINA's getting stared](https://docs.minaprotocol.com/zkapps/writing-a-zkapp/introduction-to-zkapps/getting-started-zkapps) and [MINA's offchain storage feature](https://docs.minaprotocol.com/zkapps/writing-a-zkapp/feature-overview/offchain-storage), so any kind of initial configuration for a testing and mainnet environment can be followed from there, nonetheless at this current stage the only needed configuration comes as it follows:

* Go to each folder
* Write in your terminal: ```npm i```
* Check the package.json files for useful commands. E.g. In the contracts folder you could use ```npm run build``` to check overall integrity of the contract development and then you can run ```npm run test``` to check if the project is passing unit tests


## License

[THE UNLICENSE](LICENSE)
