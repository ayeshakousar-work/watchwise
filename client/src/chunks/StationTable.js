import React from "react";

const StationTable = ({ predictions }) => {
  const grouped = predictions.reduce((acc, p) => {
    if (!acc[p.station_id]) acc[p.station_id] = [];
    acc[p.station_id].push(p);
    return acc;
  }, {});
  
  // If you want to show only up to 10 stations:
  const limitedGrouped = Object.entries(grouped).slice(0, 10);
  

  return (
    <div className="card p-3 ">
      <h5 className="mb-3 text-center">Station Activities</h5>
      <div className="d-flex justify-content-start gap-4 flex-wrap">
        {Object.entries(grouped).map(([stationId, activities], index) => (
          <div key={index} className="text-center">
            <div className="fw-bold mb-2">{stationId}</div>
            <div className="d-flex flex-column align-items-center gap-1">
            {activities.map((act, i) => (
                <div key={i} className="text-sm d-flex align-items-center">
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: act.occupied ? "#4CAF50" : "#008080", // green or teal blue
                      marginRight: "6px",
                    }}
                  ></span>
                  {act.occupied ? act.activity || "unknown" : "Vacant"}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StationTable;
