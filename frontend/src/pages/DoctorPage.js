import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PrescriptionContractABI from './PrescriptionContractABI'; // Assuming you have the ABI
import styles from '../styles/DoctorPage.module.css';

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
  const prescriptionContractAddress = '0x3Efab316D2e12611213dc7FC14d9C45525037cdC'; // Replace with your contract address
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
      ).send({ from: doctorAddress, gas: web3.utils.toHex(303874 * 2)});

      console.log('Prescription successfully created');
      setPrescriptionAdded(prescriptionAdded+1);

    } catch (error) {
      console.error('Error creating prescription:', error);
    }
  };

  const reversePrescriptions = doctorPrescriptions.slice().reverse()
  return (
    <div className={styles.fullPage}>
        <div className={styles.doctorPage}>
            <h2>Welcome! Create a Prescription for your Patients: </h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input 
                type="text" 
                placeholder="Patient Address" 
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                className={styles.input}
              />
              <input 
                type="text" 
                placeholder="Medication Type" 
                value={medicationType}
                onChange={(e) => setMedicationType(e.target.value)}
                className={styles.input}
              />
              <input 
                type="number" 
                placeholder="Quantity" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={styles.input}
              />
              <input 
                type="date" 
                placeholder="Expiration Date" 
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.prescriptionButton}>Create Prescription</button>
            </form>
            <div>
                <h3 className={styles.prescriptionTitleHeader}>Issued Prescriptions</h3>
                <ul className={styles.prescriptionsList}>
                    {reversePrescriptions.map((prescription, index) => {
                        const expirationDateFormatted = new Date(parseInt(prescription.expirationDate) * 1000).toLocaleDateString();
                        return (
                            <li key={index}>
                                <span className={styles.fieldName}>Patient Address:</span>
                                <span className={styles.fieldValue}>{prescription.patientAddress}</span><br/>
                                <span className={styles.fieldName}>Medication Type:</span>
                                <span className={styles.fieldValue}>{prescription.medicationType}</span><br/>
                                <span className={styles.fieldName}>Quantity:</span>
                                <span className={styles.fieldValue}>{Number(prescription.quantity)}</span><br/>
                                <span className={styles.fieldName}>Expiration Date:</span>
                                <span className={styles.fieldValue}>{expirationDateFormatted}</span><br/>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    </div>
  );
}

export default DoctorPage;
