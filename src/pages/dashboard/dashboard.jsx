import React from 'react'

//import {Link} from 'react-router-dom'
import "./dashboard.css";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import faker from "faker";
import DashboardCardSmall from "../../components/card/DashboardCardSmall";


function Dashboard() {

  //Chart data
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <>
      <h3 className="mt-2">Dashboard</h3>
      <hr />
      {/* <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
        </ol> */}
      <div className="row hilight-data">
        <DashboardCardSmall
          cardClass="bg-primary"
          text="Today's Indent"
          count="2"
        />
        <DashboardCardSmall
          cardClass="bg-warning"
          text="Drugs Qty. Your Store"
          count="2"
        />
        <DashboardCardSmall
          cardClass="bg-success"
          text="Today's Transfer Request"
          count="2"
        />
        <DashboardCardSmall
          cardClass="bg-danger"
          text="Drugs Issued Today"
          count="2"
        />
        <DashboardCardSmall
          cardClass="bg-info"
          text="Drugs Returned Today"
          count="2"
        />
        <DashboardCardSmall
          cardClass="bg-success"
          text="PO Approval"
          count="2"
        />
        <DashboardCardSmall
          cardClass="bg-dark"
          text="Indent Approval"
          count="2"
        />
        <DashboardCardSmall
          cardClass="bg-info"
          text="Transfer Approval"
          count="2"
        />
        <DashboardCardSmall cardClass="bg-dark" text="PO Approval" count="2" />
        <DashboardCardSmall
          cardClass="bg-primary"
          text="Issue Against Indent"
          count="2"
        />
        <DashboardCardSmall
          cardClass="bg-success"
          text="Acceptance Of Challan"
          count="2"
        />
        <DashboardCardSmall cardClass="bg-danger" text="PO Payment" count="2" />
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card mb-4">
            <div style={{ height: "200px", width: "100%" }}>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              Area Chart Example
            </div>
            <div className="card-body">
              <canvas id="myAreaChart" width="100%" height="40"></canvas>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-bar me-1"></i>
              Bar Chart Example
            </div>
            <div className="card-body">
              <canvas id="myBarChart" width="100%" height="40"></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
