import hre from "hardhat";

async function main() {
  console.log("Deploying Voting contract...");
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();
  const contractAddress = await voting.getAddress();
  
  console.log(` Voting contract deployed to: ${contractAddress}`);

  // Add a few candidates after deployment
  console.log("Adding initial candidates...");
  await voting.addCandidate("Alice");
  await voting.addCandidate("Bob");
  await voting.addCandidate("Charlie");
  console.log(" Initial candidates added.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});