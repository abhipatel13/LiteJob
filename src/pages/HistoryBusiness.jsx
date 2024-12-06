import { Notifications, TrendingUp } from "@mui/icons-material";
import { Card, Container, Divider, Grid, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { API_Endpoint, token } from "../components/API";

import { DataGrid } from "@mui/x-data-grid";

import { faker } from "@faker-js/faker";
import moment from "moment";
import Header from "../components/Header";
import ColumnsChart from "../Charts/ColumnChart";

import LineSuccess from "../assets/LineSuccess.svg";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";

function generateRandomData(count, min, max) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
}

const recentPurchasesColumns = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 50,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
    valueFormatter: (params) => console.log(params),
  },
  {
    field: "name",
    headerName:
      location.pathname.split("/")[1] === "business"
        ? "Client Name"
        : "Business Name",
    minWidth: location.pathname.split("/")[1] === "business" ? 150 : 200,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
  },
  {
    field: "service",
    headerName: "Service",
    minWidth: 100,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
  },
  {
    field: "city",
    headerName: "City",
    minWidth: 150,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
  },
  {
    field: "price",
    headerName: "Price",
    minWidth: 80,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
    valueFormatter: (params) => "$" + params.value,
  },
  {
    field: "invoiceNumber",
    headerName: "Invoice",
    minWidth: 130,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
  },
  {
    field: "orderDate",
    headerName: "Order Date",
    minWidth: 100,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 100,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
    renderCell: (params) => (
      <p
        className={`${
          params.value === "Paid" ? "text-success m-0" : "text-danger m-0"
        }`}
      >
        {params.value}
      </p>
    ),
  },
];

const recentPurchasesRows = new Array(5).fill(null).map((_, i) => ({
  id: i + 1,
  name:
    location.pathname.split("/")[1] === "user"
      ? faker.company.name()
      : faker.person.fullName(),

  price: faker.commerce.price(),
  service: "Plumbing",
  city: faker.location.city(),
  invoiceNumber: ("#" + faker.database.mongodbObjectId()).slice(0, 7),
  orderDate: moment().format("DD MMM YYYY"),
  status: faker.helpers.arrayElement(["Pending", "Paid"]),
}));

function HistoryBussiness() {
  const [totalRevenue, setTotalRevenue] = useState();
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [newVisitors, setNewVisitors] = useState();
  const [jobStats, setJobStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);


  useEffect(() => {
    // Fetch services data
    fetch(`${API_Endpoint}/business/revenue/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Set services data to state

          setTotalRevenue(data.data.total);
          // Extract and map monthly revenue
          const monthlyRevenueData = data.data.monthly.map(
            (month) => month.Revenue
          );
          setMonthlyRevenue(monthlyRevenueData);
        } else {
          console.error("Error fetching services:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });

    // Fetch services data
    fetch(`${API_Endpoint}/business/visitor/getAll?year=2023`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Set services data to state

          setNewVisitors(data.count);
        } else {
          console.error("Error fetching services:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });

    // Fetch services data
    fetch(`${API_Endpoint}/business/jobs/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const jobStats = data.data.map((item) => item.count); // Map each object's 'count' property
          setJobStats(jobStats); // Update the state with the extracted values
        } else {
          console.error("Error fetching services:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });

      fetch(`${API_Endpoint}/order/getBusinessOrders?recent=true`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",

        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setRecentOrders(data.data.data);
          } else {
            console.error("Error fetching services:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
        });

    // Fetch services data
    fetch(`${API_Endpoint}/business/jobs/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const jobStats = data.data.map((item) => item.count); // Map each object's 'count' property
          setJobStats(jobStats); // Update the state with the extracted values
        } else {
          console.error("Error fetching services:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });

  }, []);

  const formattedInvoices = recentOrders.map((invoice) => ({
    id: invoice._id,
    name: invoice.users[0]?.FirstName || "",
    price: invoice.price,
    service: invoice.services[0]?.name || "",
    city: invoice.services[0]?.business || "",
    invoiceNumber: invoice.invoiceId,
    orderDate: moment(invoice.orderDate).format("DD MMM YYYY"),
    status: invoice.status,
  }));
  return (
    <Container maxWidth="100%">
      <Header />
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        spacing={2}
        className="mt-2"
      >
        <Grid item xs={12} lg={8}>
          <Card className="p-3 shadow-sm rounded  d-flex flex-column  gap-3  h-100">
            <h6 className="m-0">
              Monthly Revenue
              <select
                className="fs-6 ms-2"
                style={{
                  border: "none",
                  outline: "none",
                  borderBottom: "1px solid",
                }}
              >
                <option>2023</option>
              </select>
            </h6>
            <div className="h-100 w-100  d-flex flex-column justify-content-center">
              <ColumnsChart
                series={[
                  {
                    name: "Earning",
                    data: monthlyRevenue,
                  },
                ]}
              />
            </div>
          </Card>
        </Grid>
       
        <Grid item xs={12} lg={8}>
          <Card className="p-3 shadow-sm rounded d-flex flex-column gap-3 h-100">
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <h6 className="m-0">
                Recent Orders{" "}
                <select
                  className="fs-6 mx-2"
                  style={{
                    border: "none",
                    outline: "none",
                    borderBottom: "1px solid",
                  }}
                >
                  {[
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                    "AUG",
                    "SEP",
                    "OCT",
                    "NOV",
                    "DEC",
                  ].map((item, i) => (
                    <option key={item + i}>{item}</option>
                  ))}
                </select>
                <select
                  className="fs-6 ms-2"
                  style={{
                    border: "none",
                    outline: "none",
                    borderBottom: "1px solid",
                  }}
                >
                  <option>2023</option>
                </select>
              </h6>
              <Link to={"recent-purchases"}>See all</Link>
            </Stack>
            <DataGrid
              rows={formattedInvoices}
              columns={recentPurchasesColumns}
              disableColumnMenu
              hideFooter
            />
          </Card>
        </Grid>
       
      </Grid>
    </Container>
  );
}

export default HistoryBussiness;
