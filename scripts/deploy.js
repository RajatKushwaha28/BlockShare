const { ethers } = require("ethers");

async function main() {
  // Connect to Ganache
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");

  // Use one of Ganache's private keys (replace with an actual private key from Ganache)
  const privateKey = ""; 
  const wallet = new ethers.Wallet(privateKey, provider);

  // Load the contract artifact
  const UploadArtifact = require("../build/contracts/Upload.json"); // Corrected path

  // Deploy the contract
  const factory = new ethers.ContractFactory(
    UploadArtifact.abi,
    UploadArtifact.bytecode,
    wallet
  );

  const contract = await factory.deploy();
  await contract.deployed();

  console.log("Library deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
