// src/components/AdditionalReports.js
import React from 'react';
import { Typography, Paper, Card, CardContent, Grid } from '@mui/material';
import './AdditionalReport.css';

const AdditionalReports = () => {
  return (
    <Paper elevation={4} style={{ padding: '30px', marginTop: '20px', animation: 'fadeIn 1.5s ease-out' }}>
      <Typography variant="h4" align="center" style={{ color: '#004D40' }}>Additional Reports</Typography>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Report 1</Typography>
              <Typography variant="body2">Details about Report 1</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AdditionalReports;
