import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
const { expect } = require("chai");

const RANDOM_CONTRACT_ADDRESS = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';

describe("ContractManager", function () {

    let contractManager: any;
    let access: any[] = [];
    let accessRow: any;
    let owner: any;
    let addr1: any;
    let addr2: any;

    beforeEach(async () => {
    
        [owner, addr1,addr2] = await ethers.getSigners();
        const contractManagerArtifacts = await ethers.getContractFactory("ContractManager");
        contractManager = await contractManagerArtifacts.deploy();

        await contractManager.deployed();
        // console.log("          - Contract Manager2 address:      ", contractManager.address);
    });

    it("Set / get access (with owner)", async function (){

        access = [];
        accessRow = [contractManager.address, '0x01010101', addr1.address, true];
        access.push(accessRow);
        accessRow = [contractManager.address, '0x01010102', addr1.address, true];
        access.push(accessRow);

        await contractManager.updateAccess(access);

        const hasAccess = await contractManager.hasAccess(contractManager.address, '0x01010101', addr1.address);
        expect(hasAccess).to.equal(true);

    });

    it("Deny user without access", async function (){

        access = [];
        accessRow = [contractManager.address, '0x01010101', addr1.address, true];
        access.push(accessRow);
        await contractManager.updateAccess(access);

        const hasAccess = await contractManager.connect(addr1).hasAccess(contractManager.address, '0x01010101', addr2.address);
        expect(hasAccess).to.equal(false);

    });

    it("Set multiple access and verify set (with owner)", async function (){

        access = [];
        accessRow = [contractManager.address, '0x01010101', addr1.address, true];
        access.push(accessRow);
        accessRow = [RANDOM_CONTRACT_ADDRESS, '0x01010102', addr2.address, true];
        access.push(accessRow);

        await contractManager.updateAccess(access);

        const contracts = await contractManager.getContracts();
        // console.log('contracts', contracts);
        const functions = await contractManager.getFunctions();
        // console.log('functions', functions);
        const users = await contractManager.getUsers();
        // console.log('users', users);

        expect(contracts).to.have.deep.include(contractManager.address);
        expect(contracts).to.have.deep.include(RANDOM_CONTRACT_ADDRESS);

        expect(functions).to.have.deep.include('0x0101010100000000000000000000000000000000000000000000000000000000');
        expect(functions).to.have.deep.include('0x0101010200000000000000000000000000000000000000000000000000000000');

        expect(users).to.have.deep.include(addr1.address);
        expect(users).to.have.deep.include(addr2.address);

    });

    it("setAdmin", async function (){
        await contractManager.setAdmin(addr1.address, true);

        const adminContains = await contractManager.getAdminContains(addr1.address);
        expect(adminContains).to.equal(true);

    });

    it("Deny updateAccess for non admins", async function (){

        access = [];
        accessRow = [contractManager.address, '0x01010101', addr1.address, true];
        access.push(accessRow);
        accessRow = [contractManager.address, '0x01010102', addr1.address, true];
        access.push(accessRow);

        await expect(contractManager.connect(addr1).updateAccess(access))
        .to.be.revertedWith('Not Authorised');

    });

    it("Verify updateAccess for admins", async function (){

        await contractManager.setAdmin(addr1.address, true);

        access = [];
        accessRow = [contractManager.address, '0x01010101', addr1.address, true];
        access.push(accessRow);
        accessRow = [contractManager.address, '0x01010102', addr1.address, true];
        access.push(accessRow);

        await expect(contractManager.connect(addr1).updateAccess(access))
        .not.to.be.reverted;
    });

    it("transferOwnership / renounceOwnership protection", async function (){

        const renounceOwnership = contractManager.interface.encodeFunctionData("renounceOwnership()",[]).slice(0,10);
        const transferOwnership = contractManager.interface.encodeFunctionData("transferOwnership(address)",[RANDOM_CONTRACT_ADDRESS]).slice(0,10);
        // console.log('renounceOwnership', renounceOwnership);
        // console.log('transferOwnership', transferOwnership);

        access = [];
        accessRow = [contractManager.address, renounceOwnership, addr1.address, true];
        access.push(accessRow);
        accessRow = [contractManager.address, transferOwnership, addr1.address, true];
        access.push(accessRow);
        accessRow = [contractManager.address, '0x01010101', addr1.address, true];
        access.push(accessRow);

        await contractManager.updateAccess(access);

        let hasAccess = await contractManager.hasAccess(contractManager.address, renounceOwnership, addr1.address);
        expect(hasAccess).to.equal(false);
        hasAccess = await contractManager.hasAccess(contractManager.address, renounceOwnership, addr1.address);
        expect(hasAccess).to.equal(false);
        hasAccess = await contractManager.hasAccess(contractManager.address, '0x01010101', addr1.address);
        expect(hasAccess).to.equal(true);

    });

});