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
    return "000000000000000000000000"+removeZeroX(string);
}

function removeZeroX(string: string): string {
    return string.replace("0x", "");
}




describe("batchWriter", function () {

    let TestContract: any;
    let TestContract2: any;
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

        TestContract2 = await testContractArtifacts.deploy();
        await TestContract2.deployed();
        console.log("          - Test contract address:      ", TestContract2.address);

        const contractmanagerArtifacts = await ethers.getContractFactory("ContractManager");
        ContractManager = await contractmanagerArtifacts.deploy();
        await ContractManager.deployed();
        console.log("          - Contract Manager address:   ", ContractManager.address);
 

    });
    it("Initial batch writer test", async function (){

        let calls = []
        let call = [TestContract.address, TestContract.interface.encodeFunctionData("mint(uint256,address)",[1,owner.address])]
        let call2 = [TestContract2.address, TestContract2.interface.encodeFunctionData("batchMint(uint256[],address)",[[2,4,5],owner.address])]
        calls.push()
        
       
        const numberOfCalls = callLentoHex(2*2) 
        const callLen = callLentoHex(removeZeroX(call[1]).length);
        const address = addresstoCallData(call[0]);
        const callData = removeZeroX(call[1]);
        const callLen2 = callLentoHex(removeZeroX(call2[1]).length);
        const address2 = addresstoCallData(call2[0]);
        const callData2 = removeZeroX(call2[1]);
        const packet = "0x"+numberOfCalls +callLen + address + callData+callLen2 + address2 + callData2;

        await ContractManager.batchCall(packet,{gasLimit:9000000})

        let text= await TestContract.totalSupply()

        expect(await TestContract.balanceOf(owner.address)).to.equal(1)
        expect(await TestContract2.balanceOf(owner.address)).to.equal(3)
    })

    


});