import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EmployeeDashboard from './components/EmployeeDashboard';
import HRDashboard from './components/HRDashboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/hr-dashboard" element={<HRDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
