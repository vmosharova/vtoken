# A custom ERC-20 token VToken (VARY)
                                                        
This project is a simple ERC20 token implementation built with Hardhat and TypeScript.
This project is a work in progress and will expand with time.

## Overview

VToken (VARY) is a basic ERC20 token contract deployed on a local Hardhat network. The token has an
initial supply of 1000 tokens minted to the deployer's address.

## Tech Stack

- Solidity ^0.8.30
- Hardhat
- OpenZeppelin Contracts

## Features

- ERC20-compliant token contract (`VToken.sol`)
- Custom name (VToken) and symbol (VARY)
- Deployment script with automatic address persistence (`scripts/deploy.ts`)
- Balance checking (`scripts/checkBalance.ts`)
- Token transfer (`scripts/transfer.ts`)

## Usage

### 0. Prerequisites:

- Node.js (^20 recommended)
- `pnpm` package manager (^10)

### 1. Install dependencies:

`pnpm install`

### 2. Compile contracts:

`pnpm run compile` compiles the Solidity smart contracts using Hardhat.

### 3. Start local Hardhat network:

`pnpm run node` starts a local Hardhat blockchain node for development and testing

### 4. Deploy token:

`pnpm run deploy:local` deploys the VToken contract to the local network with 1,000 initial tokens and automatically saves the generated contract address to the `.env` file.

## Contract interactions
### Check Balance:

`pnpm checkBalance:local` displays the current VToken balance of the deployer account.

### Transfer:

`pnpm transfer:local` transfers 100 VTokens from the deployer account to a receiver account (the second account from the hadrhat-generated list) and displays the before/after balances for both accounts.

### Add allowance and make transfer:

`approveAllowanceAndTransfer:local` lets the owner approve a spender to transfer tokens on their behalf. It sets an allowance amount, executes the transfer and logs the allowance before and after.