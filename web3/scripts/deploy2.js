const hre = require("hardhat");

async function main() {
  // Deploy the contract with an initial argument if needed
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const deployedContract = await Marketplace.deploy(1); // Assuming '1' is the correct argument

  // Wait for the deployment to be completed
  // await deployedContract.deployed();
  console.log(`contract deployed to ${deployedContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
