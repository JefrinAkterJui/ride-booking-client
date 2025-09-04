/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { Users, Car, CircleDollarSign, BarChartHorizontal } from "lucide-react";

declare global {
  interface Window {
    google: any;
  }
}

export const lineChartData = [
  ["Month", "Riders", "Drivers"],
  ["Jan", 100, 30],
  ["Feb", 120, 45],
  ["Mar", 250, 70],
  ["Apr", 300, 85],
  ["May", 420, 110],
  ["Jun", 500, 130],
];

export const pieChartData = [
  ["Status", "Count"],
  ["Completed", 1200],
  ["Cancelled", 150],
  ["In Progress", 50],
];

export const barChartData = [
  ["Vehicle Type", "Revenue", { role: "style" }],
  ["Car", 45000, "#FB404A"],
  ["Bike", 25000, "#f59e0b"],
  ["CNG", 15000, "#10b981"],
];

export const geoChartData = [
  ["City", "Active Riders"],
  ["Dhaka", 2761477],
  ["Chattogram", 1324110],
  ["Khulna", 758652],
  ["Sylhet", 528543],
  ["Rajshahi", 401245],
  ["Barishal", 328304],
  ["Rangpur", 257790],
];

const lineChartOptions = {
  title: "User Growth (Riders vs Drivers)",
  curveType: "function",
  legend: { position: "bottom" },
  hAxis: { title: "Month" },
  vAxis: { title: "Number of Users" },
  colors: ["#FB404A", "#10b981"],
  backgroundColor: 'transparent',
};

const pieChartOptions = {
  title: "Ride Status Distribution",
  // is3D: true,
  colors: ["#10b981", "#ef4444", "#f59e0b"],
  backgroundColor: 'transparent',
};

const barChartOptions = {
  title: "Revenue by Vehicle Type",
  legend: { position: "none" },
  chartArea: { width: "70%" },
  hAxis: {
    title: "Total Revenue (BDT)",
    minValue: 0,
  },
  vAxis: {
    title: "Vehicle Type",
  },
  backgroundColor: 'transparent',
};

const geoChartOptions = {
  region: 'BD', 
  displayMode: 'markers',
  colorAxis: { colors: ['#fde047', '#f97316', '#ef4444'] },
  backgroundColor: '#f1f5f9',
};


function useGoogleCharts() {
  const [isLoaded, setIsLoaded] = useState(window.google && window.google.charts);

  useEffect(() => {
    if (!isLoaded) {
      const script = document.getElementById('google-charts-script');
      
      const handleLoad = () => {
          window.google.charts.load('current', { 'packages': ['corechart', 'geochart', 'bar'] });
          window.google.charts.setOnLoadCallback(() => {
            setIsLoaded(true);
            window.dispatchEvent(new Event('google-charts-loaded'));
          });
      }

      const onChartsLoaded = () => setIsLoaded(true);

      window.addEventListener('google-charts-loaded', onChartsLoaded);

      if (!script) {
        const newScript = document.createElement('script');
        newScript.src = 'https://www.gstatic.com/charts/loader.js';
        newScript.id = 'google-charts-script';
        newScript.onload = handleLoad;
        document.head.appendChild(newScript);
      } else if (window.google && window.google.charts) {
        handleLoad();
      }

      return () => {
        window.removeEventListener('google-charts-loaded', onChartsLoaded);
      }
    }
  }, [isLoaded]);

  return isLoaded;
}

const Chart = ({ chartType, data, options, width = "100%", height = "400px", isChartsLoaded }: { chartType: string, data: any[], options: object, width?: string, height?: string, isChartsLoaded: boolean }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChartsLoaded && chartRef.current && window.google.visualization) {
      const dataTable = window.google.visualization.arrayToDataTable(data);
      let chart;
      switch (chartType) {
        case 'LineChart':
          chart = new window.google.visualization.LineChart(chartRef.current);
          break;
        case 'PieChart':
          chart = new window.google.visualization.PieChart(chartRef.current);
          break;
        case 'BarChart':
          chart = new window.google.visualization.BarChart(chartRef.current);
          break;
        case 'GeoChart':
          chart = new window.google.visualization.GeoChart(chartRef.current);
          break;
        default:
          console.error(`Unsupported chart type: ${chartType}`);
          return;
      }
      chart.draw(dataTable, options);
    }
  }, [isChartsLoaded, chartType, data, options, height, width]);

  if (!isChartsLoaded) {
    return (
      <div style={{ width, height }} className="flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Loading Chart...</p>
      </div>
    );
  }

  return <div ref={chartRef} style={{ width, height }} />;
};


const Analytics = () => {
  const isChartsLoaded = useGoogleCharts();

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Users className="text-blue-500" />} title="Total Users" value="12,450" />
        <StatCard icon={<Car className="text-green-500" />} title="Total Rides" value="25,678" />
        <StatCard icon={<CircleDollarSign className="text-yellow-500" />} title="Total Revenue" value="৳5,80,500" />
        <StatCard icon={<BarChartHorizontal className="text-red-500" />} title="Active Drivers" value="1,200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="User Growth Analysis">
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={lineChartData}
            options={lineChartOptions}
            isChartsLoaded={isChartsLoaded}
          />
        </ChartCard>

        <ChartCard title="Ride Status">
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={pieChartData}
            options={pieChartOptions}
            isChartsLoaded={isChartsLoaded}
          />
        </ChartCard>

        <ChartCard title="Revenue Breakdown">
          <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={barChartData}
            options={barChartOptions}
            isChartsLoaded={isChartsLoaded}
          />
        </ChartCard>

        <ChartCard title="Rider Hotspots">
          <Chart
            chartType="GeoChart"
            width="100%"
            height="400px"
            data={geoChartData}
            options={geoChartOptions}
            isChartsLoaded={isChartsLoaded}
          />
        </ChartCard>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => {
  return (
    <div className="bg-white p-6 rounded-xl  flex items-center gap-6 border border-gray-200">
      <div className="bg-slate-100 p-4 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  )
}

const ChartCard = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <div className="bg-white p-6 rounded-xl  border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
      {children}
    </div>
  )
}

export default Analytics;

