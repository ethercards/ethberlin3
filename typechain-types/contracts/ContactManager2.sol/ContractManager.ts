/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace ContractManager {
  export type AccessStructStruct = {
    contractAddress: PromiseOrValue<string>;
    functionId: PromiseOrValue<BytesLike>;
    userWallet: PromiseOrValue<string>;
    value: PromiseOrValue<boolean>;
  };

  export type AccessStructStructOutput = [string, string, string, boolean] & {
    contractAddress: string;
    functionId: string;
    userWallet: string;
    value: boolean;
  };
}

export interface ContractManagerInterface extends utils.Interface {
  functions: {
    "getAdminAt(uint256)": FunctionFragment;
    "getAdminContains(address)": FunctionFragment;
    "getAdminsLength()": FunctionFragment;
    "getContracts()": FunctionFragment;
    "getFunctions()": FunctionFragment;
    "getUsers()": FunctionFragment;
    "hasAccess(address,bytes4,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAdmin(address,bool)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateAccess((address,bytes4,address,bool)[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getAdminAt"
      | "getAdminContains"
      | "getAdminsLength"
      | "getContracts"
      | "getFunctions"
      | "getUsers"
      | "hasAccess"
      | "owner"
      | "renounceOwnership"
      | "setAdmin"
      | "transferOwnership"
      | "updateAccess"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getAdminAt",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAdminContains",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAdminsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getContracts",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFunctions",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getUsers", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "hasAccess",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAdmin",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateAccess",
    values: [ContractManager.AccessStructStruct[]]
  ): string;

  decodeFunctionResult(functionFragment: "getAdminAt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAdminContains",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAdminsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFunctions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getUsers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasAccess", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateAccess",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "accessUpdatedEvent(tuple)": EventFragment;
    "adminEvent(address,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "accessUpdatedEvent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "adminEvent"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface accessUpdatedEventEventObject {
  _access: ContractManager.AccessStructStructOutput;
}
export type accessUpdatedEventEvent = TypedEvent<
  [ContractManager.AccessStructStructOutput],
  accessUpdatedEventEventObject
>;

export type accessUpdatedEventEventFilter =
  TypedEventFilter<accessUpdatedEventEvent>;

export interface adminEventEventObject {
  _address: string;
  mode: boolean;
}
export type adminEventEvent = TypedEvent<
  [string, boolean],
  adminEventEventObject
>;

export type adminEventEventFilter = TypedEventFilter<adminEventEvent>;

export interface ContractManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ContractManagerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getAdminAt(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getAdminContains(
      _addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getAdminsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    getContracts(overrides?: CallOverrides): Promise<[string[]]>;

    getFunctions(overrides?: CallOverrides): Promise<[string[]]>;

    getUsers(overrides?: CallOverrides): Promise<[string[]]>;

    hasAccess(
      _contractAddress: PromiseOrValue<string>,
      _functionId: PromiseOrValue<BytesLike>,
      _userWallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean] & { result: boolean }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAdmin(
      _admin: PromiseOrValue<string>,
      _mode: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateAccess(
      _newAccess: ContractManager.AccessStructStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getAdminAt(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getAdminContains(
    _addr: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getAdminsLength(overrides?: CallOverrides): Promise<BigNumber>;

  getContracts(overrides?: CallOverrides): Promise<string[]>;

  getFunctions(overrides?: CallOverrides): Promise<string[]>;

  getUsers(overrides?: CallOverrides): Promise<string[]>;

  hasAccess(
    _contractAddress: PromiseOrValue<string>,
    _functionId: PromiseOrValue<BytesLike>,
    _userWallet: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAdmin(
    _admin: PromiseOrValue<string>,
    _mode: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateAccess(
    _newAccess: ContractManager.AccessStructStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getAdminAt(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getAdminContains(
      _addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getAdminsLength(overrides?: CallOverrides): Promise<BigNumber>;

    getContracts(overrides?: CallOverrides): Promise<string[]>;

    getFunctions(overrides?: CallOverrides): Promise<string[]>;

    getUsers(overrides?: CallOverrides): Promise<string[]>;

    hasAccess(
      _contractAddress: PromiseOrValue<string>,
      _functionId: PromiseOrValue<BytesLike>,
      _userWallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setAdmin(
      _admin: PromiseOrValue<string>,
      _mode: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateAccess(
      _newAccess: ContractManager.AccessStructStruct[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "accessUpdatedEvent(tuple)"(_access?: null): accessUpdatedEventEventFilter;
    accessUpdatedEvent(_access?: null): accessUpdatedEventEventFilter;

    "adminEvent(address,bool)"(
      _address?: null,
      mode?: null
    ): adminEventEventFilter;
    adminEvent(_address?: null, mode?: null): adminEventEventFilter;
  };

  estimateGas: {
    getAdminAt(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAdminContains(
      _addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAdminsLength(overrides?: CallOverrides): Promise<BigNumber>;

    getContracts(overrides?: CallOverrides): Promise<BigNumber>;

    getFunctions(overrides?: CallOverrides): Promise<BigNumber>;

    getUsers(overrides?: CallOverrides): Promise<BigNumber>;

    hasAccess(
      _contractAddress: PromiseOrValue<string>,
      _functionId: PromiseOrValue<BytesLike>,
      _userWallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAdmin(
      _admin: PromiseOrValue<string>,
      _mode: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateAccess(
      _newAccess: ContractManager.AccessStructStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getAdminAt(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAdminContains(
      _addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAdminsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getContracts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFunctions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUsers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hasAccess(
      _contractAddress: PromiseOrValue<string>,
      _functionId: PromiseOrValue<BytesLike>,
      _userWallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAdmin(
      _admin: PromiseOrValue<string>,
      _mode: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateAccess(
      _newAccess: ContractManager.AccessStructStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
