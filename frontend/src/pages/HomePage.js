import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [walletAddress, setWalletAddress] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) { // Check if MetaMask is installed
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Set the first account as the connected wallet
                setWalletAddress(accounts[0]);
                console.log(walletAddress);
            } catch (error) {
                console.error("Failed to connect wallet", error);
            }
        } else {
            alert('Please install MetaMask to use this feature!');
        }
    };

  return (
      <div className="home">
          <nav className="navbar">
              <span className="title">AuroraChain</span>
              <div className="navigation-buttons">
                  <Link to="/wallet" className="nav-btn">Prescription Wallet</Link>
                  <Link to="/history" className="nav-btn">History</Link>
                  <Link to="/renewals" className="nav-btn">Renewals</Link>
              </div>
              <button onClick={connectWallet} className="connect-wallet-btn">
                  Connect Wallet
              </button>
          </nav>
          <div className="navigation-buttons">
            <Link to="/wallet" className="nav-btn">Prescription Wallet</Link>
            <Link to="/history" className="nav-btn">History</Link>
            <Link to="/renewals" className="nav-btn">Renewals</Link>
          </div>
          <div className="blockchain-image-container">
              {/* Image will be added here through CSS */}
          </div>
      </div>
  );
};

export default HomePage;
