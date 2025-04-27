import React, { useState, useEffect } from "react";
import jsPDF from 'jspdf'; // keep this since you already have it
import "jspdf-autotable";
import axios from 'axios';

const WorkingReport = () => {
  const [stations, setStations] = useState([]);
  const [stationId, setStationId] = useState("");
  const [period, setPeriod] = useState("daily");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // format YYYY-MM-DD
  });
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // New state to handle errors

  const teal = "#009688"; // Manual Teal color HEX

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true); // Show spinner
      try {
        const response = await axios.get('/api/stations/list');
        if (response.data && response.data.station_ids) {
          // Modify station data structure if it's just an array of station names
          const formattedStations = response.data.station_ids.map(station => ({
            id: station,        // Here we treat station names as ids
            name: station,      // Using station name as the label as well
          }));
          setStations(formattedStations);
          setStationId(formattedStations[0]?.id || ""); // Set default station ID if available
        }
      } catch (error) {
        setError('Failed to fetch station IDs.');
        console.error('Error fetching station IDs:', error);
      } finally {
        setLoading(false); // Hide spinner
      }
    };
    fetchStations();
  }, []);

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds} second${seconds === 1 ? '' : 's'}`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(2)} minute${(seconds / 60) === 1 ? '' : 's'}`;
    return `${(seconds / 3600).toFixed(2)} hour${(seconds / 3600) === 1 ? '' : 's'}`;
  };

  const fetchWorkingReport = async () => {
    if (!stationId) {
      setError("Please select a station.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error message before fetching the report

    try {
      const response = await fetch(
        `http://localhost:5000/api/working-report/${stationId}/${period}?date=${date}`
      );
      const data = await response.json();
      console.log(data); // Log the response data to verify structure
      if (response.ok) {
        setReport(data);
      } else {
        setError(data.error || "Failed to fetch working report");
      }
    } catch (error) {
      console.error("Error fetching working report:", error);
      setError("Error fetching working report");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Working Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Station ID: ${report.station_id}`, 20, 40);
    doc.text(`Period: ${report.period}`, 20, 50);
    doc.text(`Total Duration: ${formatDuration(report.total_duration)}`, 20, 60);
    doc.text(`Most Non-Working Activity: ${report.most_non_working_activity}`, 20, 70);
    doc.text(`Non-Working Duration: ${formatDuration(report.non_working_duration_hours)}`, 20, 80);
    doc.save("working_report.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: teal, textAlign: "center", marginBottom: "30px" }}>Station Working Report</h2>

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
          <strong>{"Reports not available"}</strong>
        </div>
      )}

      <div style={{ color: "teal", display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
        {/* Station Selector */}
        <div style={{ flex: "1" }}>
          <label>Station:</label><br />
          <select
  value={stationId}
  onChange={(e) => setStationId(e.target.value)}
  style={{ width: "100%", padding: "8px" }}
>
  {/* Display a "Select a station" option if stations are not fetched */}
  <option value="" disabled>{stations.length === 0 ? "Select a station" : "Please select a station"}</option>
  {stations.map((station) => (
    <option key={station.id} value={station.id}>
      {station.name}
    </option>
  ))}
</select>

        </div>

        {/* Period Selector */}
        <div style={{ flex: "1" }}>
          <label>Period:</label><br />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Date Input */}
        <div style={{ flex: "1" }}>
          <label>Select Date:</label><br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
      </div>

      {/* Fetch Report Button */}
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={fetchWorkingReport}
          disabled={loading || !stationId}
          style={{
            backgroundColor: teal,
            color: "white",
            width: "100%",
            padding: "12px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Fetch Report"}
        </button>
      </div>

      {/* Report Display */}
      {report && (
        <div style={{
          border: `2px solid ${teal}`,
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          <h3 style={{ color: teal, textAlign: "center" }}>Report Summary</h3>
          <p><strong>Station ID:</strong> {report.station_id}</p>
          <p><strong>Period:</strong> {report.period}</p>
          <p><strong>Total Duration:</strong> {formatDuration(report.total_duration)}</p>

          <button
            onClick={downloadPDF}
            style={{
              backgroundColor: teal,
              color: "white",
              width: "100%",
              padding: "10px",
              border: "none",
              marginTop: "20px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Download Report as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkingReport;
