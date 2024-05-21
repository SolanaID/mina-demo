import { CircuitString, Field, Struct } from "o1js";

//For some reason Interfaces are not accepted it is necessary to clarify with mina
const IAccountMetadata = {
    //must be filled with something
    network: CircuitString,
    metadata: {}
}

export class AccountMetadata extends Struct(IAccountMetadata) {
    addPropertyToMetadata(key: string, value: any){
        (this.metadata as any )[key] = value;
    }
}
