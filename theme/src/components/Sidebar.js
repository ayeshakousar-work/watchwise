// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReportIcon from '@mui/icons-material/Report';
import './Sidebar.css'; // Make sure you import the CSS file

const Sidebar = () => {
  return (
    <Box sx={{ width: 240, bgcolor: '#004D40', color: '#FFFFFF', height: '100vh', paddingTop: 2, position: 'fixed', fontFamily: 'Poppins, sans-serif' }}>
      <List>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/"
            startIcon={<HomeIcon />}
            activeClassName="active"
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#003D33', // Darker shade for hover effect
              },
            }}
          >
            HOME
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/activity-report"
            startIcon={<BarChartIcon />}
            activeClassName="active"
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#003D33',
              },
            }}
          >
            ACTIVITY REPORT
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/real-time-video"
            startIcon={<VideoLibraryIcon />}
            activeClassName="active"
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#003D33',
              },
            }}
          >
            REAL-TIME VIDEO
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/graphical-representation"
            startIcon={<BarChartIcon />}
            activeClassName="active"
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#003D33',
              },
            }}
          >
            GRAPHICAL REPRESENTATION
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/occupancy-data"
            startIcon={<GroupIcon />}
            activeClassName="active"
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#003D33',
              },
            }}
          >
            OCCUPANCY DATA
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/employee-review"
            startIcon={<GroupIcon />}
            activeClassName="active"
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#003D33',
              },
            }}
          >
            EMPLOYEE REVIEW
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/communication-hub"
            startIcon={<GroupIcon />}
            activeClassName="active"
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#003D33',
              },
            }}
          >
            COMMUNICATION HUB
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/salaries-bonuses"
            startIcon={<AttachMoneyIcon />}
            activeClassName="active"
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#003D33',
              },
            }}
          >
            SALARIES & BONUSES
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/additional-reports"
            startIcon={<ReportIcon />}
            activeClassName="active"
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#003D33',
              },
            }}
          >
            ADDITIONAL REPORTS
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export { Sidebar };  // Named export
