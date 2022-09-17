import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import chai from "chai";
import { ByteArray } from "@ethercards/ec-util";
const { expect } = require("chai");
  

function callLentoHex(number: number): string {
    const data = new ByteArray(Buffer.alloc(2));
    data.writeUnsignedShort(number/2);
    return removeZeroX(data.toString("hex"));
}

function addresstoCallData(string: string): string {
    return removeZeroX(string);
}

function removeZeroX(string: string): string {
    return string.replace("0x", "");
}




describe("batchWriter", function () {

    let TestContract: any;
    let ContractManager: any;
    let owner:any;
    let addr1:any;
    let addr2:any;

    beforeEach(async () => {
    
        [owner, addr1,addr2] = await ethers.getSigners();
        const testContractArtifacts = await ethers.getContractFactory("NFTToolbox");
        TestContract = await testContractArtifacts.deploy();
        await TestContract.deployed();
        console.log("          - Test contract address:      ", TestContract.address);

        const contractmanagerArtifacts = await ethers.getContractFactory("ContractManager");
        ContractManager = await contractmanagerArtifacts.deploy();
        await ContractManager.deployed();
        console.log("          - Contract Manager address:      ", ContractManager.address);
 

    });
    it("Initial batch writer test", async function (){

        //await TestContract["mint(uint256)"](1)
        let call = [TestContract.address, TestContract.interface.encodeFunctionData("mint(uint256)",[1])]
        console.log("Batchminting to ",owner.address)
        const numberOfCalls = callLentoHex(2) 
        // console.log(numberOfCalls)
        const callLen = callLentoHex(removeZeroX(call[1]).length);
        const address = addresstoCallData(call[0]);
        // console.log(callLentoHex(address.length) )
        const callData = removeZeroX(call[1]);
        const packet = "0x"+numberOfCalls +callLen + address + callData;

        console.log(">>>",packet)
        await ContractManager.batchCall(packet)


        // 0x0001
        // 0024
        // 5FbDB2315678afecb367f032d93F642f64180aa3000000000000000000000000
        // a0712d68
        // 0000000000000000000000000000000000000000000000000000000000000001
       /* expect(await TestContract.balanceOf(owner.address)).to.equal(0)
        console.log("Pachet length: " + packet.length)
        await ContractManager.batchCall(packet)
        let text= await TestContract.totalSupply()
        console.log(text)

        expect(await TestContract.balanceOf(owner.address)).to.equal(3)*/
    })

    


});