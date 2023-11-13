# AuroraChain
BlockchainBasedPrescriptionApplication


Blockchain Based Prescription Application: AuroraChain

Notes: 
Things to complete: 
Create a wallet connection and build out UI to have different portals/pages for pharmcists, Patient, Doctors
This login system will verify for pharmcis and doctors through a doctor ID and Pharacy ID, the more pHaramcies we sign on there will be more locations. 


Application Structure: 
1.	components: blockchain network , smart contract development, UI, and integration of Filecoin for data storage.

1. Blockchain Network 
- Choice of Blockchain: Ethereum due to its support for smart contracts.

The verification process: 

The process of picking up a prescription in the AuroraChain application, which leverages smart contracts and blockchain technology, can be outlined in several steps, ensuring secure and efficient handling from prescription issuance to pick up. Here's a proposed workflow:

1. Prescription Issuance
- Doctor's Action: A doctor writes a prescription in the application. This action creates a smart contract transaction. The prescription details are encrypted and sent to the patient's digital wallet. The doctor's log is updated with this transaction.
- **Smart Contract Function**: The smart contract records essential details (patient ID, doctor ID, prescription details) in an immutable ledger. It also updates the patient's prescription log.

2. Prescription Notification
- Patient Notification: The patient receives a notification in their AuroraChain app about the new prescription. This notification includes details like the medication, dosage, and issuing doctor, but the full prescription data remains encrypted and secure in their digital wallet.

3. Pharmacy Selection
- Patient Action: The patient selects a pharmacy for prescription fulfillment through the app. This could be based on location, availability of medication, or preference.
- Pharmacy Notification: The selected pharmacy receives a notification of the prescription request, including an encrypted token or QR code unique to that prescription. They will start making the prescription. 


4. Prescription Pickup
- Patient Pickup: The patient picks up the medication. The pharmacist confirms the pickup in the application, which triggers the smart contract to update the status to 'completed'.
- Confirmation Receipt: The patient receives a digital receipt of the transaction, and their prescription log is updated accordingly.

6. Smart Contract Features
- Immutable Record: All actions and confirmations are recorded in the blockchain, ensuring an immutable and transparent history.
- Automated Verification: The smart contract will automatically verify the authenticity of the prescription and the identity of the involved parties (patient, doctor, pharmacy).
- Data Privacy: Sensitive data remains encrypted, and only relevant information is shared with each party (e.g., pharmacies don't see the entire medical history, just the specific prescription details).

7. Security and Compliance
- HIPAA/GDPR Compliance: We must Ensure that the entire process complies with health privacy regulations.
	- must look into this further
- Data Encryption: figure out how to encrypt data 

8. Exception Handling
- Discrepancies and Errors: Implement a system to handle discrepancies or errors, such as a prescription not available at the chosen pharmacy or a mismatch in verification.
- Support and Resolution: Provide a support system within the app for resolution of issues or disputes.

This workflow ensures a seamless, secure, and efficient process from the moment a prescription is issued to its pickup at the pharmacy, all facilitated by smart contract technology within the AuroraChain application. The use of blockchain not only enhances the security and transparency of the process but also ensures compliance with healthcare regulations and patient privacy.


![Uploading image.png…]()

