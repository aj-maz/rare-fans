// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Creator is ERC1155, Ownable {
    using Counters for Counters.Counter;

    struct Tier {
        string info;
        uint256 price;
        uint256 totalSupply;
        uint32 activeDays;
        bool isDM;
        uint256 royalty;
    }

    Counters.Counter private idCounter;

    uint256[] public tierIds;
    uint256[] public postIds;
    mapping(uint256 => Tier) public tiers;
    mapping(uint256 => string) public posts;

    constructor(string memory _infoUri) ERC1155(_infoUri) {}

    function addTier(
        string memory _info,
        uint256 _price,
        uint256 _totalSupply,
        uint32 _activeDays,
        bool _isDM,
        uint256 _royalty
    ) public onlyOwner {
        Tier memory tier = Tier(
            _info,
            _price,
            _totalSupply,
            _activeDays,
            _isDM,
            _royalty
        );
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

    // create post
    // create tier
}
