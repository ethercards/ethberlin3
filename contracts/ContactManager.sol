pragma solidity = 0.8.13;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";




contract ChainBatchWriteAdapter is Ownable {
    
    error RequestFailed(uint8 id);
    event RequestCompelted(bytes indexed data);

    function batchCall (bytes calldata bytesData) public {
        uint256 pointer=2;
        uint8 numberOfCalls = abi.decode(bytesData[0:pointer], (uint8));
        for(uint8 i = 0; i < numberOfCalls; i++) {
            uint16 dataLength = abi.decode(bytesData[pointer:pointer+2], (uint16));
            pointer = pointer + 2;
            address toAddress = abi.decode(bytesData[pointer:pointer+20], (address));
            pointer = pointer + 20;
            bytes4 fnHash = bytes4(bytesData[pointer:pointer+4]); 
            bytes memory test = bytes(bytesData[pointer : pointer+dataLength]);
            // Check access
            checkAccess(toAddress,fnHash,msg.sender);
            bool success;
            assembly {
                let x := mload(0x40) // allocate empty space
                success := call(
                    gas(),
                    toAddress,
                    0,
                    test,
                    dataLength,
                    x,
                    0 
                )
            }
           
            pointer = pointer + dataLength;

            if(!success) {
                revert RequestFailed({id: i});
            }

        }

        emit RequestCompelted(bytesData);


    }

    function checkAccess(address _contractAdress, bytes4 _fnHash, address _functionCaller) public returns (bool){
        return true;
    }
}