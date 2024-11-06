import React, { useState } from 'react';
import axios from 'axios';
import './video_processing.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const activityNames = [
  'sitting', 'using_laptop', 'hugging', 'sleeping', 'drinking',
  'clapping', 'dancing', 'cycling', 'calling', 'laughing',
  'eating', 'fighting', 'listening_to_music', 'running', 'texting',
];

const Video = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError(null);
    setReport(null);
    setVideoUrl(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a video file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);

    setLoading(true);
    setError(null);

    try {
      const localtunnelUrl = 'http://1ec9-34-30-62-125.ngrok-free.app/upload'; // Replace with your URL
      const response = await axios.post(localtunnelUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setReport(response.data.report);
        setVideoUrl(response.data.processed_video_url);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setError('Error uploading video. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const VideoPlayer = () => (
    <div className="video-player-section fade-in">
      <h2>Processed Video</h2>
      {videoUrl ? (
        <video controls className="video-player" src={videoUrl}>
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="no-video-message">No video available. Please upload and process a video.</p>
      )}
    </div>
  );

  const ActivityReport = ({ report }) => {
    const stations = Object.keys(report);

    const datasets = activityNames.map((activityName) => ({
      label: activityName,
      data: stations.map((station) => report[station][activityName] || 0),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      borderWidth: 1,
    }));

    const data = {
      labels: stations,
      datasets,
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Activity Count per Station',
        },
      },
    };

    return (
      <div className="activity-report-section fade-in">
        <h2>Activity Report</h2>
        <Bar data={data} options={options} />
      </div>
    );
  };

  return (
    <div className="video-container">
      <h1 className="video-heading">Video Activity Detection</h1>

      <div className="upload-section">
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <button type="submit" disabled={loading || !selectedFile} className="upload-button">
            {loading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>

        {loading && <p className="loading-message">Loading, please wait...</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="content-section">
        {videoUrl && <VideoPlayer />}
        {report && <ActivityReport report={report} />}
      </div>
    </div>
  );
};

export default Video;
