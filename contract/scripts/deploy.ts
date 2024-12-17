import { viem } from "hardhat";

async function main() {
  console.log("Deploying contract");
  const contract = await viem.deployContract("Messenger");
  const contractAddress = contract.address;
  console.log("Messenger contract deployed to: ", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
