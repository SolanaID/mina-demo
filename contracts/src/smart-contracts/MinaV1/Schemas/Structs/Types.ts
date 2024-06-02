import { MultiPackedStringFactory } from "../../../../o1js-pack";

export enum AvailableNetworks {
    MINA,
    SOLANA, 
    POLYGON,
}

export enum LinkStatus {
    NULL,
    ACTIVE,
    REVOKED
}

export enum TrustStatus {
    NULL,
    TRUSTED,
    UNTRUSTED
}

export enum ClaimStatus {
    NULL,
    CLAIMED,
    UNCLAIMED,
}

// Allows for a maximum of 45 chars
export class MultiBlockchainAccountAddressString extends MultiPackedStringFactory(3) {}
// Allows for a maximum of 75 chars
export class MultiBlockchainTxHashString extends MultiPackedStringFactory(5) {}