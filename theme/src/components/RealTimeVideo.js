// src/components/RealTimeVideo.js
import React from 'react';
import { Typography, Paper } from '@mui/material';

const RealTimeVideo = () => {
  return (
    <Paper elevation={4} style={{ padding: '30px', marginTop: '20px', animation: 'fadeIn 1.5s ease-out' }}>
      <Typography variant="h4" align="center" style={{ color: '#004D40' }}>Real-Time Video</Typography>
      <video controls style={{ width: '100%', borderRadius: '8px', marginTop: '20px' }}>
        <source src="your-video-url.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Paper>
  );
};

export default RealTimeVideo;
