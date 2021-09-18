import React from "react";
import { Bar } from "react-chartjs-2";

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

  const backgroundColors = parsedDates.map(() => generateHex());

  const borderColor = generateHex();

  const values = data!.map((el) => el.average);

  const chartData = {
    labels: parsedDates,
    datasets: [
      {
        label: `Emission of ${gas}`,
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColor,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          color: "blue",
          indexAxis: "y",
          resizeDelay: 1000,
          aspectRatio: 4,
          // bar: {
          //   borderRadius: 5,
          // },
          layout: {
            padding: {
              left: 0,
            },
          },
        }}
      />
    </div>
  );
};
