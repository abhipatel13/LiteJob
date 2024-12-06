import React from "react";
import ReactApexChart from "react-apexcharts";

function PieCharts({ series, labels }) {
  const options = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: labels,
    colors: ["#4A3AFF", "#b2bde4"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={"100%"}
      />
    </div>
  );
}

export default PieCharts;
