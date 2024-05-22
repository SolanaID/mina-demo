# Mina zkApp: Dsid Mock Up

This contains the initial prototype for the DSID Mina demo, the contract will use experimental Offchain storage to deal with registration and update of information for a particular account.

# Architecture behind the contract

In the current stages of the project the objective is to implement a smart contract that acts as a front for an [Offchain storage](https://docs.minaprotocol.com/zkapps/writing-a-zkapp/feature-overview/offchain-storage) on the MINA network. This contract should have the basic C.R.U functions (create, read, update) for the correct interaction between a DSID user and the Offchain storage, once this has been achieved the most basic backend prototype for DSID solution will be ready for later expansion in terms of high availability and concurrent calls.

# Basic structures
The current version of the contract ecosystem works with a set of [structs](https://github.com/o1-labs/docs2/blob/main/examples/zkapps/05-common-types-and-functions/src/main.ts) and a [OffchainState](https://docs.minaprotocol.com/zkapps/o1js-reference/namespaces/Experimental/functions/OffchainState) that follows the principles found on [the feature overview of the Offchain Storage](https://docs.minaprotocol.com/zkapps/writing-a-zkapp/feature-overview/offchain-storage), again the basic idea is to use an [Offchain based Merkle map](https://docs.minaprotocol.com/zkapps/o1js-reference/classes/MerkleMap) to store and verify the data packaged in structs.

Currently the proposed data structures to achieve this are the following:

* metadata: Should contain rough information of the user that will be used for later validation (E.g network of the address, age, sex, etc.).
* linkedWeb2Accounts: It is an array of structs that will save basic information about linked web2 accounts for the address of the user.
* linkedWeb3Accounts: It is an array of structs that will save basic information about linked web3 accounts for the address of the user.
* claimedRewards: It is an array of structs that will save basic information about the claimed DSID rewards for that particular account.
* trustedAccounts: Proposed for later stages of the project, it is an array of structs that will save basic information about web3 accounts that should have access to the identity values of the user, one could think of this as a whitelist of addresses.

For a more in depth description of the structures used check the [Structs folder](smart-contracts/MinaV1/Schemas/Structs)


# Additional data 

* [Offchain unit test](https://github.com/o1-labs/o1js/blob/main/src/lib/mina/actions/offchain-contract.unit-test.ts)
* [Common types and functions](https://github.com/o1-labs/docs2/blob/main/examples/zkapps/05-common-types-and-functions/src/main.ts)
* [Basic merkle contract](https://github.com/o1-labs/docs2/blob/main/examples/zkapps/05-common-types-and-functions/src/BasicMerkleTreeContract.ts)
* [Offchain state](https://github.com/o1-labs/o1js/blob/main/src/lib/mina/actions/offchain-state.ts)
* [Deprecated tutorial of offchain storage](https://docs.minaprotocol.com/zkapps/tutorials/offchain-storage)

# Prerequisites for developing

## Dependencies

* NodeJS v18 and later
* NPM v10 and later
* [Typescript](https://www.youtube.com/watch?v=ahCwqrYpIuM&ab_channel=Fireship)
* git v2 and later
* Running ```npm install -g zkapp-cli``` in your terminal and then ```zk --version``` just to verify that everything runs as expected


## Initial setup for this folder

1. Locate yourself at the root of the folder and then run: ```npm i```
2. Run ```npm run build``` to verify the integrity of the contract ecosystem
3. Run ```npm run test``` to verify that the project is passing unit tests

 
# Useful commands for development:

The following list of commands are necessary to successfully configure the development environment and verify the functionality of the project

## How to build

```sh
npm run build
```

```sh
npm run buildw
```

## How to run tests

```sh
npm run test
npm run testw # watch mode
```

## How to run coverage

```sh
npm run coverage
```

## License

[THE UNLICENSE](LICENSE)
