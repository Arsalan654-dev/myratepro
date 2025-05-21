"use client"

import { useState } from "react"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import "./Analytics.css"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30days")

  // Sample data for charts
  const responseData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Responses",
        data: [65, 59, 80, 81],
        backgroundColor: "rgba(74, 108, 247, 0.2)",
        borderColor: "rgba(74, 108, 247, 1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  const completionRateData = {
    labels: ["Completed", "Abandoned"],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["rgba(40, 167, 69, 0.7)", "rgba(220, 53, 69, 0.7)"],
        borderWidth: 0,
      },
    ],
  }

  const deviceData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        data: [55, 35, 10],
        backgroundColor: ["rgba(74, 108, 247, 0.7)", "rgba(253, 126, 20, 0.7)", "rgba(108, 117, 125, 0.7)"],
        borderWidth: 0,
      },
    ],
  }

  const questionResponseData = {
    labels: ["Q1", "Q2", "Q3", "Q4", "Q5"],
    datasets: [
      {
        label: "Average Rating",
        data: [4.2, 3.8, 4.5, 3.9, 4.1],
        backgroundColor: "rgba(74, 108, 247, 0.7)",
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  }

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics</h1>
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="time-range-select">
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card full-width">
          <h2>Response Trends</h2>
          <div className="chart-container">
            <Line
              data={responseData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="analytics-card">
          <h2>Completion Rate</h2>
          <div className="chart-container">
            <Doughnut
              data={completionRateData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="analytics-card">
          <h2>Device Breakdown</h2>
          <div className="chart-container">
            <Doughnut
              data={deviceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="analytics-card full-width">
          <h2>Question Performance</h2>
          <div className="chart-container">
            <Bar
              data={questionResponseData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                      display: true,
                      text: "Average Rating",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
