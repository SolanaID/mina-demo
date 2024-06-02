import { CircuitString, Field, Struct } from "o1js";
import { ClaimStatus } from "./Types";


//For some reason Interfaces are not accepted it is necessary to clarify with mina
const IAccountReward = {
    network: CircuitString, //we could use an enum for this, drawback is it becomes weaker to brute proof forcing attack vector, maybe we could use a field function?
    rewardId: CircuitString,
    claimStatus: Field
}

export class AccountReward extends Struct(IAccountReward) {
    updateClaimStatus(newState: ClaimStatus) {
      this.claimStatus = Field(newState)
    }
    getNetwork(){
        return this.network.toString()
    }
    getRewardId(){
        return this.rewardId.toString()
    }
}

//PENDING CREATE A DICTIONARY OR HELPER FUNCTIONS FOR SORTING
export class AccountRewards extends Struct({}) {
    accounts: AccountReward[] | []
}