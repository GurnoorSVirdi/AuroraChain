import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PrescriptionContractABI from './PrescriptionContractABI'; // Assuming you have the ABI

function DoctorPage() {
  // State for form inputs
  const [patientAddress, setPatientAddress] = useState('');
  const [medicationType, setMedicationType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [doctorPrescriptions, setDoctorPrescriptions] = useState([]);
  const [prescriptionAdded, setPrescriptionAdded] = useState(0)

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

      const prescriptions = await prescriptionContract.methods.getPrescriptionsByDoctor(account).call();
      setDoctorPrescriptions(prescriptions);
    } catch (error) {
      console.error('Error loading account data:', error);
    }
  };

  // Effect hook to load account data and prescriptions
  useEffect(() => {
    loadAccountData();
  }, [prescriptionAdded]); // Empty dependency array ensures this effect runs once on mount

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get accounts from the wallet
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const doctorAddress = accounts[0];

    // Convert expiration date to UNIX timestamp
    const expirationTimestamp = Math.floor(new Date(expirationDate).getTime() / 1000);
    console.log(doctorAddress);

    // Interact with the smart contract to create a prescription
    try {
      await prescriptionContract.methods.createPrescription(
        patientAddress,
        medicationType,
        quantity,
        expirationTimestamp
      ).send({ from: doctorAddress, gas: web3.utils.toHex(151937 * 2)});

      console.log('Prescription successfully created');
      setPrescriptionAdded(prescriptionAdded+1);

    } catch (error) {
      console.error('Error creating prescription:', error);
    }
  };

  return (
    <div>
      <h2>DoctorPage</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Patient Address" 
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Medication Type" 
          value={medicationType}
          onChange={(e) => setMedicationType(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Quantity" 
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input 
          type="date" 
          placeholder="Expiration Date" 
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <button type="submit">Create Prescription</button>
      </form>
      <div>
      <h3>Issued Prescriptions</h3>
      <ul>
        {doctorPrescriptions.map((prescription, index) => {
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

export default DoctorPage;

