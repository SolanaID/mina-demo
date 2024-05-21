# Mina zkApp: Dsid Mock Up

This repository contains the initial prototype for the DSID Mina demo, the contract will use experimental Offchain storage to deal with registration 
and update of information for a particular account.

# Description:

The current state of the repository contains two folders, the 'contracts' folder and the 'ui' folder

## Contracts folder:

This folder contains all the necessary code for implementing DSID's Smart contracts for the current version of the prototype

## UI folder:

This folder contains all the necessary code for implementing DSID's Web Frontend for the current version of the prototype

 
# Useful commands for development:

The following list of commands are necessary to successfully configure the development environment and verify the functionality of the project

## Initial setup for the 'contracts' folder

Locate yourself inside the folder 'contracts' and then run:

```sh
npm i
```

## How to build

```sh
npm run build
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
