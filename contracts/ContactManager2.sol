//SPDX-License-Identifier: Unlicensed
pragma solidity = 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol"; 
import "hardhat/console.sol";

contract ContractManager2 is Ownable {
    // only owner of ContractManager can add new admins (and transfer it's ownership)
    // any admin can updateAccess() (add new authorization)

    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.Bytes32Set;

    /*
    *   Data
    */

    struct accessStruct {
        address contractAddress;
        bytes4  functionId;
        address userWallet;     // address of the smart contract that will implement extra functionality
        bool    value;
    }

    // Set for admin addresses
    EnumerableSet.AddressSet admins;

    // Set for managed contract addresses
    EnumerableSet.AddressSet contracts;

    // Set for managed user addresses
    EnumerableSet.AddressSet users;

    // Set for managed functions
    EnumerableSet.Bytes32Set functions;


    //.      contract           userWallet
    // ...mapping(address => mapping(address => functionSet))

//    userWalletSet
//    contractAddressSet

//    mapping(address => mapping(bytes4 => mapping(address => bool)) ) public access;

// src      dst.    fn
//addressesCount =1
//mapping(uint256 => address) addressToId
//mapping(uint256 => address) addressIdToDST

   // mapping(address => mapping(bytes4 => mapping(address => bool)) ) public access;

    mapping(address => mapping(address => EnumerableSet.Bytes32Set) ) access;

    /*
    *   Events
    */

    event accessUpdatedEvent(accessStruct _access);
    event adminEvent(address _address, bool mode);


    /*
    *   Controlling the "Admin" authorization
    */

    function setAdmin(address _admin, bool _mode) public onlyOwner {
        if(_mode) {
            admins.add(_admin);
        } else {
            admins.remove(_admin);
        }
        emit adminEvent(_admin, _mode);
    }

    function getAdminsLength() public view returns (uint256) {
        return admins.length();
    }

    function getAdminAt(uint256 _index) public view returns (address) {
        return admins.at(_index);
    }

    function getAdminContains(address _addr) public view returns (bool) {
        return admins.contains(_addr);
    }

    /*
    *   Read the sets
    */

    // Read contracts
    function getContracts() public view returns (address[] memory) {
        return contracts.values();


        // uint256 len = EnumerableSet.length(contracts);
        // address[] memory retval = new address[](len);
        // for(uint16 i = 0; i < len; i++) {
        //     retval[i] = EnumerableSet.at(contracts, i);
        // }
        // return retval;
    }

    // Read users
    function getUsers() public view returns (address[] memory) {
        return users.values();

        // uint256 len = EnumerableSet.length(users);
        // address[] memory retval = new address[](len);
        // for(uint16 i = 0; i < len; i++) {
        //     retval[i] = EnumerableSet.at(users, i);
        // }
        // return retval;
    }

    // Read functions
    function getFunctions() public view returns (bytes32[] memory) {
        return functions.values();

        // uint256 len = EnumerableSet.length(functions);
        // bytes32[] memory retval = new bytes32[](len);
        // for(uint16 i = 0; i < len; i++) {
        //     retval[i] = EnumerableSet.at(functions, i);
        // }
        // return retval;
    }

    /*
    *   Control access information
    */

    function updateAccess(
        accessStruct[] calldata _newAccess
    ) public onlyAdmin {

        for (uint8 i = 0; i < _newAccess.length; i++) {
            if(_newAccess[i].value) {
                contracts.add(_newAccess[i].contractAddress);
                users.add(_newAccess[i].userWallet);
                functions.add(_newAccess[i].functionId);
                access[_newAccess[i].contractAddress][_newAccess[i].userWallet].add(_newAccess[i].functionId);
            } else {
                access[_newAccess[i].contractAddress][_newAccess[i].userWallet].remove(_newAccess[i].functionId);
            }

            //access[_newAccess[i].contractAddress][_newAccess[i].functionId][_newAccess[i].userWallet] = _newAccess[i].value; 
            emit accessUpdatedEvent(_newAccess[i]);
        }
    }

    function hasAccess(
        address _contractAddress,
        bytes4  _functionId,
        address _userWallet
    ) public view returns (bool result) {
        if( _functionId == 0xf2fde38b || _functionId == 0x715018a6 ) {
            // Protect transferOwnership and renounceOwnership functions!!
            return false;
        }
        return access[_contractAddress][_userWallet].contains(_functionId);
    }

    /*
    *   Modifiers
    */

    modifier onlyAdmin() {
        require(
            msg.sender == owner() || getAdminContains(msg.sender),
            "Not Authorised"
        );
        _;
    }

}

