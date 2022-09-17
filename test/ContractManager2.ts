import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import chai from "chai";
const { expect } = require("chai");
import { ContractManager2 } from '../typechain-types'

const RANDOM_CONTRACT_ADDRESS = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';

describe("contactManager2", function () {

    let contractManager2: any;
    let access: any[] = [];
    let accessRow: any;
    // let contractManager2: ContractManager2;
    // let access: ContractManager2.AccessStructStructOutput[];
    // let accessRow: ContractManager2.AccessStructStructOutput = new ContractManager2.AccessStructStructOutput();
    //let accessRow: {};

    let owner: any;
    let addr1: any;
    let addr2: any;


    beforeEach(async () => {
    
        [owner, addr1,addr2] = await ethers.getSigners();
        const contractManager2Artifacts = await ethers.getContractFactory("ContractManager2");
        contractManager2 = await contractManager2Artifacts.deploy();
        // contractManager2 = (await contractManager2Artifacts.deploy()) as ContractManager2;

        await contractManager2.deployed();
        // console.log("          - Contract Manager2 address:      ", contractManager2.address);
    });

    it("Set / get access (with owner)", async function (){

        access = [];
        accessRow = [contractManager2.address, '0x01010101', addr1.address, true];
        access.push(accessRow);
        accessRow = [contractManager2.address, '0x01010102', addr1.address, true];
        access.push(accessRow);

        await contractManager2.updateAccess(access);

        const hasAccess = await contractManager2.hasAccess(contractManager2.address, '0x01010101', addr1.address);
        expect(hasAccess).to.equal(true);

    });

    it("Deny user without access", async function (){

        access = [];
        accessRow = [contractManager2.address, '0x01010101', addr1.address, true];
        access.push(accessRow);
        await contractManager2.updateAccess(access);

        const hasAccess = await contractManager2.hasAccess(contractManager2.address, '0x01010101', addr2.address);
        expect(hasAccess).to.equal(false);

    });

    it("Set multiple access and verify set (with owner)", async function (){

        access = [];
        accessRow = [contractManager2.address, '0x01010101', addr1.address, true];
        access.push(accessRow);
        accessRow = [RANDOM_CONTRACT_ADDRESS, '0x01010102', addr2.address, true];
        access.push(accessRow);

        await contractManager2.updateAccess(access);

        const contracts = await contractManager2.getContracts();
        // console.log('contracts', contracts);
        const functions = await contractManager2.getFunctions();
        // console.log('functions', functions);
        const users = await contractManager2.getUsers();
        // console.log('users', users);

        expect(contracts).to.have.deep.include(contractManager2.address);
        expect(contracts).to.have.deep.include(RANDOM_CONTRACT_ADDRESS);

        expect(functions).to.have.deep.include('0x0101010100000000000000000000000000000000000000000000000000000000');
        expect(functions).to.have.deep.include('0x0101010200000000000000000000000000000000000000000000000000000000');

        expect(users).to.have.deep.include(addr1.address);
        expect(users).to.have.deep.include(addr2.address);

    });

    it("setAdmin", async function (){
        await contractManager2.setAdmin(addr1.address, true);

        const adminContains = await contractManager2.getAdminContains(addr1.address);
        expect(adminContains).to.equal(true);

    });

    it("Deny updateAccess for non admins", async function (){

        access = [];
        accessRow = [contractManager2.address, '0x01010101', addr1.address, true];
        access.push(accessRow);
        accessRow = [contractManager2.address, '0x01010102', addr1.address, true];
        access.push(accessRow);

        await expect(contractManager2.connect(addr1).updateAccess(access))
        .to.be.revertedWith('Not Authorised');
    });

    it("Verify updateAccess for admins", async function (){

        await contractManager2.setAdmin(addr1.address, true);

        access = [];
        accessRow = [contractManager2.address, '0x01010101', addr1.address, true];
        access.push(accessRow);
        accessRow = [contractManager2.address, '0x01010102', addr1.address, true];
        access.push(accessRow);

        await expect(contractManager2.connect(addr1).updateAccess(access))
        .not.to.be.reverted;
    });

    it("transferOwnership / renounceOwnership protection", async function (){

        const renounceOwnership = contractManager2.interface.encodeFunctionData("renounceOwnership()",[]).slice(0,10);
        const transferOwnership = contractManager2.interface.encodeFunctionData("transferOwnership(address)",[RANDOM_CONTRACT_ADDRESS]).slice(0,10);
        console.log('renounceOwnership', renounceOwnership);
        console.log('transferOwnership', transferOwnership);

        access = [];
        accessRow = [contractManager2.address, renounceOwnership, addr1.address, true];
        access.push(accessRow);
        accessRow = [contractManager2.address, transferOwnership, addr1.address, true];
        access.push(accessRow);
        accessRow = [contractManager2.address, '0x01010101', addr1.address, true];
        access.push(accessRow);

        await contractManager2.updateAccess(access);

        let hasAccess = await contractManager2.hasAccess(contractManager2.address, renounceOwnership, addr1.address);
        expect(hasAccess).to.equal(false);
        hasAccess = await contractManager2.hasAccess(contractManager2.address, renounceOwnership, addr1.address);
        expect(hasAccess).to.equal(false);
        hasAccess = await contractManager2.hasAccess(contractManager2.address, '0x01010101', addr1.address);
        expect(hasAccess).to.equal(true);

    });

});