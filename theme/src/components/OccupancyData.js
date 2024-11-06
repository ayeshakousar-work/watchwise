// src/components/OccupancyData.js
import React from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import './OccupancyData.css';

// Sample data for stations
const stations = [
  { id: 1, name: 'Station 1', isOccupied: true },
  { id: 2, name: 'Station 2', isOccupied: false },
  { id: 3, name: 'Station 3', isOccupied: true },
  { id: 4, name: 'Station 4', isOccupied: false },
  { id: 5, name: 'Station 5', isOccupied: true },
  { id: 6, name: 'Station 6', isOccupied: false },
  // Add more stations as needed
];

const OccupancyData = () => {
  return (
    <div className="occupancy-data">
      <Typography variant="h4" align="center" className="occupancy-title">
        Station Occupancy Status
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {stations.map((station) => (
          <Grid item xs={12} sm={6} md={4} key={station.id}>
            <Card className={`occupancy-card ${station.isOccupied ? 'occupied' : 'available'}`}>
              <CardContent>
                <Typography variant="h6" className="station-name">
                  {station.name}
                </Typography>
                <div className="status">
                  {station.isOccupied ? (
                    <CancelIcon className="status-icon occupied-icon" />
                  ) : (
                    <CheckCircleIcon className="status-icon available-icon" />
                  )}
                  <Typography variant="body2" className="status-text">
                    {station.isOccupied ? 'Occupied' : 'Available'}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OccupancyData;

  