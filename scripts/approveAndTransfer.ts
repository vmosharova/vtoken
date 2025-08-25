import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const [owner, spender, receiver] = await ethers.getSigners();

  const tokenContractAddress = process.env.TOKEN_ADDRESS!;
  const VToken = await ethers.getContractAt("VToken", tokenContractAddress);

  let ownerBalance = await VToken.balanceOf(owner.address);

  console.log("Before transfer:");
  console.log("Owner balance:", ethers.formatUnits(ownerBalance, 18));

  const approvedAllowance = ethers.parseUnits("20", 18);
  const txApprove = await VToken.connect(owner).approve(
    spender.address,
    approvedAllowance,
  );
  await txApprove.wait();
  
  const allowance = await VToken.allowance(owner.address, spender.address);
  console.log(`Current allowance for spender "${spender.address}" is ${ethers.formatUnits(allowance, 18)}`);

  const amountToTransfer = await ethers.parseUnits("19", 18);
  const txTransfer = await VToken.connect(spender).transferFrom(owner.address, receiver.address, amountToTransfer);
  await txTransfer.wait();
  console.log(`${ethers.formatUnits(amountToTransfer, 18)} is sent from the owner to the receiver on the behalf of the spender`)
  
  const newAllowance = await VToken.allowance(owner.address, spender.address);
  console.log(`New allowance for spender is ${ethers.formatUnits(newAllowance, 18)}`);
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});