pragma solidity = 0.8.13;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

interface mIERC721 {
    function mint(uint256 _newItemId) external;

}
contract ContractManager is Ownable {
    
    error RequestFailed(uint16 id);
    event RequestCompelted(bytes indexed data);


    function test () public {
        console.log("Works");
    }

    function batchCall (bytes calldata bytesData) public {
        console.log("bytes data size: ",bytesData.length);
        uint256 pointer=2;
        console.log("POINTER",pointer);
        uint16 numberOfCalls = uint16(bytes2(bytesData[0:pointer]));
        console.log(numberOfCalls);
        for(uint16 i = 0; i < numberOfCalls; i++) {
            uint16 dataLength = uint16(bytes2(bytesData[pointer:pointer+2]));
            console.log("dataLength", dataLength);
            pointer = pointer + 2;
            address toAddress = address(bytes20(bytesData[pointer:pointer+20]));
            console.log("toAddress", toAddress);
            pointer = pointer + 20;
            bytes4 fnHash = bytes4(bytesData[pointer:pointer+4]); 
            console.logBytes4(fnHash);
            //bytes memory fnCallData = bytes(bytesData[pointer : pointer+dataLength]);
            //console.logBytes(fnCallData);
            // Check access
            checkAccess(toAddress,fnHash,msg.sender);
            bool success;

            // mIERC721 tokenAddress = mIERC721(toAddress);
            // tokenAddress.mint(1);
          
            assembly {
                let x := mload(0x40) // allocate empty space
                success := call(
                    gas(),
                    toAddress,
                    0,
                    pointer,
                    dataLength,
                    x,
                    0 
                )
                 
            }
           // console.logBytes(x);
            pointer = pointer + dataLength;
            console.log(success);
            if(!success) {
                revert RequestFailed({id: i});
            }

        }

        emit RequestCompelted(bytesData);


    }
   /* 0x000100c4
    0000000000000000000000005FbDB2315678afecb367f032d93F642f64180aa3
    eb699f22
    0000000000000000000000000000000000000000000000000000000000000040
    000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266
    0000000000000000000000000000000000000000000000000000000000000003
    0000000000000000000000000000000000000000000000000000000000000001
    0000000000000000000000000000000000000000000000000000000000000002
    0000000000000000000000000000000000000000000000000000000000000003*/

    function checkAccess(address _contractAdress, bytes4 _fnHash, address _functionCaller) public returns (bool){
        //console.log("Test");
        return true;
    }
}