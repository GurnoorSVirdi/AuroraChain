import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
    const [walletAddress, setWalletAddress] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
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
                <button onClick={connectWallet} className="connect-wallet-btn">
                    Connect Wallet
                </button>
            </nav>
            <div className="hero">
                <h2>Welcome to AuroraChain</h2>
                <p>
                    A blockchain-based prescription management system where 
                    doctors can give prescriptions, patients can receive and 
                    use them, and pharmacists can approve and mark them as used.
                    Authentication and security are at the core of AuroraChain, 
                    ensuring that prescriptions are legitimate and used correctly.
                </p>
            </div>
            <div className="role-selection">
                <h1>I am a...</h1>
                <div className="role-buttons">
                    <Link to="/doctor" className="role-btn">Doctor</Link>
                    <Link to="/patient" className="role-btn">Patient</Link>
                    <Link to="/pharmacist" className="role-btn">Pharmacist</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
