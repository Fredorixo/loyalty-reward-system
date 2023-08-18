// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.8.19;

error InvalidAccess(address _user);
error NotEnoughBalance(uint256 _amount, uint256 _balance);

contract Ledger {
    address immutable admin;
    uint256 totalLoyaltyPoints;
    mapping(address => uint256) public account;

    event Exchange(address _user, int256 _amount);

    // Set the admin and initial supply for the loyalty points
    constructor() {
        admin = msg.sender;
    }

    // Ensures access is performed by the admin only
    modifier onlyAdmin() {
        if (msg.sender != admin) {
            revert InvalidAccess(msg.sender);
        }

        _;
    }

    // Set the initial supply for loyalty points
    function setPoints(uint256 _amount) public onlyAdmin {
        totalLoyaltyPoints = _amount;
    }

    // Display the current supply of loyalty points
    function getPoints() public view onlyAdmin returns (uint256) {
        return totalLoyaltyPoints;
    }

    // Add loyalty points to the purchaser's account
    function addPoints(uint256 _amount) public {
        totalLoyaltyPoints -= _amount;
        account[msg.sender] += _amount;
        emit Exchange(msg.sender, int256(_amount));
    }

    // Deduct loyalty points from the spender's account
    function deductPoints(uint256 _amount) public {
        if (account[msg.sender] < _amount) {
            revert NotEnoughBalance(_amount, account[msg.sender]);
        }

        totalLoyaltyPoints += _amount;
        account[msg.sender] -= _amount;
        emit Exchange(msg.sender, -int256(_amount));
    }

    // Showcase the user's balance
    function balance() public view returns (uint256) {
        return account[msg.sender];
    }
}
