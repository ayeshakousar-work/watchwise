// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, Button } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import GroupIcon from '@mui/icons-material/Group';
import FeedbackIcon from '@mui/icons-material/Feedback'; // New icon for Feedback
import './Sidebar.css';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: '#004D40',
        color: '#FFFFFF',
        height: '100vh',
        paddingTop: 2,
        position: 'fixed',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <List>
        {/* Graphical Representation as the first item */}
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/graphical-representation"
            startIcon={<BarChartIcon />}
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#003D33' },
              '&.active': { bgcolor: '#00796B' }, // Active styling
            }}
          >
            GRAPHICAL REPRESENTATION
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/activity-report"
            startIcon={<BarChartIcon />}
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#003D33' },
              '&.active': { bgcolor: '#00796B' }, // Active styling
            }}
          >
            ACTIVITY REPORT
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/Working-Report"
            startIcon={<BarChartIcon />}
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#003D33' },
              '&.active': { bgcolor: '#00796B' }, // Active styling
            }}
          >
            WORKING REPORT
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/real-time-video"
            startIcon={<VideoLibraryIcon />}
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#003D33' },
              '&.active': { bgcolor: '#00796B' },
            }}
          >
            REAL-TIME VIDEO
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/occupancy-data"
            startIcon={<GroupIcon />}
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#003D33' },
              '&.active': { bgcolor: '#00796B' },
            }}
          >
            OCCUPANCY DATA
          </Button>
        </ListItem>

        {/* Feedback Section */}
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/feedback-form"
            startIcon={<FeedbackIcon />}
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#003D33' },
              '&.active': { bgcolor: '#00796B' },
            }}
          >
            SUBMIT FEEDBACK
          </Button>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            component={NavLink}
            to="/feedback-list"
            startIcon={<FeedbackIcon />}
            sx={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              '&:hover': { bgcolor: '#003D33' },
              '&.active': { bgcolor: '#00796B' },
            }}
          >
            VIEW FEEDBACK
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export { Sidebar };
