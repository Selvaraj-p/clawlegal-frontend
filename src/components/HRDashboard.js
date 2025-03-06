import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HRDashboard() {
  const [resignations, setResignations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch pending resignation requests
    axios.get('/resignation/review')
      .then(response => {
        setResignations(response.data);
      })
      .catch(error => {
        console.error('Error fetching resignation requests:', error);
      });
  }, []);

  const handleReview = async (id, status, exitDate = null) => {
    try {
      const response = await axios.post(`/resignation/review/${id}`, { status, exitDate });
      setMessage(`Resignation request ${status.toLowerCase()} successfully.`);
      // Update resignation list
      setResignations(resignations.filter(resignation => resignation._id !== id));
    } catch (error) {
      setMessage('Error updating resignation request.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>HR Dashboard</h2>
      {message && <p>{message}</p>}
      <h3>Pending Resignation Requests</h3>
      <ul>
        {resignations.map(resignation => (
          <li key={resignation._id}>
            <p>Employee: {resignation.employee.username}</p>
            <p>Intended Last Working Day: {new Date(resignation.intendedLastWorkingDay).toLocaleDateString()}</p>
            <p>Reason: {resignation.reason}</p>
            <button onClick={() => handleReview(resignation._id, 'Approved', new Date())}>Approve</button>
            <button onClick={() => handleReview(resignation._id, 'Rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HRDashboard;
