import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// Import the ABI from the copied artifacts file
import VotingArtifact from './artifacts/Voting.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [status, setStatus] = useState("Not connected.");
  
  // IMPORTANT: Replace with your deployed contract address ** Insert the contract address here **
  const contractAddress = "INSERT YOUR ADRESS HERE";

  useEffect(() => {
    if (contract) {
      getCandidates();
    }
  }, [contract]);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);
        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setStatus(`Connected: ${address.substring(0, 6)}...`);
        
        const votingContract = new ethers.Contract(contractAddress, VotingArtifact.abi, signer);
        setContract(votingContract);
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to connect wallet.");
    }
  };

  const getCandidates = async () => {
    try {
      const count = await contract.candidatesCount();
      const fetchedCandidates = [];
      for (let i = 1; i <= count; i++) {
        const candidate = await contract.candidates(i);
        fetchedCandidates.push({
          id: Number(candidate.id),
          name: candidate.name,
          voteCount: Number(candidate.voteCount)
        });
      }
      setCandidates(fetchedCandidates);
    } catch (error) {
      console.error("Could not fetch candidates.", error);
    }
  };

  const vote = async (candidateId) => {
    try {
      setStatus(`Voting for candidate ${candidateId}...`);
      const tx = await contract.vote(candidateId);
      await tx.wait();
      setStatus(`Successfully voted for candidate ${candidateId}!`);
      getCandidates(); // Refresh candidate list after voting
    } catch (error) {
      console.error("Voting failed.", error);
      setStatus(error?.revert?.args[0] || "Voting failed. Have you already voted?");
    }
  };
  
  return (
    <div className="App">
      <header>
        <h1>Decentralized Voting DApp</h1>
        {account ? (
          <p>Connected as: {account}</p>
        ) : (
          <button className="connect-button" onClick={connectWallet}>Connect Wallet</button>
        )}
      </header>
      
      <main>
        <ul className="candidate-list">
          {candidates.map(candidate => (
            <li key={candidate.id} className="candidate-item">
              <div>
                <span className="candidate-name">{candidate.name}</span>
                <span className="vote-count"> - Votes: {candidate.voteCount}</span>
              </div>
              <button className="vote-button" onClick={() => vote(candidate.id)} disabled={!account}>
                Vote
              </button>
            </li>
          ))}
        </ul>
        <p className="status">Status: {status}</p>
      </main>
    </div>
  );
}

export default App;