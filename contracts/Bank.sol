// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Bank {
    // ex : user 0x58afuj44 -> 3 eth
    event Deposit(address indexed depositor, uint256 amount);
    event Withdrawal(address indexed withdrawer, uint256 amount);

    modifier checkSenderBalance() {
        require(address(this).balance > 0, "low balance");
        _;
    }

    mapping(address => uint256) public balances;

    function depostit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function sendEth(
        address payable _to,
        uint256 _amount
    ) external checkSenderBalance {
        (bool sent, bytes memory data)  = _to.call{value : _amount}("");
        require(sent, "failed to send transaction");
    }

    function checkBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
