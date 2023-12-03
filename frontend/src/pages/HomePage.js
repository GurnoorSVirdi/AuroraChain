import Web3 from 'web3';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/HomePage.css';
import DoctorVerificationABI from './contractsABI';

const HomePage = () => {
    const [isDoctor, setIsDoctor] = useState(null); // State to keep track of doctor verification
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Initialize web3
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    // Instantiate the contract
    const contractABI = DoctorVerificationABI;
    const doctorVerificationContractAddress = "0x96E8ae694dfCa02e6d7e27434CF0e732221C6C63";
    const doctorVerificationContract = new web3.eth.Contract(contractABI, doctorVerificationContractAddress);

    // Function to request access to the user's wallet and get the account
    const getWalletAddress = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    };

    // Function to check if the connected wallet address is a doctor
    async function checkIfDoctor(walletAddress) {
        try {
            const isDoctor = await doctorVerificationContract.methods.verifyDoctor(walletAddress).call();
            setIsDoctor(isDoctor); // Set the verification result
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
                <button onClick={getWalletAddress} className="connect-wallet-btn">
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
                    <button className='role-btn' onClick={verifyDoctor}>Doctor</button>
                    <Link to="/patient" className="role-btn">Patient</Link>
                    <Link to="/pharmacist" className="role-btn">Pharmacist</Link>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default HomePage;