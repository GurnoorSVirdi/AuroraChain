import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrescriptionWalletPage from './pages/PrescriptionWalletPage';
import HistoryPage from './pages/HistoryPage';
import RenewalsPage from './pages/RenewalsPage';
import './App.css'; // This will include GitHub-like styles

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wallet" element={<PrescriptionWalletPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/renewals" element={<RenewalsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
