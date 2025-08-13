import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    const tokenAddress = process.env.TOKEN_ADDRESS!;
    const [deployer] = await ethers.getSigners();

    const VToken = await ethers.getContractAt("VToken", tokenAddress);
    const balance = await VToken.balanceOf(deployer.address);

    console.log("Deployer balance:", ethers.formatUnits(balance, 18));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});