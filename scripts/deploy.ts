import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

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

  const tokenAddress = token.target;

  console.log(`Token deployed at address: ${tokenAddress}`);
  const envFilePath = path.resolve(__dirname, "../.env");

  let envContent = "";
  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, "utf-8");

    if (envContent.includes("TOKEN_ADDRESS=")) {
      envContent = envContent.replace(/TOKEN_ADDRESS=.*/g, `TOKEN_ADDRESS=${tokenAddress}`);
    } else {
      envContent += `\nTOKEN_ADDRESS=${tokenAddress}\n`;
    }
    
  } else {
    envContent = `TOKEN_ADDRESS=${tokenAddress}\n`;
  }

  fs.writeFileSync(envFilePath, envContent);
  console.log("TOKEN_ADDRESS saved to .env");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
