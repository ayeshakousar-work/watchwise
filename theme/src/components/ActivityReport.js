// src/components/ActivityReport.js
import React from 'react';
import { Typography, Grid, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import './ActivityReport.css';

const reports = [
  {
    icon: <DownloadIcon fontSize="large" />,
    label: "Daily Report",
    description: "View daily employee activity, including login times, tasks, and breaks.",
    path: "sample-daily-report.pdf", // Placeholder link
  },
  {
    icon: <DownloadIcon fontSize="large" />,
    label: "Weekly Report",
    description: "Summary of weekly performance, highlighting productivity and attendance.",
    path: "sample-weekly-report.pdf", // Placeholder link
  },
  {
    icon: <DownloadIcon fontSize="large" />,
    label: "Monthly Report",
    description: "Detailed monthly analysis of employee hours, achievements, and areas for growth.",
    path: "sample-monthly-report.pdf", // Placeholder link
  },
];

const ActivityReport = () => {
  return (
    <div className="activity-report">
      <Typography variant="h4" align="center" className="report-title">
        Employee Activity Reports
      </Typography>
      <Grid container spacing={4} justifyContent="center" className="button-grid">
        {reports.map((report, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Button className="function-button" href={report.path} download>
              {report.icon}
              <span>{report.label}</span>
              <p>{report.description}</p>
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ActivityReport;
