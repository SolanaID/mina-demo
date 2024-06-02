import { Field, SmartContract, state, State, method, Experimental, PublicKey, UInt64, CircuitString, UInt32, assert, Mina } from 'o1js';
import { offchainDSIDGeneralSchemaState, DSIDGeneralSchemaStateProof } from './Schemas/index.js';
import { AccountMetadata } from './Schemas/Structs/AccountMetadata.js';
import { AvailableNetworks, LinkStatus, MultiBlockchainAccountAddressString } from './Schemas/Structs/Types.js';
import { LinkedWeb3Account } from './Schemas/Structs/LinkedWeb3Accounts.js';
//import { offchainAccountIdentityValuesState }
const { OffchainStateCommitments } = Experimental;

/**
 * Initial version of DSID Contract on MINA blockchain
 * See https://docs.minaprotocol.com/zkapps for more info.
 *
 * This version implements the connection to two off-chain storages, one is for the global data
 * of register records, the other one is for identity values of users
 *
 */
export class DSIDContractV1 extends SmartContract {

  //are both of this really necessary?

  @state(OffchainStateCommitments) offchainState = State(
    OffchainStateCommitments.empty()
  );

  /**
   * Create Account callable method
   * 
   * This method verifies tries to get address from storage, if exists the function call must fail.
   * if the address doesn't exist on registration offchain storage it will create a new record on 
   * both registration and A.I.V Merkle map
   *
   */
  @method
  async createAccount() {
    let address = Mina.sender()
    offchainDSIDGeneralSchemaState.fields.metadata.update(address, {
      from:undefined,
      to: new AccountMetadata({
        registrationDate: this.network.timestamp.get(),
        score: Field(0),
        address: MultiBlockchainAccountAddressString.fromFields(address.toFields())
      })
    })
  }

  /**
   * Update Account metadata score callable method
   * 
   * This method updates account metadata score for address in storage, first checks for account existence.
   * if the address doesn't exist validation fails 
   * Overwrites past metadata score with 'newScore' value
   *
   */

  @method
  async updateAccountScore(address: PublicKey, newScore: Field){
      let originalMetadata =  await offchainDSIDGeneralSchemaState.fields.metadata.get(address);
      let metadataAssertion = originalMetadata.assertSome('Metadata for '+address+' exists');
      metadataAssertion.score.assertNotEquals(newScore)
      offchainDSIDGeneralSchemaState.fields.metadata.update(address, {
        from: originalMetadata,
        to: new AccountMetadata({...metadataAssertion, score: newScore})
      })
  }

  /**
   * Get score callable method
   * 
   * This method retrieves the score of the requested account
   * PENDING: Security implementation to verify score recall from trusted source (owner account or trusted addresss)
   * returns field of account score
   *
   */


  @method.returns(Field)
  async getScore(address: PublicKey) {
    let accountMetadata = await offchainDSIDGeneralSchemaState.fields.metadata.get(address);
    return (accountMetadata.assertSome('Score for account'+address+' does not exist').score)
  }

  /**
   * Link Web3 account to identity callable method
   * 
   * This method inserts a new web3 account to the identity vault
   *
   */

  @method
  async linkWeb3AccountToIdentity(network: Field, addressToLink: MultiBlockchainAccountAddressString, signature: Field ){
      let address = Mina.sender()
      let originalLinkedData =  await offchainDSIDGeneralSchemaState.fields.linkedWeb3Accounts.get(address);
      const linkedDataAssertion = originalLinkedData.assertSome('Metadata for '+address+' exists');
      let updatedLinkedDataAssertion = linkedDataAssertion;
      updatedLinkedDataAssertion.setLinkedAccountOfNetwork(
        network, 
        new LinkedWeb3Account(
          { 
            network,
            address: addressToLink, 
            signature, 
            linkStatus: Field(LinkStatus.ACTIVE)
         }
        )
      )
      /* let updatedLinkedDataAssertion = { 
        storage: {
          ... linkedDataAssertion.storage, 
          [network]: 
          new LinkedWeb3Account({ 
            network: Field(network), 
            address: addressToLink, 
            signature, 
            linkStatus: Field(LinkStatus.ACTIVE)}
          ) 
        }
      } */
      offchainDSIDGeneralSchemaState.fields.linkedWeb3Accounts.update(address, {
        from: linkedDataAssertion,
        to: updatedLinkedDataAssertion
      })
  }


  /**
   * Update Account metadata score callable method
   * 
   * This method updates account metadata score for address in storage, first checks for account existence.
   * if the address doesn't exist validation fails 
   * Overwrites past metadata score with 'newScore' value
   *
   */

  @method
  async linkWeb2AccountToIdentity(){
      
  }

  /**
   * Update Account metadata score callable method
   * 
   * This method updates account metadata score for address in storage, first checks for account existence.
   * if the address doesn't exist validation fails 
   * Overwrites past metadata score with 'newScore' value
   *
   */

  @method
  async linkRewardHashToIdentity(){
      
  }

  /**
   * Update Account metadata score callable method
   * 
   * This method updates account metadata score for address in storage, first checks for account existence.
   * if the address doesn't exist validation fails 
   * Overwrites past metadata score with 'newScore' value
   *
   */

  @method
  async addTrustedAddress(){
      
  }

  

  /**
   * Settle callable method 
   * 
   * Used for generating settlement proof of the offchain storage
   * Actual process of settlement not yet understood
   *
   */

  @method
  async settle(proof: DSIDGeneralSchemaStateProof) {
    await offchainDSIDGeneralSchemaState.settle(proof);
  }

}
