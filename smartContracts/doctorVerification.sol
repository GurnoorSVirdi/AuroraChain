// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DoctorVerification {
    mapping(address => bool) public isDoctor;

    // Address of the owner (the one who deploys the contract)
    address public owner;

    // Modifier to restrict functions to only the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Constructor sets the owner to the address that deploys the contract
    constructor() {
        owner = msg.sender;
    }

    // Function to add a doctor's wallet address
    function addDoctor(address _doctorAddress) public onlyOwner {
        isDoctor[_doctorAddress] = true;
    }

    // Function to remove a doctor's wallet address
    function removeDoctor(address _doctorAddress) public onlyOwner {
        isDoctor[_doctorAddress] = false;
    }

    // Function to check if an address is a doctor
    function verifyDoctor(address _doctorAddress) public view returns (bool) {
        return isDoctor[_doctorAddress];
    }
}
