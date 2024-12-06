import React from "react";
import ReactApexChart from "react-apexcharts";

function BarChart({ series }) {
  const options = {
    chart: {
      height: 380,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        colors: {
          backgroundBarColors: ["#E5E5EF"],
          backgroundBarRadius: 5,
        },
        barHeight: "50%",
        borderRadius: 5,
      },
    },
    grid: {
      strokeDashArray: 5,

      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Birmingham", "Islamabad", "Toronto", "London", "Delhi"],
      position: "bottom",
      axisTicks: {
        show: false,
      },
    },

    colors: [
      function () {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
    ],
  };

  return (
    <div className=" h-100 w-100">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={280}
      />
    </div>
  );
}

export default BarChart;
