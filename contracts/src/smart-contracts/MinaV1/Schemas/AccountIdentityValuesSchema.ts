import {
    PublicKey,
    UInt64,
    Experimental
} from 'o1js';
import { AccountMetadata, AccountRewards, LinkedWeb2Accounts, LinkedWeb3Accounts, TrustedWeb3Accounts } from './Structs';

const { OffchainState } = Experimental;

export const offchainAccountIdentityValuesState = OffchainState({
    metadata: OffchainState.Map(PublicKey, AccountMetadata),
    linkedWeb2Accounts: OffchainState.Map(PublicKey, LinkedWeb2Accounts),
    linkedWeb3Accounts: OffchainState.Map(PublicKey, LinkedWeb3Accounts),
    claimedRewards: OffchainState.Map(PublicKey, AccountRewards), 
    trustedAccounts: OffchainState.Map(PublicKey, TrustedWeb3Accounts) 
});

export class AccountIdentityValuesStateProof extends offchainAccountIdentityValuesState.Proof {}