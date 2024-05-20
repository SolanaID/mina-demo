import { CircuitString, Field, Struct } from "o1js";

//For some reason Interfaces are not accepted it is necessary to clarify with mina
const IAccountRegisterRecord = {
    network: CircuitString, //we could use an enum for this, drawback is it becomes weaker to brute proof forcing attack vector, maybe we could use a field function?
    address: CircuitString,
    timestamp: Field
}

export class AccountRegisterRecord extends Struct(IAccountRegisterRecord) {
    getRegistrationTimestamp() {
      return this.timestamp
    }
    getNetwork(){
        return this.network.toString()
    }
    getAddress(){
        return this.address.toString()
    }
}

//PENDING CREATE A DICTIONARY OR HELPER FUNCTIONS FOR SORTING
export class AccountRegisterRecords extends Struct({}) {
    accounts: AccountRegisterRecord[] | []
}