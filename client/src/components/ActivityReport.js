import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ActivityReport = () => {
  const [reportData, setReportData] = useState([]);
  const [selectedReport, setSelectedReport] = useState("daily");
  const [selectedDate, setSelectedDate] = useState("");
  const [stationId, setStationId] = useState("");
  const [stations, setStations] = useState([]); // Stores available stations
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Error state to display the error message

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setSelectedDate(today);
    
    // Fetch list of stations when component loads
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/stations"); // Replace with your actual endpoint
      const data = await response.json();

      if (response.ok && data.success) {
        setStations(data.stations || []); // Assuming the response returns a list of stations
        setError(""); // Clear any previous errors
      } else {
        setError("Failed to fetch stations.");
      }
    } catch (error) {
      console.error("Error fetching stations:", error);
      setError("Error fetching stations. Please try again later.");
    }
  };

  const getPeriodString = () => {
    if (selectedReport === "daily") return selectedDate;
    if (selectedReport === "weekly") return `week-${selectedDate}`;
    if (selectedReport === "monthly") return `month-${selectedDate}`;
  };

  const fetchReportData = async () => {
    if (!stationId) {
      setError("Please select a Station.");
      return;
    }

    setLoading(true);
    const period = getPeriodString();
    const endpoint = `http://localhost:5000/api/activity_summary?station_id=${stationId}&period=${period}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (response.ok && data.success) {
        setReportData(data.data.activities || []);
        setError(""); // Clear any previous errors
      } else {
        setError("No data available for the selected period.");
        setReportData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    doc.setFontSize(18);
    doc.setTextColor("#004D40");
    doc.text("Activity Summary Report", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text(`Report Type: ${selectedReport.toUpperCase()}`, 14, 35);
    doc.text(`Date: ${selectedDate}`, 14, 42);
    doc.text(`Station ID: ${stationId}`, 14, 49);
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 14, 56);

    doc.setDrawColor(200, 200, 200);
    doc.line(10, 60, 200, 60);

    if (reportData.length > 0) {
      const tableData = reportData.map((activity) => [
        stationId,
        activity.activity_type,
        `${activity.total_duration}s`,
      ]);

      doc.autoTable({
        head: [["Station ID", "Activity Type", "Duration"]],
        body: tableData,
        startY: 65,
        theme: "striped",
        styles: { fontSize: 10, cellPadding: 3, halign: "left" },
        headStyles: { fillColor: "#004D40", textColor: "#FFFFFF", fontSize: 11 },
      });
    } else {
      doc.setFontSize(12);
      doc.setTextColor("#FF0000");
      doc.text("No data available for the selected report type.", 105, 70, { align: "center" });
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor("#888888");
      doc.text(`Page ${i} of ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: "center" });
    }

    doc.save(`Activity_Summary_${stationId}_${selectedReport}_${selectedDate}.pdf`);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Error Message Box at the Top */}
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

      <h2 style={{ color: "#009688", textAlign: "center", marginBottom: "30px" }}>
        Activity Summary Report
      </h2>

      {/* Station Selection Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Station:</label><br />
        <select
          value={stationId}
          onChange={(e) => setStationId(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "5px" }}
        >
          <option value="">Select a Station</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      {/* Report Type Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["daily", "weekly", "monthly"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedReport(type)}
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: selectedReport === type ? "#009688" : "white",
              color: selectedReport === type ? "white" : "#009688",
              border: `2px solid #009688`,
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Date Selector */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Date:</label><br />
        {selectedReport === "monthly" ? (
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const month = (i + 1).toString().padStart(2, "0");
              const year = new Date().getFullYear();
              return (
                <option key={month} value={`${year}-${month}`}>
                  {`${year}-${month}`}
                </option>
              );
            })}
          </select>
        ) : (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <button
          onClick={fetchReportData}
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#009688",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Fetch Report"}
        </button>

        <button
          onClick={downloadPDF}
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "white",
            color: "#009688",
            border: `2px solid #009688`,
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Download PDF
        </button>
      </div>

      {/* Report Display */}
      {reportData.length > 0 ? (
        <div style={{
          border: `2px solid #009688`,
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          <h3 style={{ color: "#009688", textAlign: "center" }}>Report Details</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {reportData.map((activity, idx) => (
              <li key={idx} style={{ marginBottom: "10px" }}>
                <strong>{activity.activity_type}</strong>: {activity.total_duration}s
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !loading && (
          <p style={{ textAlign: "center", color: "gray" }}>
            No data available.
          </p>
        )
      )}
    </div>
  );
};

export default ActivityReport;
