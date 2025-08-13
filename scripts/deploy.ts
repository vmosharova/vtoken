import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const name = "VToken";
  const symbol = "VARY";
  const initialSupply = ethers.parseUnits("1000", 18);

  const VToken = await ethers.getContractFactory("VToken");

  // deployment:
  const token = await VToken.deploy(name, symbol, initialSupply);

  await token.waitForDeployment();

  console.log(`Token deployed at address: ${token.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
