import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PrescriptionContractABI from './PrescriptionContractABI'; // Import the ABI
import styles from '../styles/PatientPage.module.css';

function PatientPage() {
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);

  // Web3 and contract setup
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const prescriptionContractAddress = '0x3Efab316D2e12611213dc7FC14d9C45525037cdC'; // Replace with your contract address
  const prescriptionContract = new web3.eth.Contract(PrescriptionContractABI, prescriptionContractAddress);

  const [allowedAddress, setAllowedAddress] = useState('');
  const [selectedPrescriptionIndex, setSelectedPrescriptionIndex] = useState(0);
  const [allowedAddressUpdated, setAllowedAddressUpdated] = useState(0);

  const handleAllowAddress = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        console.error('No accessible accounts. Make sure Ethereum client is configured correctly.');
        return;
      }
      const patientAddress = accounts[0];

    try {
      await prescriptionContract.methods.allowAddressToMarkPrescription(selectedPrescriptionIndex, allowedAddress)
        .send({ from: patientAddress, gas: web3.utils.toHex(3000000)});
      console.log('Address allowed for prescription');
      setAllowedAddressUpdated(allowedAddressUpdated+1);
    } catch (error) {
      console.error('Error allowing address:', error);
    }
  };

  const loadAccountData = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        console.error('No accessible accounts. Make sure Ethereum client is configured correctly.');
        return;
      }
      const account = accounts[0];

      const prescriptions = await prescriptionContract.methods.getPrescriptionsByPatient(account).call();
      setPatientPrescriptions(prescriptions);
    } catch (error) {
      console.error('Error loading account data:', error);
    }
  };

  // Effect hook to load account data and prescriptions
  useEffect(() => {
    loadAccountData();
  }, [allowedAddressUpdated]);

  return (
    <div className={styles.patientContainer}>
        <h2 className={styles.patientHeader}>Patient Page</h2>
        <div>
            <h3 className={styles.prescriptionTitleHeader}>Your Prescriptions:</h3>
            <ul className={styles.prescriptionList}>
                {patientPrescriptions.map((prescription, index) => {
                    const expirationDate = new Date(parseInt(prescription.expirationDate) * 1000).toLocaleDateString();
                    return (
                        <li key={index} className={styles.prescriptionItem}>
                            <p className={styles.prescriptionDetails}>
                                <strong>Prescription index: </strong> {index}<br/>
                                <strong>Doctor Address: </strong> {prescription.doctorAddress}<br/>
                                <strong>Medication Type: </strong> {prescription.medicationType}<br/>
                                <strong>Quantity: </strong> {Number(prescription.quantity)}<br/>
                                <strong>Expiration Date: </strong> {expirationDate}<br/>
                                <strong>Allowed Address: </strong> {prescription.allowedAddress === "0x0000000000000000000000000000000000000000" ? "None" : prescription.allowedAddress}<br/>
                                Used: {prescription.used ? "Yes" : "No"}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
        <div>
            <input 
                type="text" 
                placeholder="Allowed Address" 
                value={allowedAddress} 
                onChange={(e) => setAllowedAddress(e.target.value)} 
                className={`${styles.inputField} ${styles.allowedAddressField}`} 
            />
            <input 
                type="number" 
                placeholder="Prescription Index" 
                value={selectedPrescriptionIndex} 
                onChange={(e) => setSelectedPrescriptionIndex(e.target.value)} 
                className={`${styles.inputField} ${styles.patientIndexField}`} 
            />
            <button onClick={handleAllowAddress} className={styles.permissionButton}>Allow Address</button>
        </div>
    </div>
);
}

export default PatientPage;
