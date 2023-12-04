import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PrescriptionContractABI from './PrescriptionContractABI'; // Import the ABI

function PatientPage() {
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);

  // Web3 and contract setup
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const prescriptionContractAddress = '0x9B1B0e07175260f9889d5a53f7BaFE90138887B4'; // Replace with your contract address
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
    <div>
      <h2>Patient Page</h2>
      <div>
        <h3>Your Prescriptions</h3>
        <ul>
        {patientPrescriptions.map((prescription, index) => {
          const expirationDate = new Date(parseInt(prescription.expirationDate) * 1000).toLocaleDateString();
          return (
            <li key={index}>
              Prescription index: {index},
              Doctor Address: {prescription.doctorAddress},
              Medication Type: {prescription.medicationType},
              Quantity: {Number(prescription.quantity)},
              Expiration Date: {expirationDate},
              Allowed Address: {prescription.allowedAddress === "0x0000000000000000000000000000000000000000" ? "None" : prescription.allowedAddress},
              Used: {prescription.used ? "true" : "false"}
            </li>
          );
        })}
      </ul>
      </div>
      <h3>Give Pharmacist permission</h3>
      <div>
        <input type="text" placeholder="Allowed Address" value={allowedAddress} onChange={(e) => setAllowedAddress(e.target.value)} />
        <input type="number" placeholder="Prescription Index" value={selectedPrescriptionIndex} onChange={(e) => setSelectedPrescriptionIndex(e.target.value)} />
        <button onClick={handleAllowAddress}>Allow Address</button>
      </div>
    </div>
  );
}

export default PatientPage;
