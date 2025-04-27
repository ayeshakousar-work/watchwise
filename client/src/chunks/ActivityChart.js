import React from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

const ActivityChart = ({ predictions }) => {
  const labels = predictions.map((_, i) => `#${i + 1}`);
  const activities = predictions.map(p => p.activity || 'no activity');

  const activityTypes = [...new Set(activities)];
  const tealShades = [
    '#a0e7db', '#70d9cc', '#47bfae', '#2da69c', '#178b80', '#0f6f66'
  ];

  const datasets = activityTypes.map((type, i) => ({
    label: type,
    data: activities.map(a => a === type ? 1 : 0),
    borderColor: tealShades[i % tealShades.length],
    backgroundColor: tealShades[i % tealShades.length] + '33',
    fill: false,
    tension: 0.3,
    pointRadius: 3,
    pointHoverRadius: 6
  }));

  const data = { labels, datasets };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#176f68',
          font: { size: 13, weight: 'bold' }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          color: '#0f6f66'
        },
        grid: {
          color: '#d9f2f0'
        }
      },
      x: {
        ticks: {
          color: '#0f6f66'
        },
        grid: {
          color: '#f0fbfa'
        }
      }
    }
  };

  return (
    <div className="card p-4 shadow-sm border-0" style={{ borderRadius: '1rem', background: 'linear-gradient(135deg,rgb(255, 255, 255) 0%, #f8f9fa 100%)' }}>
      <h5 className="mb-3 text-dark">Activity Frequency Timeline</h5>
      <Line data={data} options={options} />
    </div>
  );
};

export default ActivityChart;
