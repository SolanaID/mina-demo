import { Field, SmartContract, state, State, method, Experimental, PublicKey, UInt64 } from 'o1js';
import { RegisteredAccountsStateProof, offchainAccountRegistrationRecordsState } from './Schemas/RegisteredAccountsSchema';
const { OffchainStateCommitments } = Experimental;

/**
 * Initial version of DSID Contract on MINA blockchain
 * See https://docs.minaprotocol.com/zkapps for more info.
 *
 * This version implements the connection to 
 *
 *
 */
export class DSIDContractV1 extends SmartContract {
  @state(OffchainStateCommitments) offChainDSIDRegistrationRecords = State(
    OffchainStateCommitments.empty()
  );

  @state(OffchainStateCommitments) offChainDSIDAccountIdentityValues = State(
    OffchainStateCommitments.empty()
  );

  @method
  async createAccount(address: PublicKey) {
      //should get address from storage, if exists fails if it doesnt exists creates record on registration and in A.I.V
  }

  @method
  async updateAccountData(){

  }

  @method
  async settleRegistration(registrationProof: RegisteredAccountsStateProof) {
    await offchainAccountRegistrationRecordsState.settle(registrationProof);
  }

  @method
  async settleAccountValueUpdate(registrationProof: RegisteredAccountsStateProof) {
    await offchainAccountRegistrationRecordsState.settle(registrationProof);
  }

}
