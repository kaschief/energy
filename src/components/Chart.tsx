import React from "react";
import { Line } from "react-chartjs-2";

interface IProps {
  gas: string;
  data?: Data[];
}

interface Data {
  average: number;
  end: string;
  start: string;
}

export const Chart: React.FC<IProps> = ({ gas, data }) => {
  const parsedDates = data!.map((d: Data) => {
    const date = new Date(d.end);
    const printedDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    return printedDate;
  });

  const generateHex = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const values = data!.map((el) => el.average);

  const chartData = {
    labels: parsedDates,
    datasets: [
      {
        label: `Emission of ${gas}`,
        data: values,
        backgroundColor: generateHex(),
        borderColor: generateHex(),
        borderWidth: 4,
      },
    ],
  };

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          indexAxis: "x",
          aspectRatio: 4,
          elements: {
            line: {
              fill: true,
              tension: 0.5,
            },
            point: {
              radius: 2,
            },
          },
          plugins: {
            legend: {
              fullSize: true,
              position: "bottom",
              labels: {
                boxWidth: 100,
                boxHeight: 20,
                font: {
                  size: 14,
                  family: "Arial",
                  weight: "600",
                },
              },
            },
          },
        }}
      />
    </div>
  );
};
