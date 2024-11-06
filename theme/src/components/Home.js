// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Button, Grid } from '@mui/material';
import ActivityIcon from '@mui/icons-material/BarChart';
import VideoIcon from '@mui/icons-material/Videocam';
import GraphIcon from '@mui/icons-material/ShowChart';
import OccupancyIcon from '@mui/icons-material/EventSeat';
import ReviewIcon from '@mui/icons-material/RateReview';
import CommunicationIcon from '@mui/icons-material/Chat';
import SalaryIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Sidebar } from './Sidebar';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Sidebar /> {/* Sidebar added for consistent layout */}
      <div style={{ marginLeft: '240px', padding: '20px' }}> {/* Adjust padding for main content */}
        <div className="home">
          <h2>Real-Time Employee Analysis Dashboard</h2>
          <p>Select a functionality below to proceed:</p>
          <Grid container spacing={4} justifyContent="center" className="button-grid">
            {[{
                icon: <ActivityIcon fontSize="large" />,
                label: "Activity Report",
                path: "/activity-report"
              },
              {
                icon: <VideoIcon fontSize="large" />,
                label: "Real-time Video",
                path: "/real-time-video"
              },
              {
                icon: <GraphIcon fontSize="large" />,
                label: "Graphical Representation",
                path: "/graphical-representation"
              },
              {
                icon: <OccupancyIcon fontSize="large" />,
                label: "Occupancy Data",
                path: "/occupancy-data"
              },
              {
                icon: <ReviewIcon fontSize="large" />,
                label: "Employee/Station Review",
                path: "/employee-review"
              },
              {
                icon: <CommunicationIcon fontSize="large" />,
                label: "Communication Hub",
                path: "/communication-hub"
              },
              {
                icon: <SalaryIcon fontSize="large" />,
                label: "Salaries + Bonuses",
                path: "/salaries-bonuses"
              },
              {
                icon: <AssignmentIcon fontSize="large" />,
                label: "Additional Reports",
                path: "/additional-reports"
              },
            ].map((item, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Button className="function-button" onClick={() => handleNavigation(item.path)}>
                  {item.icon}
                  <span style={{ marginLeft: '10px' }}>{item.label}</span>
                </Button>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Home;