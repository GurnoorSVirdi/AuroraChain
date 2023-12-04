import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PrescriptionContractABI from './PrescriptionContractABI.js';
import styles from '../styles/PharmacistPage.module.css';

function PharmacistPage() {
    const [prescriptions, setPrescriptions] = useState([]);

    // Web3 and contract setup
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const prescriptionContractAddress = '0x3Efab316D2e12611213dc7FC14d9C45525037cdC';
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
        <div className={styles.pharmacistContainer}>
            <h2 className={styles.pharmacistHeader}>Pharmacist Page</h2>
            <ul className={styles.prescriptionList}>
                {prescriptions.map((detail, index) => (
                    <li key={index} className={styles.prescriptionItem}>
                        <div className={styles.prescriptionDetailContainer}> {/* New container for prescription details */}
                            <p className={styles.prescriptionDetails}>
                                <strong>Patient Address: </strong> {detail.prescription.patientAddress}<br />
                                <strong>Medication Type: </strong> {detail.prescription.medicationType}<br />
                                <strong>Quantity: </strong> {detail.prescription.quantity.toString()}<br />
                                <strong>Expiration Date: </strong> {new Date(Number(detail.prescription.expirationDate) * 1000).toLocaleDateString()}<br />
                                <strong>Used: </strong> {detail.prescription.used ? "Yes" : "No"}
                            </p>
                        </div>
                        <button
                            className={styles.markUsedButton}
                            onClick={() => markAsUsed(detail.prescription.patientAddress, detail.globalIndex)}
                        >
                            Mark as Used
                        </button>
                        {index < prescriptions.length - 1 && <hr className={styles.separatorLine} />} {/* Line separator */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PharmacistPage;
