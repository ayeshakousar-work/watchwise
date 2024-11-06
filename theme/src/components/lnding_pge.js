import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './lnding.css'; // Import a CSS file for styles and animations

const LandingPage = () => {
  const navigate = useNavigate();

  // Navigate to home page after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/SignInPage');
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <div className="landing-container">
      <div className="landing-video">
        <video 
          src="D:/Desktop/FYP_updted/theme/public/video lnding.mp4" // Replace with your video path
          autoPlay 
          loop 
          muted 
          className="animated-video" 
        />
      </div>
    </div>
  );
};

export default LandingPage;
