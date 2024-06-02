import { CircuitString, Field, Struct } from "o1js";
import { LinkStatus } from "./Types";

//For some reason Interfaces are not accepted it is necessary to clarify with mina
//With the current inference method for Structs we cannot create private properties, or at least is not clear how to do it
const ILinkedWeb2Account = {
    platform: CircuitString, //we could use an enum for this, drawback is it becomes weaker to brute proof forcing attack vector, maybe we could use a field function?
    handle: CircuitString,
    linkStatus: Field
}

export class LinkedWeb2Account extends Struct(ILinkedWeb2Account) {
    updateLinkStatus( newState: LinkStatus ) {
      this.linkStatus = Field(newState)
    }
    getState(){
      return this.linkStatus
    }
    getPlatform(){
      return this.platform.toString()
    }
    getHandle(){
      return this.handle.toString()
    }
}

export class LinkedWeb2Accounts extends Struct({}) {
  accounts: LinkedWeb2Account[] | []
}