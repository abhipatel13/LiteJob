import React from "react";
import ReactApexChart from "react-apexcharts";

function LineChart({ series }) {
  const options = {
    chart: {
      height: 380,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2.5,
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
    legend: {
      position: "left",
      show: true,
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
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
    responsive: [
      {
        breakpoint: 1600,
        options: {
          legend: {
            show: false,
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className=" h-100 w-100">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={180}
      />
    </div>
  );
}

export default LineChart;
