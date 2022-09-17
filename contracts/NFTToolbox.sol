// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "hardhat/console.sol";


contract NFTToolbox is ERC721Enumerable, Ownable{ 
    using Strings for uint256;

    constructor() ERC721("ETH_Berlin", "ETHB") {
    }
    
    function _baseURI() internal pure override returns (string memory) {
        return "https://ec-serverapp-staging.herokuapp.com/card/";
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        // reformat to directory structure as below
        string memory folder = (tokenId % 100).toString(); 
        string memory file = tokenId.toString();
        string memory slash = "/";
        return string(abi.encodePacked(_baseURI(),folder,slash,file,".json"));
    }

    function mint(uint256 _newItemId) public {
        console.log("Hello1");

        require(!_exists(_newItemId), "ERC721: token already exists");
        _mint(msg.sender, _newItemId);
    }

    function mint(uint256 _newItemId, address recipient) public {

        require(!_exists(_newItemId), "ERC721: token already exists");
        _mint(recipient, _newItemId);
    }

    function batchMint(uint256[] calldata _newItemIds, address recipient) public {
        console.log("Hello1");
        for(uint256 i = 0; i < _newItemIds.length; i++) {
            console.log("Hello2");
            mint(_newItemIds[i], recipient);
        }
    }


}