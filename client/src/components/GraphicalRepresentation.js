import socket from "../socket";
import 'bootstrap/dist/css/bootstrap.min.css';
import Gauge from "../chunks/Gauge";
// import ActivityChart from "../chunks/ActivityChart";
import TopActivities from "../chunks/TopActivities";
import StationSummary from "../chunks/StationSummary";
import WorkingDonut from "../chunks/WorkingDonut";
import WorkingIdlePieChart from "../chunks/pie";
import StationTable from "../chunks/StationTable";
import ActivityChart from "../chunks/ActivityChart";

import "../App.css";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

function GraphicalRepresentation() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    socket.on("prediction", (data) => {
      setPredictions(prev => [data, ...prev.slice(0, 19)]);
    });
  }, []);

  return (
    <div className="dashboard-wrapper container-fluid py-3 px-4">
     <div className="row g-3 mb-3">
        <div className="col-lg-3 col-md-6 col-sm-12" style={{marginbottom: '20px',  width: '300px'}}>
       
          
          </div>
          </div>
      {/* Row 1: Summary Cards */}

      <div className="d-flex flex-wrap justify-content-start align-items-start mb-4">

{/* StationSummary */}
<div className="card-box compact p-2 me-4" style={{ height: '200px', width: '200px',marginLeft:"-25px",marginTop:"-29px" }}>
  <StationSummary predictions={predictions} />
</div>

{/* Gauge */}
<div className="card-box compact p-2 me-4" style={{ height: '100px', width: '500px',marginTop:"-29px" }}>
  <Gauge predictions={predictions} />
</div>

{/* WorkingDonut */}
<div className="card-box compact" style={{ height: '280px', width: '300px',marginLeft:"720px",marginTop:"-200px" }}>
  <WorkingIdlePieChart predictions={predictions} />
</div>

</div>


<div className="container" style={{width:"490px",marginTop:"-200px",height:"180px",marginLeft:"200px"}}>
  <div className="row justify-content-center" >
    {/* pick your size (col-md-6 = half width on md+) */}
    <div className="col-md-6 col-lg-4 mb-4" style={{  width:"650px",marginLeft:"-10px"}}>
      <WorkingDonut predictions={predictions} />
    </div>
  </div>
</div>






      {/* Row 3: Bar Charts */}
      <div className="row mb-4" style={{marginTop:"30px"}}>
  {/* Column 1: StationTable */}
  <div className="col-lg-4 col-md-12 mb-3">
    <div className="card-box compact p-2" style={{ minHeight: '350px',width:"350px",marginLeft:"-20px" }}>
      <StationTable predictions={predictions} />
    </div>
  </div>

  {/* Column 2: ActivityChart */}
  <div className="col-lg-4 col-md-12 mb-3">
    <div className="card-box compact p-2 h-100">
      <ActivityChart predictions={predictions} />
    </div>
  </div>

  {/* Column 3: TopActivities */}
  <div className="col-lg-4 col-md-12 mb-3">
    <div className="card-box compact p-2 h-100">
      <TopActivities predictions={predictions} />
    </div>
  </div>
</div>



    </div>
  );
}

export default GraphicalRepresentation;