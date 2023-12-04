import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PrescriptionContractABI from './PrescriptionContractABI'; // Import the ABI

function PatientPage() {
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);

  // Web3 and contract setup
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const prescriptionContractAddress = '0xE7E532262107F07C494dCA301ee60DE38C35C0da'; // Replace with your contract address
  const prescriptionContract = new web3.eth.Contract(PrescriptionContractABI, prescriptionContractAddress);

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
  }, []);

  return (
    <div>
      <h2>Patient Page</h2>
      <div>
        <h3>Your Prescriptions</h3>
        <ul>
        {patientPrescriptions.map((prescription, index) => {
          const expirationDate = new Date(parseInt(prescription.expirationDate) * 1000).toLocaleDateString();
          return (
            <li key={index}>
              Patient Address: {prescription.patientAddress},
              Medication Type: {prescription.medicationType},
              Quantity: {Number(prescription.quantity)},
              Expiration Date: {expirationDate}
            </li>
          );
        })}
      </ul>
      </div>
    </div>
  );
}

export default PatientPage;
