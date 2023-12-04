import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PrescriptionContractABI from './PrescriptionContractABI.js';

function PharmacistPage() {
    const [prescriptions, setPrescriptions] = useState([]);

    // Web3 and contract setup
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const prescriptionContractAddress = '0x7FF3E03736Aba3aa26b5f7019E9ea16fD479D1c0';
    const prescriptionContract = new web3.eth.Contract(PrescriptionContractABI, prescriptionContractAddress);

    useEffect(() => {
        loadPrescriptions();
    }, []);

    const loadPrescriptions = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const pharmacistAddress = accounts[0];
            const assignedPrescriptions = await prescriptionContract.methods.getPrescriptionsForPharmacist(pharmacistAddress).call();
            setPrescriptions(assignedPrescriptions);
        } catch (error) {
            console.error('Error loading prescriptions:', error);
        }
    };

    const markAsUsed = async (patientAddress, globalIndex) => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const pharmacistAddress = accounts[0];
            await prescriptionContract.methods.markPrescriptionAsUsed(patientAddress, globalIndex)
                .send({ from: pharmacistAddress, gas: web3.utils.toHex(3000000) });
            console.log('Prescription marked as used');
            loadPrescriptions(); // Reload prescriptions
        } catch (error) {
            console.error('Error marking prescription as used:', error);
        }
    };

    return (
        <div>
            <h2>Pharmacist Page</h2>
            <ul>
                {prescriptions.map((detail, index) => (
                    <li key={index}>
                        Patient Address: {detail.prescription.patientAddress},
                        Medication Type: {detail.prescription.medicationType},
                        Quantity: {detail.prescription.quantity.toString()}, {/* Convert BigInt to String */}
                        Expiration Date: {new Date(Number(detail.prescription.expirationDate) * 1000).toLocaleDateString()},
                        Used: {detail.prescription.used ? "true" : "false"}
                        <button onClick={() => markAsUsed(detail.prescription.patientAddress, detail.globalIndex)}>Mark as Used</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PharmacistPage;
