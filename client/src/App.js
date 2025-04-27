// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ActivityReport from './components/ActivityReport';
import RealTimeVideo from './components/RealTimeVideo';
import GraphicalRepresentation from './components/GraphicalRepresentation';
import OccupancyData from './components/OccupancyData';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import SignInPage from './components/Login.jsx';
import LandingPage from './components/lnding_pge'; // Adjusted the correct import
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkingReport from './components/working_report.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Sign-in page without sidebar */}
        <Route path="/signin" element={<SignInPage />} />

        {/* All routes below will have the sidebar */}
        <Route path="/" element={<Layout />}>
          <Route path="graphical-representation" element={<GraphicalRepresentation />} />
          <Route path="activity-report" element={<ActivityReport />} />
          <Route path='Working-Report' element={<WorkingReport/>}/>
          <Route path="real-time-video" element={<RealTimeVideo />} />
          <Route path="occupancy-data" element={<OccupancyData />} />
          <Route path="feedback-form" element={<FeedbackForm />} />
          <Route path="feedback-list" element={<FeedbackList />} />


          {/* Redirect undefined routes to /graphical-representation */}
          <Route path="*" element={<Navigate to="/graphical-representation" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
