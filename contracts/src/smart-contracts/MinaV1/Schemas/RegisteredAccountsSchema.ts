import {
    PublicKey,
    UInt64,
    Experimental
} from 'o1js';
import { AccountRegisterRecords } from './Structs';

const { OffchainState } = Experimental;

export const offchainAccountRegistrationRecordsState = OffchainState({
    registeredAccounts: OffchainState.Map(PublicKey, AccountRegisterRecords),
});

export class RegisteredAccountsStateProof extends offchainAccountRegistrationRecordsState.Proof {}

