import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PrescriptionContractABI from './PrescriptionContractABI.js';

function PharmacistPage() {
    const [prescriptions, setPrescriptions] = useState([]);

    // Web3 and contract setup
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const prescriptionContractAddress = '0x9B1B0e07175260f9889d5a53f7BaFE90138887B4';
    const prescriptionContract = new web3.eth.Contract(PrescriptionContractABI, prescriptionContractAddress);

    useEffect(() => {
        loadPrescriptions();
    }, []);

    const loadPrescriptions = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length === 0) {
                console.error('No accessible accounts. Make sure Ethereum client is configured correctly.');
                return;
            }
            const pharmacistAddress = accounts[0];
            const assignedPrescriptions = await prescriptionContract.methods.getPrescriptionsForPharmacist(pharmacistAddress).call();
            setPrescriptions(assignedPrescriptions);
        } catch (error) {
            console.error('Error loading prescriptions:', error);
        }
    };

    const markAsUsed = async (patientAddress, prescriptionIndex) => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const pharmacistAddress = accounts[0];
            await prescriptionContract.methods.markPrescriptionAsUsed(patientAddress, prescriptionIndex)
                .send({ from: pharmacistAddress, gas: web3.utils.toHex(3000000) });
            console.log('Prescription marked as used');
            loadPrescriptions();
        } catch (error) {
            console.error('Error marking prescription as used:', error);
        }
    };

    return (
        <div>
            <h2>Pharmacist Page</h2>
            <ul>
                {prescriptions.map((prescription, index) => (
                    <li key={index}>
                        Patient Address: {prescription.patientAddress},
                        Medication Type: {prescription.medicationType},
                        Quantity: {prescription.quantity.toString()}, {/* Convert BigInt to String */}
                        Expiration Date: {new Date(Number(prescription.expirationDate) * 1000).toLocaleDateString()},
                        Used: {prescription.used ? "true" : "false"}
                        <button onClick={() => markAsUsed(prescription.patientAddress, index)}>Mark as Used</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PharmacistPage;
