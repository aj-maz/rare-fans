import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Creator.sol";

contract CreatorRegistry {
    address public creatorImplementation;

    address[] public creators;
    address[] public creatorAddresses;
    mapping(address => address) public creatorsMapping;

    constructor() public {
        creatorImplementation = address(new Creator());
    }

    function addCreator(string memory _baseUri) public {
        require(
            creatorsMapping[msg.sender] == address(0),
            "already have account"
        );
        address creator = Clones.clone(creatorImplementation);
        Creator(creator).initialize(_baseUri);
        creators.push(address(creator));
        creatorAddresses.push(msg.sender);
        creatorsMapping[msg.sender] = address(creator);
        Creator(creator).transferOwnership(msg.sender);
    }

    function getCreators() public view returns (address[] memory) {
        return creators;
    }

    function getCreatorAddresses() public view returns (address[] memory) {
        return creatorAddresses;
    }
}
