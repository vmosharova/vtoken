import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    const [deployer, receiver] = await ethers.getSigners();

    const tokenAddress = process.env.TOKEN_ADDRESS!;
    const VToken = await ethers.getContractAt("VToken", tokenAddress);

    let deployerBalance = await VToken.balanceOf(deployer.address);
    let receiverBalance = await VToken.balanceOf(receiver.address);

    console.log("Before transfer:");
    console.log("Deployer balance:", ethers.formatUnits(deployerBalance, 18));
    console.log("Receiver balance:", ethers.formatUnits(receiverBalance, 18));  
  
    const amount = ethers.parseUnits("100", 18);

    const tx = await VToken.transfer(receiver.address, amount);
    await tx.wait();

    deployerBalance = await VToken.balanceOf(deployer.address);
    receiverBalance = await VToken.balanceOf(receiver.address);

    console.log("After transfer:");
    console.log("Deployer balance:", ethers.formatUnits(deployerBalance, 18));
    console.log("Receiver balance:", ethers.formatUnits(receiverBalance, 18));
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
