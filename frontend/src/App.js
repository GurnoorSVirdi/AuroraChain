import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css'; // This will include GitHub-like styles
import DoctorPage from './pages/DoctorPage';
import PharmacistPage from './pages/PharmacistPage';
import PatientPage from './pages/PatientPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pharmacist" element={<PharmacistPage />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/patient" element={<PatientPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
