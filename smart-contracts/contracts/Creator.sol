// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Creator is Initializable, ERC1155Upgradeable, OwnableUpgradeable {
    using Counters for Counters.Counter;

    struct Tier {
        string info;
        uint256 price;
        uint256 totalSupply;
        bool isDM;
        uint256 alreadyMinted;
    }

    Counters.Counter private idCounter;

    uint256[] public tierIds;
    uint256[] public postIds;
    mapping(uint256 => Tier) public tiers;
    mapping(uint256 => string) public posts;

    function initialize(string memory _infoUri) initializer public {
        __ERC1155_init(_infoUri);
        __Ownable_init();
    }

    function addTier(
        string memory _info,
        uint256 _price,
        uint256 _totalSupply,
        bool _isDM
    ) public onlyOwner {
        require(_totalSupply > 0, "totalSupply > 0");

        Tier memory tier = Tier(_info, _price, _totalSupply, _isDM, 0);
        tierIds.push(idCounter.current());
        tiers[idCounter.current()] = tier;
        idCounter.increment();
    }

    function getTierIds() public view returns (uint256[] memory) {
        return tierIds;
    }

    function getTiers() public view returns (Tier[] memory) {
        Tier[] memory trs = new Tier[](tierIds.length);
        for (uint256 i = 0; i < tierIds.length; i++) {
            trs[i] = tiers[tierIds[i]];
        }
        return trs;
    }

    function mintTier(uint256 _tierId) public payable {
        Tier storage tier = tiers[_tierId];
        require(tier.totalSupply > 0, "Tier does not exists");
        require(msg.value == tier.price, "Wrong value");
        require(tier.alreadyMinted <= tier.totalSupply, "Max supply is minted");
        _mint(msg.sender, _tierId, 1, "");
        tier.alreadyMinted++;
    }

    // create post

    function addPost(string memory _postInfo) public onlyOwner {
        postIds.push(idCounter.current());
        posts[idCounter.current()] = _postInfo;
        idCounter.increment();
    }

    function getPostsIds() public view returns (uint256[] memory) {
        return postIds;
    }

    function getPosts() public view returns (string[] memory) {
        string[] memory psts = new string[](postIds.length);
        for (uint256 i = 0; i < postIds.length; i++) {
            psts[i] = posts[postIds[i]];
        }
        return psts;
    }

    // withdraw
    function withdraw() public onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, "Failed to send Ether");
    }
}
