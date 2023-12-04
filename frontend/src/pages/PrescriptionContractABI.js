const PrescriptionContractABI =  [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_medicationType",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_expirationDate",
				"type": "uint256"
			}
		],
		"name": "createPrescription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_doctorVerificationAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "doctorAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "patientAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "medicationType",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "expirationDate",
				"type": "uint256"
			}
		],
		"name": "PrescriptionCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_doctorAddress",
				"type": "address"
			}
		],
		"name": "getPrescriptionsByDoctor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "doctorAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "patientAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "medicationType",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expirationDate",
						"type": "uint256"
					}
				],
				"internalType": "struct PrescriptionContract.Prescription[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			}
		],
		"name": "getPrescriptionsByPatient",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "doctorAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "patientAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "medicationType",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expirationDate",
						"type": "uint256"
					}
				],
				"internalType": "struct PrescriptionContract.Prescription[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export default PrescriptionContractABI;  