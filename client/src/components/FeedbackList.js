import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './feedback.css'; // Import the CSS file

const FeedbackList = () => {
  const [stationIds, setStationIds] = useState([]); // List of station IDs
  const [stationId, setStationId] = useState(''); // Selected station ID
  const [feedbacks, setFeedbacks] = useState([]); // Feedback list
  const [error, setError] = useState(''); // Error message
  const [allFeedback, setAllFeedback] = useState(false); // Flag to fetch all feedback

  // Fetch station IDs on component mount
  useEffect(() => {
    const fetchStationIds = async () => {
      try {
        const response = await axios.get('/api/stations/list'); // API to fetch station IDs
        setStationIds(response.data.station_ids || []);
      } catch (error) {
        setError('Failed to fetch station IDs.');
        console.error('Error fetching station IDs:', error);
      }
    };
    fetchStationIds();
  }, []);

  // Fetch feedback for the selected station ID or all feedback
  const fetchFeedback = async () => {
    setError('');
    setFeedbacks([]);

    if (!allFeedback && !stationId) {
      setError('Please select a station ID.');
      return;
    }

    try {
      // Update the endpoint to use /api/feedback-report/<station_id>
      const endpoint = allFeedback 
        ? '/api/feedback-report/all' 
        : `/api/feedback-report/${stationId}`;
      const response = await axios.get(endpoint);
      setFeedbacks(response.data.feedbacks || []);
    } catch (error) {
      setError('Failed to fetch feedback.');
      console.error('Error fetching feedback:', error);
    }
  };

  return (
    <div className="container feedback-list">
      <h2>View Feedback</h2>

      {/* Error message */}
      {error && (
        <div style={{
          backgroundColor: "#fff9c4",  // Soft yellow background
          color: "#f57f17",            // Dark orange text
          padding: "10px 20px",        // Smaller padding for compactness
          borderRadius: "8px",         // Slightly rounded corners
          textAlign: "center",
          fontSize: "14px",             // Smaller text size for a less prominent message
          fontWeight: "normal",        // Make the font weight normal (less bold)
          maxWidth: "400px",           // Reduced width to make it more compact
          margin: "0 auto",            // Center the error box horizontally
          marginBottom: "20px",        // Add some space below the error box
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)", // Soft shadow to make it stand out
        }}>
          <strong>{"No Data available"}</strong>
        </div>
      )}

      {/* Station Selector and Feedback Options */}
      {!allFeedback && (
        <div>
          <label htmlFor="station-select">Select Station ID:</label>
          <select
            id="station-select"
            value={stationId}
            onChange={(e) => setStationId(e.target.value)}
          >
            <option value="">-- Select a Station --</option>
            {stationIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label>
          <input
            type="checkbox"
            checked={allFeedback}
            onChange={(e) => setAllFeedback(e.target.checked)}
          />
          Fetch All Feedback
        </label>
      </div>

      {/* Fetch Feedback Button */}
      <button onClick={fetchFeedback}>Get Feedback</button>

      {/* Display feedback */}
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((feedback, index) => (
            <li key={index}>
              <p>
                <strong>{feedback.admin_name}</strong> ({feedback.timestamp}):{' '}
                {feedback.review} - {feedback.rating}/5
              </p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No feedback found.</p>
      )}
    </div>
  );
};

export default FeedbackList;
