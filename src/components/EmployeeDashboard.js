import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeDashboard() {
  const [resignationDetails, setResignationDetails] = useState({ lastWorkingDay: '', reason: '' });
  const [exitInterview, setExitInterview] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch exit interview questions if resignation is approved
    axios.get('/exitInterview/access')
      .then(response => {
        setExitInterview(response.data.questions);
      })
      .catch(error => {
        console.error('Error fetching exit interview questions:', error);
      });
  }, []);

  const handleSubmitResignation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/resignation/submit', resignationDetails);
      setMessage('Resignation request submitted successfully.');
    } catch (error) {
      setMessage('Error submitting resignation request.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <form onSubmit={handleSubmitResignation}>
        <div>
          <label>Intended Last Working Day:</label>
          <input 
            type="date" 
            value={resignationDetails.lastWorkingDay} 
            onChange={(e) => setResignationDetails({ ...resignationDetails, lastWorkingDay: e.target.value })} 
            required 
          />
        </div>
        <div>
          <label>Reason for Resignation:</label>
          <textarea 
            value={resignationDetails.reason} 
            onChange={(e) => setResignationDetails({ ...resignationDetails, reason: e.target.value })} 
            required 
          />
        </div>
        <button type="submit">Submit Resignation</button>
      </form>
      {message && <p>{message}</p>}
      
      {exitInterview && (
        <div>
          <h3>Exit Interview</h3>
          {exitInterview.map((question, index) => (
            <div key={index}>
              <p>{question}</p>
              <textarea />
            </div>
          ))}
          <button>Submit Exit Interview</button>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;
