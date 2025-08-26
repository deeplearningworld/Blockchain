###Decentralized Voting System (DApp)###
This project is a complete decentralized application (DApp) for voting, built on the Ethereum blockchain. It features a smart contract backend written in Solidity and a responsive frontend built with React. Users can connect their MetaMask wallet to interact with the application, view candidates, and cast their votes securely and transparently.

Tech Stack:

1.Solidity: For writing the smart contract.

2.Hardhat: For local blockchain development, testing, and deploying the smart contract.

3.React: For building the user interface.

4.Ethers.js: A JavaScript library for interacting with the Ethereum blockchain.

5.MetaMask: As the wallet to connect to the DApp and sign transactions.

#Project Structure#

decentralized-voting-dapp/
├── hardhat/                  # Hardhat project for the smart contract
│   ├── contracts/
│   │   └── Voting.sol
│   ├── scripts/
│   │   └── deploy.js
│   └── hardhat.config.js
├── src/                      # React frontend application
│   ├── artifacts/            
│   ├── App.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md


###How to Run This Project###

Prerequisites:

Node.js and npm installed.

MetaMask browser extension installed.

Step 1: Set Up the Hardhat Project (Backend)

First, we'll set up and deploy the smart contract.

# Navigate into the hardhat directory
cd hardhat

# Install dependencies
npm install

# Start a local Hardhat blockchain node
npx hardhat node

This will start a local Ethereum node. In a new terminal window, deploy the smart contract:

# Navigate into the hardhat directory again in the new terminal
cd hardhat

# Deploy the contract to the local node
npx hardhat run scripts/deploy.js --network localhost

After deployment, copy the contract address printed in the terminal. You will need it for the frontend.

Step 2: Set Up the React Frontend

Now, let's set up the user interface.

# Go back to the root project directory
cd ..

# Install frontend dependencies
npm install

# IMPORTANT: Copy the contract artifact (ABI)
# Create the artifacts directory in src
mkdir -p src/artifacts
# Copy the JSON file from the hardhat project
cp hardhat/artifacts/contracts/Voting.sol/Voting.json src/artifacts/

# IMPORTANT: Update the contract address
# Open `src/App.js` and paste the copied contract address
# into the `contractAddress` variable.

Step 3: Run the Frontend Application

# Start the React development server
npm start

Your browser should open to http://localhost:3000, where you can interact with the DApp.

Step 4: Connect MetaMask

Open MetaMask and connect to the Hardhat Network (or Localhost 8545).
