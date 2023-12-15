AuroraChain Demo ReadMe: 

Team: 

Harold Castiaux: hjc2154

Gurnoor Singh Virdi: gsv2110 


Descriptions: 
We have built a decentralized prescription based blockchain application for patients doctors and pharmacists around the world. 

Google Slides Link: 
https://docs.google.com/presentation/d/1T8uSByfKp4e9BhYJkauBVL-vVI5piZUe-o4sIgI2ZIw/edit?usp=sharing

Demo Video Link: 
https://drive.google.com/file/d/1nOerwdLjmHR9f9WPtoQ6lQD5gDkK9y1a/view?usp=drive_link 


Github Link: 
https://github.com/GurnoorSVirdi/AuroraChain



ReadMe: 

# AuroraChain
BlockchainBasedPrescriptionApplication


Blockchain Based Prescription Application: AuroraChain


Application Structure: 
1.	components: blockchain network, smart contract development, UI, and integration of Filecoin for data storage.

1. Blockchain Network 
- Choice of Blockchain: Ethereum due to its support for smart contracts.

The verification process: 

The process of picking up a prescription in the AuroraChain application, which leverages smart contracts and blockchain technology, can be outlined in several steps, ensuring secure and efficient handling from prescription issuance to pick up. Here's a proposed workflow:

1. Prescription Issuance
- Doctor's Action: A doctor writes a prescription in the application. This action creates a smart contract transaction. The prescription details are encrypted and sent to the patient's digital wallet. The doctor's log is updated with this transaction.
-Smart Contract Function: The smart contract records essential details (patient ID, doctor ID, prescription details) in an immutable ledger. It also updates the patient's prescription log.

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
- HIPAA/GDPR Compliance: We must Ensure that the entire process complies with health privacy regulations. This will be incorproated into Future versions 
- Data Encryption: figure out how to encrypt data 

8. Exception Handling
- Discrepancies and Errors: Implement a system to handle discrepancies or errors, such as a prescription not available at the chosen pharmacy or a mismatch in verification.
- Support and Resolution: Provide a support system within the app for resolution of issues or disputes.

This workflow ensures a seamless, secure, and efficient process from the moment a prescription is issued to its pickup at the pharmacy, all facilitated by smart contract technology within the AuroraChain application. The use of blockchain not only enhances the security and transparency of the process but also ensures compliance with healthcare regulations and patient privacy.





Current Improvements to work on: 
1. Doctor Onboarding Process and Global Application/Network

The onboarding process for doctors in  AuroraChain is crucial, especially considering the need for authentication and trust in medical scenarios. 
To make it a global application/network, We have thought of two solutions :

1: Decentralized Identity Verification
- Implementation: Utilize decentralized identity verification systems, such as uPort, Civic, or Sovrin. Doctors can create their digital identity on these platforms and undergo a verification process.
- Global outreach: These platforms are globally recognized and can verify identities across borders. Once verified on the platform, doctors can use their digital identity to register on your app.
- Blockchain Integration: The verified identity details (without personal information) can be stored on the blockchain as a hash, ensuring privacy while allowing verification of the doctor's credentials. We plan to store these on FileCoin 
- Benefits: This method provides a secure and private way of verifying doctors' identities and credentials while maintaining a global standard.

2: Partnership with Medical Institutions and Licensing Authorities
- Implementation: Collaborate with medical institutions and licensing authorities worldwide. They can verify the credentials of doctors and provide a digital certificate or token that can be used for onboarding.
- Smart Contracts: Use smart contracts to verify the authenticity of the digital certificates or tokens issued by these institutions.
- Global Network: Establish a network of partnered institutions globally to ensure a wide range of verified doctors can onboard from different regions.
- Benefits: This approach ensures that only certified and legitimate doctors are onboarded, maintaining high standards and trust in the platform.

2. Enhancing User Privacy and Security

Privacy and security of wallet IDs and personal details are paramount in a medical-related application. Here are two solutions to enhance these aspects:

1: Zero-Knowledge Proofs (ZKPs)
- Implementation: Implement Zero-Knowledge Proofs to verify transactions or actions without revealing the user's wallet ID. ZKPs allow one party to prove to another that they know a value (e.g., a wallet ID), 
without revealing any information apart from the fact that they know that value.
- Smart Contracts: Integrate Zero Knowledge Proof logic into smart contracts for actions like prescription validation or access requests.
- Benefits: Zero Knowledge Proofs enhance privacy by not disclosing user wallet IDs while still ensuring that transactions are legitimate. This is particularly useful in a global context where different privacy standards may apply.

2: Pseudonymous Idenitfication
- Implementation: Instead of using direct wallet IDs, create pseudonymous identifiers for each user. These identifiers can be linked to the wallet ID but are not  traceable to it.
- Mapping System: Implement a secure mapping system within the smart contract or a separate privacy-focused layer to manage the relationship between the pseudonymous identifiers and the actual wallet IDs.
- Access Control: Strictly control who can access the mapping system, potentially using hierarchical access permissions or multi-signature protocols.
- Benefits: This method allows users to interact within the platform without exposing their actual wallet IDs, enhancing privacy and security.



How to Run our Code: Make sure you are able to link MetaMask with Ganache ( https://docs.cranq.io/web-3/setting-up-ganache-with-metamask )

1. Deploy the Doctor smart contract on remix. 
2. Then add an account to the doctor list, using the addDoctor method. 
3. Now deploy the prescription contract using the address of the doctor contract in the constructor. 
4. In the frontend: inside DoctorPage, PatientPage and PharmacistPage, modify the prescriptionContractAddress with the one you just got. 
5. Inside the HomePage, modify the doctorVerificationContractAddress with the one you just got. 
6. Run npm start and use metamask to navigate around the accounts. 