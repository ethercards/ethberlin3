import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
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
     
        let access = [];
        let accessRow = [TestContract.address, '0x94bf804d', addr1.address, true];
        access.push(accessRow);
        accessRow = [TestContract2.address, '0xeb699f22', addr1.address, true];
        access.push(accessRow);
        
        await ContractManager.updateAccess(access);

    });

    it("Should be able to do multiple calls across multiple contracts with one transaction ", async function (){

        let callPayload1= generateCallData(TestContract.address, TestContract.interface.encodeFunctionData("mint(uint256,address)",[1,owner.address]))
        let callPayload2= generateCallData(TestContract2.address, TestContract2.interface.encodeFunctionData("batchMint(uint256[],address)",[[2,4,5],owner.address]))

        const numberOfCalls = callLentoHex(2*2) 
       
        const packet = "0x"+numberOfCalls +callPayload1+callPayload2;        
        await ContractManager.connect(addr1).batchCall(packet)

    })

    it("Should not allow users without access to call any contracts", async function(){
        let callPayload1= generateCallData(TestContract.address, TestContract.interface.encodeFunctionData("mint(uint256,address)",[1,owner.address]))
        let callPayload2= generateCallData(TestContract2.address, TestContract2.interface.encodeFunctionData("batchMint(uint256[],address)",[[2,4,5],owner.address]))
       
        let access = [];
        let accessRow = [TestContract.address, '0x94bf804d', addr2.address, true];
        access.push(accessRow);

        const numberOfCalls = callLentoHex(2*2) 
       
        const packet = "0x"+numberOfCalls +callPayload1+callPayload2;
        
        await expect(ContractManager.connect(addr2).batchCall(packet)).to.be.reverted

    })

    it("Should not allow users to call contracts that they dont have access to", async function(){
        let callPayload1= generateCallData(TestContract.address, TestContract.interface.encodeFunctionData("mint(uint256,address)",[1,owner.address]))
        let callPayload2= generateCallData(TestContract2.address, TestContract2.interface.encodeFunctionData("batchMint(uint256[],address)",[[2,4,5],owner.address]))
       
        let access = [];
        let accessRow = [TestContract.address, '0x94bf804d', addr2.address, true];
        access.push(accessRow);
        accessRow = [TestContract2.address, '0x94bf804d', addr2.address, true];
        access.push(accessRow);

        const numberOfCalls = callLentoHex(2*2) 
       
        const packet = "0x"+numberOfCalls +callPayload1+callPayload2;
        
        await expect(ContractManager.connect(addr2).batchCall(packet)).to.be.reverted

    })

    it("Admin should be able to call all functions", async function (){
        let callPayload1= generateCallData(TestContract.address, TestContract.interface.encodeFunctionData("mint(uint256,address)",[1,owner.address]))
        let callPayload2= generateCallData(TestContract2.address, TestContract2.interface.encodeFunctionData("batchMint(uint256[],address)",[[2,4,5],owner.address]))

        const numberOfCalls = callLentoHex(2*2) 
       
        const packet = "0x"+numberOfCalls +callPayload1+callPayload2;
        await ContractManager.batchCall(packet)
    })

    it("Should not allow transfering ownership of the contracts managed by the ContractManager", async function(){
        let callPayload1= generateCallData(TestContract.address, TestContract.interface.encodeFunctionData("transferOwnership(address)",[addr1.address]))
       
        const numberOfCalls = callLentoHex(1*2) 
       
        const packet = "0x"+numberOfCalls +callPayload1;
        await expect(ContractManager.batchCall(packet)).to.be.reverted
    })

});