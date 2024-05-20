import { CircuitString, Field, Struct } from "o1js";
import { LinkStatus } from "./Types";

//For some reason Interfaces are not accepted it is necessary to clarify with mina
const IAccountMetadata = {
    //must be filled with something
}

export class AccountMetadata extends Struct(IAccountMetadata) {
    metadata: any
    addPropertyToMetadata(key: string, value: any){
        this.metadata[key] = value;
    }
}
