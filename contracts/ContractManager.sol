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

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "hardhat/console.sol";
import "./ContractManagerAccess.sol";

interface mIERC721 {
    function mint(uint256 _newItemId) external;

}
contract ContractManager is ContractManagerAccess {
    
    error RequestFailed(uint16 id);
    event RequestCompelted(bytes indexed data);


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
            assembly {

                // ( 2 bytes ) load calldata length 
                dataLength := shr( 240, mload( ptr ) )
                ptr := add( ptr, 2 )

                // ( 32 bytes ) load our address into a stack variable that our call can use
                toAddress := mload( ptr )
                ptr := add( ptr, 32 )
            }

            // Validate contract access!
            // require(
            //     hasAccess(
            //                 address _contractAddress,
            //                 bytes4  _functionId,
            //                 address _userWallet
            //     ),
            //     "Not Authorised"
            // );

            bool success;
            assembly {

                // do we really need this ?
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