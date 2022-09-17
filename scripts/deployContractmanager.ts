import '@nomiclabs/hardhat-ethers';
import {ethers} from "hardhat";

async function deploy(){
  const Contract = await ethers.getContractFactory("ContractManager");
  
  const nftToolbox = await Contract.deploy();
  
  await nftToolbox.deployed();
  
  console.log(nftToolbox.address)

  
  return nftToolbox;
}

deploy()