// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Sidebar} from './components/Sidebar';
import Home from './components/Home';
import ActivityReport from './components/ActivityReport';
import RealTimeVideo from './components/RealTimeVideo';
import GraphicalRepresentation from './components/GraphicalRepresentation';
import OccupancyData from './components/OccupancyData';
import EmployeeReview from './components/EmployeeReview';
import CommunicationHub from './components/CommunicationHub';
import SalariesBonuses from './components/SalariesBonuses';
import AdditionalReports from './components/AdditionalReports';
import Video from './components/frontend/Video';
import LandingPage from './components/lnding_pge';
import SignInPage from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Sidebar /> {/* Sidebar added from the first file */}
      <div style={{ marginLeft: '240px', padding: '20px' }}> {/* Adjust padding for main content */}
        <Routes>
          <Route path="/" element={<home />} /> {/* Default to SignInPage */}
          <Route path="/home" element={<Home />} />
          <Route path="/activity-report" element={<ActivityReport />} />
          <Route path="/real-time-video" element={<RealTimeVideo />} />
          <Route path="/graphical-representation" element={<GraphicalRepresentation />} />
          <Route path="/occupancy-data" element={<OccupancyData />} />
          <Route path="/employee-review" element={<EmployeeReview />} />
          <Route path="/communication-hub" element={<CommunicationHub />} />
          <Route path="/salaries-bonuses" element={<SalariesBonuses />} />
          <Route path="/additional-reports" element={<AdditionalReports />} />
          <Route path="/video" element={<Video />} />
          <Route path="/landing-page" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;