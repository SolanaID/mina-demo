import { CircuitString, Field, Struct } from "o1js";
import { LinkStatus } from "./Types";

//For some reason Interfaces are not accepted it is necessary to clarify with mina
const ILinkedWeb3Account = {
    network: CircuitString, //we could use an enum for this, drawback is it becomes weaker to brute proof forcing attack vector, maybe we could use a field function?
    address: CircuitString,
    linkStatus: Field
}

export class LinkedWeb3Account extends Struct(ILinkedWeb3Account) {
    updateLinkStatus(newState: LinkStatus) {
      this.linkStatus = Field(newState)
    }
    getNetwork(){
        return this.network.toString()
    }
    getAddress(){
        return this.address.toString()
    }
}

//PENDING CREATE A DICTIONARY OR HELPER FUNCTIONS FOR SORTING
export class LinkedWeb3Accounts extends Struct({}) {
    accounts: LinkedWeb3Account[] | []
}