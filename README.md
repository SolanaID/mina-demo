# Mina zkApp: Dsid Mock Up

This repository contains the initial prototype for the DSID Mina demo, the contract will use experimental Offchain storage to deal with registration 
and update of information for a particular account.

# Description:

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
