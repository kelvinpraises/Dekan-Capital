// // SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.20;

import "https://github.com/openZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC4626.sol";
import
    "https://github.com/openZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Permit.sol";
import
    "https://github.com/openZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract Dekan is ERC20, ERC4626, ERC20Permit, ERC20Votes {
    constructor(IERC20 _asset) ERC4626(_asset) ERC20("Dekan", "DKN") ERC20Permit("Dekan") {}

    // The following functions are overrides required by Solidity.

    function decimals() public view override(ERC4626, ERC20) returns (uint8) {
        return super.decimals();
    }

    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Votes) {
        super._update(from, to, value);
    }

    function nonces(address owner) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
