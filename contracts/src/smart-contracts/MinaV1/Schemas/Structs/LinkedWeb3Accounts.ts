import { Field, Struct } from "o1js";
import { AvailableNetworks, LinkStatus, MultiBlockchainAccountAddressString } from "./Types";

const ILinkedWeb3Account = {
    network: Field, 
    address: MultiBlockchainAccountAddressString,
    signature: Field,
    linkStatus: Field
}

export class LinkedWeb3Account extends Struct(ILinkedWeb3Account) {
    updateLinkStatus(newState: LinkStatus) {
      this.linkStatus = Field(newState)
    }
    getNetwork(){
        return this.network
    }
    getAddress(){
        return this.address.toString()
    }
}

const LinkedWeb3AccountsBaseStruct = { 
    storage: Object.fromEntries(
        Object.values(AvailableNetworks).map((network)=>[network, LinkedWeb3Account])
    )
} 

export class LinkedWeb3Accounts extends Struct(LinkedWeb3AccountsBaseStruct) {
    getLinkedAccountOfNetwork(network: Field){
        return this.storage[network.toString()]
    }

    setLinkedAccountOfNetwork(network: Field, LinkedAccount: LinkedWeb3Account){
        this.storage[network.toString()] = LinkedAccount;
    }
    
}