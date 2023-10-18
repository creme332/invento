import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface hBarChartProps {
  themeIndex?: number;
  labelsArray?: string[];
  dataArray?: number[];
  dataLabel?: string;
  titleName?: string;
}

export default function HorizontalBarChart({
  themeIndex = 0,
  labelsArray = ["Home Decor", "Electronics", "Gym"],
  dataArray = [10, 21, 23],
  dataLabel = "Dataset",
  titleName = "Number of items per category",
}: hBarChartProps) {
  const themes = [
    {
      backgroundColor: "#FF66B2",
    },
    {
      borderColor: "rgb(53, 162, 235)", // blue
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      borderColor: "rgba(255, 206, 86, 1)", // yellow
      backgroundColor: "rgba(255, 206, 86, 0.2)",
    },
    {
      borderColor: "rgba(75, 192, 192, 1)", // green
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
    {
      borderColor: "rgba(153, 102, 255, 1)", //purple
      backgroundColor: "rgba(153, 102, 255, 0.2)",
    },
    {
      borderColor: "rgba(255, 159, 64, 1)", // orange
      backgroundColor: "rgba(255, 159, 64, 0.2)",
    },
  ];

  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: titleName,
      },
    },
  };

  const data = {
    labels: labelsArray,
    datasets: [
      {
        label: dataLabel,
        data: dataArray,
        borderColor: themes[themeIndex % themes.length].borderColor,
        backgroundColor: themes[themeIndex % themes.length].backgroundColor,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
