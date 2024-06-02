import { CircuitString, Field, PublicKey, Struct, UInt64 } from "o1js";
import { AvailableNetworks, MultiBlockchainAccountAddressString } from "./Types";
import { MultiPackedStringFactory } from "../../../../o1js-pack";

// example of what it could be
class AccountDataMetadata extends Struct({
    address: PublicKey,
    score: Field,
    a: Field,
}) {}

const IAccountMetadata = {
    registrationDate: UInt64,
    score: Field,
    address: MultiPackedStringFactory
}


export class AccountMetadata extends Struct(IAccountMetadata) {

}
