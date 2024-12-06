import React from "react";
import ReactApexChart from "react-apexcharts";

function ColumnsChart({ series }) {
  const options = {
    chart: {
      width: 380,
      height: 300,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        colors: {
          backgroundBarColors: ["#E5E5EF"],
          backgroundBarRadius: 5,
        },
        columnWidth: "20%",
        borderRadius: 5,
      },
    },
    grid: {
      strokeDashArray: 5,
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
    yaxis: {
      labels: {
        formatter: function (value) {
          return "£" + value;
        },
      },
    },
    colors: ["#4A3AFF", "#b2bde4"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          plotOptions: {
            bar: {
              colors: {
                backgroundBarRadius: 1,
              },
              columnWidth: "50%",
              borderRadius: 1,
            },
          },
        },
      },
    ],
  };

  return (
    <div style={{ maxHeight: "600px" }} className="w-100">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        width={"100%"}
        height={350}
      />
    </div>
  );
}

export default ColumnsChart;
