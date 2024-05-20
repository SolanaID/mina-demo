import { CircuitString, Field } from "o1js";
import { LinkedWeb3Account, LinkStatus } from "../Schemas/Structs/index.js";

const linkedWeb3Account = new LinkedWeb3Account({
    network: CircuitString.fromString('polygon'),
    address: CircuitString.fromString('0xF0245F6251Bef9447A08766b9DA2B07b28aD80B0'),
    linkStatus: Field(LinkStatus.NULL)
})

console.log("Start", linkedWeb3Account.linkStatus.toString())
console.log(linkedWeb3Account.updateLinkStatus(LinkStatus.ACTIVE))
console.log("End", linkedWeb3Account.linkStatus.toString())