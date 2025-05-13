import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';

const WorkingDonut = ({ predictions = [] }) => {
  const working_activities = [
    "using laptop", "using computer",
    "using mobile", "using phone", "using tablet",
    "reading papers", "using papers"
  ];

  let working = 0, idle = 0;

  predictions.forEach(p => {
    const activity = p.activity?.toLowerCase();
    if (activity && working_activities.includes(activity)) {
      working++;
    } else {
      idle++;
    }
  });

  const total = working + idle;
  const percentageWorking = total ? ((working / total) * 100).toFixed(1) : 0;

  const data = {
    labels: ["occupied", "unoccupied"],
    datasets: [{
      data: [working, idle],
      backgroundColor: ["#00bfa5", "#e0e0e0"], // green, gray
      borderWidth: 0,
      cutout: '70%'
    }]
  };

  const options = {
    cutout: '70%',
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const percent = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${context.raw} (${percent}%)`;
          }
        }
      },
      datalabels: {
        display: true,
        formatter: () => `${percentageWorking}%`,
        color: '#176f68',
        font: {
          weight: 'bold',
          size: 20
        }
      }
    }
  };

  return (
    <div className="card p-4 shadow-sm border-0" style={{ borderRadius: '1rem', background: 'linear-gradient(135deg, #e0f7f4 0%, #f8f9fa 100%)' }}>
      <h5 className="mb-3 text-dark">Working Activity</h5>
      <div style={{ height: '80px' }}> {/* Updated from 65px to 200px */}
        <Doughnut
          data={data}
          options={{ ...options, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default WorkingDonut;
