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

function generateCallData(address: any, encodeFunctionData:any){
    let call = [address, encodeFunctionData];
    const callLen = callLentoHex(removeZeroX(call[1]).length);
    const addressToCall = addresstoCallData(call[0]);
    const callData = removeZeroX(call[1]);

    const packet= ""+callLen + addressToCall + callData

    return packet
}




describe("Batch Writer functionality", function () {

    let TestContract: any;
    let TestContract2: any;
    let TestContract3: any;
    let ContractManager: any;
    let owner:any;
    let addr1:any;
    let addr2:any;
    const numberOfTestsToRun = 10;
    let gasUsedBatch:number;
    let gasUsedDirect:number


    beforeEach(async () => {
    
        [owner, addr1,addr2] = await ethers.getSigners();
        const testContractArtifacts = await ethers.getContractFactory("NFTToolbox");
        TestContract = await testContractArtifacts.deploy();
        await TestContract.deployed();
        //console.log("          - Test contract address:      ", TestContract.address);

        TestContract2 = await testContractArtifacts.deploy();
        await TestContract2.deployed();
        //console.log("          - Test contract address:      ", TestContract2.address);

  

        const contractmanagerArtifacts = await ethers.getContractFactory("ContractManager");
        ContractManager = await contractmanagerArtifacts.deploy();
        await ContractManager.deployed();


 

    });
    it("Should be able to multiple calls across multiple contracs with one transaction ", async function (){

        
        let call = [TestContract.address, TestContract.interface.encodeFunctionData("mint(uint256,address)",[1,owner.address])]
        let call2 = [TestContract2.address, TestContract2.interface.encodeFunctionData("batchMint(uint256[],address)",[[2,4,5],owner.address])]
        
       
        const numberOfCalls = callLentoHex(2*2) 
        const callLen = callLentoHex(removeZeroX(call[1]).length);
        const address = addresstoCallData(call[0]);
        const callData = removeZeroX(call[1]);
        const callLen2 = callLentoHex(removeZeroX(call2[1]).length);
        const address2 = addresstoCallData(call2[0]);
        const callData2 = removeZeroX(call2[1]);

        const packet = "0x"+numberOfCalls +callLen + address + callData+callLen2 + address2 + callData2;

        await ContractManager.batchCall(packet)

        let text= await TestContract.totalSupply()

        expect(await TestContract.balanceOf(owner.address)).to.equal(1)
        expect(await TestContract2.balanceOf(owner.address)).to.equal(3)
    })

});