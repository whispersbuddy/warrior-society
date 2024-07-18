import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      position: "end",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Fights Won",
      data: [1, 2, 3, 4, 5, 6, 7],
      borderColor: "#af1a27",
      backgroundColor: "#af1a27",
    },
    {
      label: "Fights Lost",
      data: [3, 4, 3, 6, 8, 9, 17],
      borderColor: "#1f3b7b",
      backgroundColor: "#1f3b7b",
    },
  ],
};
export function LineGraph() {
  return <Line options={options} data={data} />;
}
