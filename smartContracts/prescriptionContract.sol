// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrescriptionContract {
    struct Prescription {
        address doctorAddress;
        address patientAddress;
        string medicationType;
        uint quantity;
        uint expirationDate;
        bool used;
        address allowedAddress;
    }

    struct PrescriptionIndex {
        address patientAddress;
        uint index;
    }

    struct PrescriptionDetail {
        Prescription prescription;
        uint globalIndex;
    }

    mapping(address => Prescription[]) private prescriptionsByPatient;
    mapping(address => Prescription[]) private prescriptionsByDoctor;
    mapping(address => PrescriptionIndex[]) private allowedPrescriptionIndexes;

    DoctorVerification doctorVerification;

    constructor(address _doctorVerificationAddress) {
        doctorVerification = DoctorVerification(_doctorVerificationAddress);
    }

    // Event emitted when a new prescription is created
    event PrescriptionCreated(address indexed doctorAddress, address indexed patientAddress, string medicationType, uint quantity, uint expirationDate);

    // Event emitted when a prescription is marked as used
    event PrescriptionUsed(address indexed patientAddress, uint prescriptionIndex);

    // Event emitted when an address is allowed to mark a prescription as used
    event AddressAllowedForPrescription(address indexed patientAddress, uint prescriptionIndex, address allowedAddress);

    // Function to issue a new prescription
    function createPrescription(address _patientAddress, string memory _medicationType, uint _quantity, uint _expirationDate) public {
        require(doctorVerification.verifyDoctor(msg.sender), "Caller is not a verified doctor");
        require(_expirationDate > block.timestamp, "Expiration date should be in the future");

        Prescription memory newPrescription = Prescription({
            doctorAddress: msg.sender,
            patientAddress: _patientAddress,
            medicationType: _medicationType,
            quantity: _quantity,
            expirationDate: _expirationDate,
            used: false,
            allowedAddress: address(0) // Initially, no address is allowed
        });

        prescriptionsByPatient[_patientAddress].push(newPrescription);
        prescriptionsByDoctor[msg.sender].push(newPrescription);
        emit PrescriptionCreated(msg.sender, _patientAddress, _medicationType, _quantity, _expirationDate);
    }

    // Modified function for patient to allow an address to mark a prescription as used
    function allowAddressToMarkPrescription(uint _prescriptionIndex, address _allowedAddress) public {
        Prescription storage prescription = prescriptionsByPatient[msg.sender][_prescriptionIndex];
        require(!prescription.used, "Prescription is already used");
        prescription.allowedAddress = _allowedAddress;
        allowedPrescriptionIndexes[_allowedAddress].push(PrescriptionIndex(msg.sender, _prescriptionIndex));
        emit AddressAllowedForPrescription(msg.sender, _prescriptionIndex, _allowedAddress);
    }

    // Function to mark a prescription as used
    function markPrescriptionAsUsed(address _patientAddress, uint _globalIndex) public {
        Prescription storage prescription = prescriptionsByPatient[_patientAddress][_globalIndex];
        require(msg.sender == prescription.allowedAddress, "Not authorized to mark this prescription");
        require(!prescription.used, "Prescription is already used");
        prescription.used = true;
        emit PrescriptionUsed(_patientAddress, _globalIndex);
    }

    // Function to get prescriptions of a patient
    function getPrescriptionsByPatient(address _patientAddress) public view returns (Prescription[] memory) {
        return prescriptionsByPatient[_patientAddress];
    }

    // Function to get prescriptions issued by a specific doctor
    function getPrescriptionsByDoctor(address _doctorAddress) public view returns (Prescription[] memory) {
        return prescriptionsByDoctor[_doctorAddress];
    }

    // Modified function to get prescriptions for a pharmacist with global index
    function getPrescriptionsForPharmacist(address _pharmacistAddress) public view returns (PrescriptionDetail[] memory) {
        PrescriptionIndex[] memory indexes = allowedPrescriptionIndexes[_pharmacistAddress];
        PrescriptionDetail[] memory pharmacistPrescriptions = new PrescriptionDetail[](indexes.length);

        for (uint i = 0; i < indexes.length; i++) {
            PrescriptionIndex memory indexInfo = indexes[i];
            Prescription storage prescription = prescriptionsByPatient[indexInfo.patientAddress][indexInfo.index];
            pharmacistPrescriptions[i] = PrescriptionDetail(prescription, indexInfo.index);
        }

        return pharmacistPrescriptions;
    }
}

// Interface for the DoctorVerification contract
interface DoctorVerification {
    function verifyDoctor(address _doctorAddress) external view returns (bool);
}