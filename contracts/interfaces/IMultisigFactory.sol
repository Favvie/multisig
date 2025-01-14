// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {MultisigTest} from "../MultisigTest.sol";

interface IMultisigFactory {
    function createMultisigWallet(uint256 _quorum, address[] memory _validSigners) external returns (MultisigTest newMulsig_, uint256 length_);

    function getMultiSigClones() external view returns(MultisigTest[] memory);
}