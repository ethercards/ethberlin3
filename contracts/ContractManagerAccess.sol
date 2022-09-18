//SPDX-License-Identifier: Unlicensed
pragma solidity = 0.8.13;

/* 
 *   ██████      █████     ██                                                                                                                                   
 *  ██          ██   ██    ██                                                                                                                                   
 *  ██   ███    ███████    ██                                                                                                                                   
 *  ██    ██    ██   ██    ██                                                                                                                                   
 *   ██████  ██ ██   ██ ██ ███████ ██                                                                                                                           
 *
 *
 * General Access Layer - Authorization management
 *
 * Galaxis tools
 */

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol"; 

/// @title GAL - Generic Access Layer (authorization abstract)
/// @author Galaxis
/// @notice Abstract class implementing authorization funtionality
/// @notice Only owner of ContractManager can add new admins (and transfer it's ownership)
/// @notice Any admin can use updateAccess() to add new authorization
/// @dev - Each child contract must be owned by the GAL
///      - Their state changing functions need to be onlyOwner() protected
//       - GAL protects transferOwnership and renounceOwnership from calling on
///        it's child contracts
///      Emitted events:
///      - adminEvent:         admins were added/removed
///      - accessUpdatedEvent: user access was added/rewoked

abstract contract ContractManagerAccess is Ownable {

    /*
    *   Library
    */

    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.Bytes32Set;

    /*
    *   Types
    */

    struct accessStruct {
        address contractAddress;
        bytes4  functionId;
        address userWallet;     // address of the smart contract that will implement extra functionality
        bool    value;
    }

    /*
    *   Data
    */

    // Set for admin addresses
    EnumerableSet.AddressSet admins;

    // Set for managed contract addresses
    EnumerableSet.AddressSet contracts;

    // Set for managed user addresses
    EnumerableSet.AddressSet users;

    // Set for managed functions
    EnumerableSet.Bytes32Set functions;

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
    }

    // Read users
    function getUsers() public view returns (address[] memory) {
        return users.values();
    }

    // Read functions
    function getFunctions() public view returns (bytes32[] memory) {
        return functions.values();
    }

    /*
    *   Control access information
    */

    /// @notice Batch adds right(s) for user(s) to call function(s) in one of its child contract
    /// @param _newAccess Array of tupples to add authorization:
    ///         - address contractAddress;
    ///         - bytes4  functionId;
    ///         - address userWallet;
    ///         - bool    value;
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

    /// @notice Checks if a user has the rights to call a function in a child contract
    /// @dev The GAL owner may call anything besides transferOwnership and renounceOwnership functions
    /// @param _contractAddress Address of the child contract to query
    /// @param _functionId The first 4 byte of the encoded function interface
    /// @param _userWallet Address of the user whose authorization to check
    function hasAccess(
        address _contractAddress,
        bytes4  _functionId,
        address _userWallet
    ) public view returns (bool result) {

        // Protect transferOwnership and renounceOwnership functions!!
        if( _functionId == 0xf2fde38b || _functionId == 0x715018a6 ) {
            return false;
        }

        // GAL Owner can call anything (besides changing ownership)
        if( msg.sender == owner() ) {
            return true;
        }

        // Check access
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

