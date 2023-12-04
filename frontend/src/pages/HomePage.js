import Web3 from 'web3';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/HomePage.css';
import DoctorVerificationABI from './DoctorVerificationABI';

const HomePage = () => {
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Initialize web3
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    // Instantiate the contract
    const contractABI = DoctorVerificationABI;
    const doctorVerificationContractAddress = "0x333A387FaF70384B63Cc39BbaAFbc0E17936D63A";
    const doctorVerificationContract = new web3.eth.Contract(contractABI, doctorVerificationContractAddress);

    const connectWallet = async (route) => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts[0]) {
                    navigate("/"+route);
                }
            } catch (error) {
                console.error("Failed to connect wallet", error);
            }
        } else {
            alert('Please install MetaMask to use this feature!');
        }
    };

    // Function to request access to the user's wallet and get the account
    const getWalletAddress = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts[0];
        }
        else {
            alert("Please install MetaMask to use this feature!")
        }
    };

    // Function to check if the connected wallet address is a doctor
    async function checkIfDoctor(walletAddress) {
        try {
            const isDoctor = await doctorVerificationContract.methods.verifyDoctor(walletAddress).call();
            if (isDoctor) {
                navigate('/doctor'); // Navigate to DoctorPage if the user is a verified doctor
            } else {
                setErrorMessage('You are not recognized as a doctor. Please contact us to be added to the list.'); // Set error message
            }
        } catch (error) {
            console.error("An error occurred while verifying the doctor:", error);
            setErrorMessage('There was an error verifying your doctor status.'); // Set error message for other errors
        }
    }

    async function verifyDoctor() {
        const account = await getWalletAddress();
        await checkIfDoctor(account);
    }
    
    return (
        <div className="home">
             <nav className="navbar">
                <span className="title">AuroraChain</span>
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
                    <button className='role-btn' onClick={verifyDoctor}>Doctor</button>
                    <button className="role-btn" onClick={() => connectWallet("patient")}>Patient</button>
                    <button className="role-btn" onClick={() => connectWallet("pharmacist")}>Pharmacist</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default HomePage;