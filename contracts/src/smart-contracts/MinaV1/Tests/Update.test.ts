import { Mina, PrivateKey } from 'o1js';
import { DSIDContractV1 } from '../DSIDContractV1.js';
import { offchainDSIDGeneralSchemaState } from '../Schemas/GeneralOffChainDSIDSchema.js';


let proofsEnabled = true;

let firstTestTitle = `correctly creates a new account after calling the create method from the smart contract, 
  \n then proceeds to update information of the account in the offchain storage`;

describe('DSIDContractV1 General Test', () => {
  let deployerAccount: Mina.TestPublicKey,
    deployerKey: PrivateKey,
    senderAccount: Mina.TestPublicKey,
    senderKey: PrivateKey,
    contractAccount: Mina.TestPublicKey,
    contractKey: PrivateKey,
    newUserAccount: Mina.TestPublicKey,
    newUserKey: PrivateKey,
    zkApp: DSIDContractV1;

  beforeAll(async () => {
    const Local = await Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    [deployerAccount, senderAccount, contractAccount, newUserAccount ] = Local.testAccounts;

    deployerKey = deployerAccount.key;
    senderKey = senderAccount.key;
    contractKey = contractAccount.key;
    newUserKey = newUserAccount.key;

    zkApp = new DSIDContractV1(contractAccount);

    offchainDSIDGeneralSchemaState.setContractInstance(zkApp);
    //call directly to the storage
    //offchainDSIDGeneralSchemaState.fields.metadata.get

    //AccountUpdate.fundNewAccount(deployerAccount);

    console.time('offchainDSIDGeneralSchemaState compilation time');
    await offchainDSIDGeneralSchemaState.compile();
    console.timeEnd('offchainAccountIdentityValuesState compilation time');

    console.time('compile contract');
    await DSIDContractV1.compile();
    console.timeEnd('compile contract');

    await localDeploy();
    
  });

  async function localDeploy() {
    console.time('Local contract deploy');
    const txn = await Mina.transaction(deployerAccount, async () => {
      await zkApp.deploy();
    });
    await txn.prove();
    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await txn.sign([deployerKey, contractKey]).send();
    console.timeEnd('Local contract deploy');
  }

  it(firstTestTitle, async () => {  
    console.time('Account creation');

    const txn = await Mina.transaction(newUserAccount, async () => {
      await zkApp.createAccount();
    });

    await txn.prove();
    await txn.sign([newUserKey]).send();
    
    console.log("TXN after signature", txn)
    console.timeEnd('Account creation');

    console.time('Settlement proof 1');
    let proof = await offchainDSIDGeneralSchemaState.createSettlementProof();
    console.timeEnd('Settlement proof 1');

    console.time('Settle txn 1');
    await Mina.transaction(senderAccount, () => zkApp.settle(proof))
      .sign([senderKey])
      .prove()
      .send();
    console.timeEnd('Settle txn 1');
  });
});