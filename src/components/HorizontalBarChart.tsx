import React from "react";
import { Bar } from "react-chartjs-2";

interface IProps {
  labels: string[];
  gas: string;
  allData?: Data[];
}

interface Data {
  average: number;
  end: string;
  start: string;
}

export const HorizontalBarChart: React.FC<IProps> = ({
  labels,
  gas,
  allData,
}) => {
  const colors = labels.map(() => {
    return Math.floor(Math.random() * 16777215).toString(16);
  });
  let values;

  Array.isArray(allData)
    ? (values = allData.map((el) => el.average))
    : (values = [12, 19, 3, 5, 2, 3]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Emission of ${gas}`,
        data: values,
        backgroundColor: colors,
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "purple",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 10,
      },
    ],
  };

  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    // plugins: {
    //   legend: {
    //     position: "right",
    //   },
    //   title: {
    //     display: true,
    //     text: "Chart.js Horizontal Bar Chart",
    //   },
    // },
  };
  return (
    <div>
      <Bar data={data} height={400} width={800} options={options} />
    </div>
  );
};
