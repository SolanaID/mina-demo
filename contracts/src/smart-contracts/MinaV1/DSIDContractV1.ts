import { Field, SmartContract, state, State, method, Experimental, PublicKey, UInt64, CircuitString, UInt32 } from 'o1js';
import { offchainDSIDGeneralSchemaState, DSIDGeneralSchemaStateProof } from './Schemas/index.js';
import { AccountMetadata } from './Schemas/Structs/AccountMetadata.js';
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
  async createAccount(address: PublicKey, network: CircuitString) {
    offchainDSIDGeneralSchemaState.fields.metadata.update(address, {
      from: undefined,
      to: new AccountMetadata({
        network: network,
        metadata: CircuitString.fromString('')
      })
    })

    offchainDSIDGeneralSchemaState.fields.linkedWeb2Accounts.update(address, {
      from: undefined,
      to: []
    })

    offchainDSIDGeneralSchemaState.fields.linkedWeb3Accounts.update(address, {
      from: undefined,
      to: []
    })

    offchainDSIDGeneralSchemaState.fields.claimedRewards.update(address, {
      from: undefined,
      to: []
    })

    offchainDSIDGeneralSchemaState.fields.trustedAccounts.update(address, {
      from: undefined,
      to: []
    })
  }

  /**
   * Update Account metadata callable method
   * 
   * This method updates account metadata for address in storage, first checks for account existence.
   * if the address doesn't exist validation fails 
   * Overwrites past metadata on ['key'] with 'value'
   *
   */

  @method
  async updateAccountMetadata(address: PublicKey, parsedMetadata: CircuitString){
      let originalMetadata =  await offchainDSIDGeneralSchemaState.fields.metadata.get(address);
      let metadataAssertion = originalMetadata.assertSome('Metadata for '+address+' exists');
      metadataAssertion.addPropertyToMetadata(parsedMetadata) 
      offchainDSIDGeneralSchemaState.fields.metadata.update(address, {
        from: originalMetadata,
        to: new AccountMetadata({
          network: metadataAssertion.network,
          metadata: metadataAssertion.metadata
        })
      })
  }

  @method
  async settle(proof: DSIDGeneralSchemaStateProof) {
    await offchainDSIDGeneralSchemaState.settle(proof);
  }

}
