// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/// @title Dappcord: A contract for managing membership channels and NFT minting.
/// @author Antharithm
/// @notice This contract allows the creation of channels and mints NFT membership tokens for users per channel.
/// @dev This contract is ERC721 compliant.

// ERC721 Token Compliant Imports
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Dappcord is ERC721 {
    uint256 public totalSupply;
    uint256 public totalChannels; // defaults to 0
    address public owner;

    struct Channel {
        uint256 id;
        string name;
        uint256 cost;
    }

    /// @dev Keeps track of the Channels.
    mapping(uint256 => Channel) public channels;
    /// @dev Keeps track of the Addresses associated with a particular Channel.
    mapping(uint256 => mapping(address => bool)) public hasJoined;

    modifier onlyOwner() {
        /// @dev Requires the sender to be the owner of the contract.
        require(msg.sender == owner);
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        /// @dev Initializes the contract with the contract deployer as the owner.
        owner = msg.sender;
    }

    /// @notice Creates a new channel.
    /// @dev Only the contract owner can create channels.
    /// @param _name The name of the channel.
    /// @param _cost The cost (in Ether) associated with joining the channel.
    function createChannel(
        string memory _name,
        uint256 _cost
    ) public onlyOwner {
        /// @dev Increments the totalChannels count by 1.
        totalChannels++;
        channels[totalChannels] = Channel(totalChannels, _name, _cost);
    }

    /// @notice Mints an NFT membership token for a user in the specified channel.
    /// @dev Users can only join existing channels, and each user can join a channel only once.
    /// @param _id The ID of the channel to join.
    function mint(uint256 _id) public payable {
        require(_id != 0);
        require(_id <= totalChannels); // prevents non-existing channels
        require(hasJoined[_id][msg.sender] == false); // prevents joining a channel twice
        require(msg.value >= channels[_id].cost); // requires the correct amount of Ether

        /// @dev Marks the user as joined in the specified channel.
        hasJoined[_id][msg.sender] = true;

        /// @dev Mints a new NFT membership token for the user.
        totalSupply++;
        _safeMint(msg.sender, totalSupply);
    }

    /// @notice Retrieves the details of a channel.
    /// @param _id The ID of the channel.
    /// @return channel The Channel struct containing the channel's details.
    function getChannel(uint256 _id) public view returns (Channel memory) {
        return channels[_id];
    }

    /// @notice Allows the contract owner to withdraw funds from the contract.
    /// @dev Only the contract owner can call this function.
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
