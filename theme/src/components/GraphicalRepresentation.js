import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Paper } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import './GraphicalRepresentation.css';
import io from 'socket.io-client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Data for station videos
const stations = [
  { id: 1, name: 'Station 1', videoUrl: 'station1-video-url.mp4' },
  { id: 2, name: 'Station 2', videoUrl: 'station2-video-url.mp4' },
  { id: 3, name: 'Station 3', videoUrl: 'station3-video-url.mp4' },
  { id: 4, name: 'Station 4', videoUrl: 'station4-video-url.mp4' },
];

const GraphicalRepresentation = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  // // Real-time updates from the server
  // useEffect(() => {
  //   const socket = io('http://localhost:5000');
    
  //   // Listen for the 'video-processed' event
  //   socket.on('video-processed', (newData) => {
  //     setData(newData);
  //   });

  //   // Cleanup the socket connection when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []); // Empty dependency array to run this effect only once

  const handleProcessVideo = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/process_videos');
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing video');
    } finally {
      setLoading(false);
    }
  };

  const isValidData = data && data[0];

  // Generate Bar Graph Data
  const workingLabels = isValidData ? Object.keys(data[0].working_report) : [];
  const workingData = {
    labels: workingLabels,
    datasets: [
      {
        label: 'Working vs Not Working',
        data: workingLabels.map(label => data[0].working_report[label].working),
        backgroundColor: 'rgba(0, 123, 255, 0.7)',
      },
    ],
  };

  // Generate Pie Chart Data
  const { total_stations, occupied_stations, unoccupied_stations } = isValidData
    ? data[0].station_summary
    : { total_stations: 0, occupied_stations: [], unoccupied_stations: [] };
  const occupancyData = {
    labels: ['Occupied Stations', 'Unoccupied Stations'],
    datasets: [
      {
        data: [occupied_stations.length, unoccupied_stations.length],
        backgroundColor: ['rgba(255, 193, 7, 0.7)', 'rgba(40, 167, 69, 0.7)'],
      },
    ],
  };

  return (
    <div className="graphical-representation">
      <Typography variant="h4" align="center" style={{ color: '#004D40', marginBottom: '20px' }}>
        Graphical Representation
      </Typography>
      <button className="process-button" onClick={handleProcessVideo} disabled={loading}>
        {loading ? 'Processing...' : 'Start Video Analysis'}
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : isValidData ? (
        <div className="reports-container">
          <div className="chart-container">
            <h2>Working Report</h2>
            <Bar data={workingData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
          <div className="chart-container">
            <h2>Occupancy Report</h2>
            <Pie data={occupancyData} />
          </div>
          <div className="activity-report">
            <h2>Station Activity Report</h2>
            {Object.entries(data[0].station_activity_report).map(([station, activities]) => (
              <div key={station} className="activity-card">
                <h3>{station}</h3>
                <ul>
                  {Object.entries(activities).map(([activity, count]) => (
                    <li key={activity}>{activity}: {count}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Click the button to start analysis.</p>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2} direction="column">
            {stations.map((station, index) => (
              <Grid item key={station.id} className="narrow-card-container">
                <Card elevation={3} className="station-card" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardContent>
                    <Typography variant="h6" align="center" style={{ color: '#004D40' }}>
                      {station.name}
                    </Typography>
                  </CardContent>
                  <CardMedia>
                    <video
                      src={station.videoUrl}
                      controls
                      style={{ width: '100%', height: '120px', borderRadius: '4px' }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </CardMedia>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default GraphicalRepresentation;
