pragma solidity = 0.8.13;

/* 
 *   ██████      █████     ██                                                                                                                                   
 *  ██          ██   ██    ██                                                                                                                                   
 *  ██   ███    ███████    ██                                                                                                                                   
 *  ██    ██    ██   ██    ██                                                                                                                                   
 *   ██████  ██ ██   ██ ██ ███████ ██                                                                                                                           
 *
 *
 * General Access Layer
 *
 * Galaxis tools
 */

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./ContractManagerAccess.sol";

/// @title GAL - General Access Layer
/// @author Galaxis
/// @notice Implementing controlled batch calling funtionality for "write" functions
/// @notice This helps build better UX and also saves gas (depending on use case)
/// @notice - Only owner of ContractManager can add new admins
/// @notice - Any admin can use updateAccess() to add new authorization
/// @notice - If any called function in the batch fails or not authorized
/// @notice   everything will be reverted!
/// @dev - Each child contract must be owned by the GAL
///      - Their state changing functions need to be onlyOwner() protected
//       - GAL protects transferOwnership and renounceOwnership from calling on
///        it's child contracts
///      Emitted events:
///      - RequestCompelted: all calls in the batch was successfully processed
///      - RequestFailed:    a call in the batch failed
///      - adminEvent:         admins were added/removed
///      - accessUpdatedEvent: user access was added/rewoked

contract ContractManager is ContractManagerAccess {

    /*
    *   Data
    */

    error RequestFailed(uint16 id);

    /*
    *   Events
    */

    event RequestCompelted(bytes indexed data);

    /// @notice Call all requested functions in batch
    /// @dev Reverts if any one function call reverts/unauthorized
    /// @param bytesData The byte array for the encoded call data
    ///                  Need to be prepared in the frontend library
    ///
    ///        Format:
    ///          2 bytes: number of calls (uint16)
    ///          2 bytes: length of next transaction (=n bytes) (uint16)
    ///          n bytes: the transaction:
    ///            32 bytes left padded address to call
    ///            requested number of parameter (calldata)
    function batchCall(bytes memory bytesData) public {

        uint16 numberOfCalls;

        uint256 ptr;
  
        assembly {

            // set read pointer
            ptr := add( bytesData, 32 )

            numberOfCalls := shr( 240, mload( ptr ) )
            // shift pointer to data Id
            ptr := add( ptr, 2 )

            // move free memory pointer
            mstore(0x40, msize()) 
        }

        for(uint8 i = 0; i < numberOfCalls; i++) {
            uint256 dataLength;
            address toAddress;
            bytes4 fnHash;
            assembly {

                // ( 2 bytes ) load calldata length 
                dataLength := shr( 240, mload( ptr ) )
                ptr := add( ptr, 2 )

                // ( 32 bytes ) load our address into a stack variable that our call can use
                toAddress := mload( ptr )
                ptr := add( ptr, 32 )
                fnHash := mload(ptr)
            }

            // Validate contract access!
             require(
                 hasAccess(
                             toAddress,
                             fnHash,
                             msg.sender
                 ),
                 "Not Authorised"
             );

            bool success;
            assembly {

                let x := mload(0x40)

                // call(g, a, v, in, insize, out, outsize)
                success := call(      
                    gas(),     
                    toAddress,      // To addr
                    0,
                    ptr,            // Inputs are stored at current ptr location
                    dataLength,     // input length
                    x,          
                    0
                )

                // move to next call area
                ptr := add( ptr, dataLength )
            }

            if(!success) {
                revert RequestFailed({id: i});
            }
            emit RequestCompelted(bytesData);
        }
    }
}