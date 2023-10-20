import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface pieChartProps {
  labelsArray?: string[];
  dataArray?: number[];
  titleName?: string;
}

export default function PieChart({
  labelsArray = ["Available", "Maintenance", "Reserved"],
  dataArray = [10, 21, 23],
  titleName = "Number of items per status",
}: pieChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
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
        label: titleName,
        data: dataArray,
        backgroundColor: [
          "#66B2FF",
          "#66FF99",
          "#FFB266",
          "#FF66B2",
          "#FFFF66",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie height={300} data={data} options={options} />;
}
