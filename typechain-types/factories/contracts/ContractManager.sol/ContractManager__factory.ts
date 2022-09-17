/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ContractManager,
  ContractManagerInterface,
} from "../../../contracts/ContractManager.sol/ContractManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint16",
        name: "id",
        type: "uint16",
      },
    ],
    name: "RequestFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "RequestCompelted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "bytesData",
        type: "bytes",
      },
    ],
    name: "batchCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAdress",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "_fnHash",
        type: "bytes4",
      },
      {
        internalType: "address",
        name: "_functionCaller",
        type: "address",
      },
    ],
    name: "checkAccess",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "test",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6109428061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063715018a6146100675780638da5cb5b14610071578063f2fde38b14610091578063f3b5c85c146100a4578063f8a8fd6d146100cb578063fc6837a1146100d3575b600080fd5b61006f6100e6565b005b6000546040516001600160a01b0390911681526020015b60405180910390f35b61006f61009f366004610660565b6100fa565b6100bb6100b2366004610682565b60019392505050565b6040519015158152602001610088565b61006f610178565b61006f6100e13660046106d4565b61019e565b6100ee6103dd565b6100f86000610437565b565b6101026103dd565b6001600160a01b03811661016c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b61017581610437565b50565b6100f860405180604001604052806005815260200164576f726b7360d81b815250610487565b6040805180820190915260118152700313cba32b9903230ba309039b4bd329d1607d1b60208201526101d090826104ca565b6040805180820190915260078152662827a4a72a22a960c91b60208201526002906101fb90826104ca565b600061020982828587610746565b61021291610770565b60f01c905061022081610513565b60005b8161ffff168161ffff1610156103965760008584866102438260026107b6565b9261025093929190610746565b61025991610770565b60f01c905061028e6040518060400160405280600a8152602001690c8c2e8c298cadccee8d60b31b8152508261ffff166104ca565b6102998460026107b6565b935060008685876102ab8260146107b6565b926102b893929190610746565b6102c1916107ce565b60601c90506102f160405180604001604052806009815260200168746f4164647265737360b81b81525082610558565b6102fc8560146107b6565b9450600087868861030e8260046107b6565b9261031b93929190610746565b61032491610801565b905061032f8161059d565b6000604051600081868a6000885af19150610350905061ffff8516886107b6565b965061035b816105e6565b8061037f57604051637a2da17d60e01b815261ffff86166004820152602401610163565b50505050808061038e9061082f565b915050610223565b5083836040516103a7929190610850565b604051908190038120907f957ca92aff3a71c8f449700d17d33d67e1587539864b289480233a9b2b79645f90600090a250505050565b6000546001600160a01b031633146100f85760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610163565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6101758160405160240161049b91906108ad565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b179052610623565b61050f82826040516024016104e09291906108c0565b60408051601f198184030181529190526020810180516001600160e01b0316632d839cb360e21b179052610623565b5050565b6101758160405160240161052991815260200190565b60408051601f198184030181529190526020810180516001600160e01b031663f82c50f160e01b179052610623565b61050f828260405160240161056e9291906108e2565b60408051601f198184030181529190526020810180516001600160e01b031663319af33360e01b179052610623565b6040516001600160e01b0319821660248201526101759060440160408051601f198184030181529190526020810180516001600160e01b031663e05f48d160e01b179052610623565b60405181151560248201526101759060440160408051601f198184030181529190526020810180516001600160e01b03166332458eed60e01b1790525b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b80356001600160a01b038116811461065b57600080fd5b919050565b60006020828403121561067257600080fd5b61067b82610644565b9392505050565b60008060006060848603121561069757600080fd5b6106a084610644565b925060208401356001600160e01b0319811681146106bd57600080fd5b91506106cb60408501610644565b90509250925092565b600080602083850312156106e757600080fd5b823567ffffffffffffffff808211156106ff57600080fd5b818501915085601f83011261071357600080fd5b81358181111561072257600080fd5b86602082850101111561073457600080fd5b60209290920196919550909350505050565b6000808585111561075657600080fd5b8386111561076357600080fd5b5050820193919092039150565b6001600160f01b031981358181169160028510156107985780818660020360031b1b83161692505b505092915050565b634e487b7160e01b600052601160045260246000fd5b600082198211156107c9576107c96107a0565b500190565b6bffffffffffffffffffffffff1981358181169160148510156107985760149490940360031b84901b1690921692915050565b6001600160e01b031981358181169160048510156107985760049490940360031b84901b1690921692915050565b600061ffff808316818103610846576108466107a0565b6001019392505050565b8183823760009101908152919050565b6000815180845260005b818110156108865760208185018101518683018201520161086a565b81811115610898576000602083870101525b50601f01601f19169290920160200192915050565b60208152600061067b6020830184610860565b6040815260006108d36040830185610860565b90508260208301529392505050565b6040815260006108f56040830185610860565b905060018060a01b0383166020830152939250505056fea26469706673582212207f284f9552dd9d1aaa67f7051af9a6a8698354648a4d52600d695ce2d33afec764736f6c634300080d0033";

type ContractManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ContractManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ContractManager__factory extends ContractFactory {
  constructor(...args: ContractManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractManager> {
    return super.deploy(overrides || {}) as Promise<ContractManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ContractManager {
    return super.attach(address) as ContractManager;
  }
  override connect(signer: Signer): ContractManager__factory {
    return super.connect(signer) as ContractManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ContractManagerInterface {
    return new utils.Interface(_abi) as ContractManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ContractManager {
    return new Contract(address, _abi, signerOrProvider) as ContractManager;
  }
}
