import { CircuitString, Field, Struct } from "o1js";
import { TrustStatus } from "./Types";

//For some reason Interfaces are not accepted it is necessary to clarify with mina
const ITrustedWeb3Account = {
    network: CircuitString, //we could use an enum for this, drawback is it becomes weaker to brute proof forcing attack vector, maybe we could use a field function?
    address: CircuitString,
    trustStatus: Field
}

export class TrustedWeb3Account extends Struct(ITrustedWeb3Account) {
    updateTrustStatus(newState: TrustStatus) {
      this.trustStatus = Field(newState)
    }
    getNetwork(){
        return this.network.toString()
    }
    getAddress(){
        return this.address.toString()
    }
}

//PENDING CREATE A DICTIONARY OR HELPER FUNCTIONS FOR SORTING
export class TrustedWeb3Accounts extends Struct({}) {
    accounts: TrustedWeb3Account[] | []
}