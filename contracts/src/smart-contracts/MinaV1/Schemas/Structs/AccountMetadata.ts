import { CircuitString, Field, PublicKey, Struct } from "o1js";


const IAccountMetadata = {
    network: CircuitString,
    metadata: CircuitString
}


export class AccountMetadata extends Struct(IAccountMetadata) {
    addPropertyToMetadata(parsedMetadata: CircuitString){
        this.metadata = parsedMetadata;
    }
}
