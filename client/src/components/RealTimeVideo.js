// src/components/RealTimeVideo.js
import React from 'react';
import { Typography, Paper } from '@mui/material';

const RealTimeVideo = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper
        elevation={4}
        style={{
          padding: '20px',
          maxWidth: '800px',            // Wider container for cinematic feel
          width: '90%',                 // Makes the container responsive
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" style={{ color: '#004D40', marginBottom: '20px', fontWeight: 600 }}>
          Real-Time Video
        </Typography>
        <video
          controls
          style={{
            width: '100%',
            maxHeight: '450px',          // Limit height to achieve a cinematic aspect ratio
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',  // Subtle shadow around video for depth
            objectFit: 'cover',          // Ensures video fills the width while maintaining aspect ratio
          }}
        >
          <source src="/videos/process.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Paper>
    </div>
  );
};

export default RealTimeVideo;
