import { Notifications, TrendingUp } from "@mui/icons-material";
import { Card, Container, Divider, Grid, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { API_Endpoint, token } from "../components/API";

import { DataGrid } from "@mui/x-data-grid";

import { faker } from "@faker-js/faker";
import moment from "moment";
import Header from "../components/Header";
import ColumnsChart from "../Charts/ColumnChart";

import LineSuccess from "../assets/LineSuccess.svg";
import BarChart from "../Charts/BarChart";
import { useSelector } from "react-redux";
import axios from "axios";

const recentPurchasesColumns = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 50,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
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
    valueFormatter: (params) => "£" + params.value,
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

// const recentPurchasesRows = new Array(5).fill(null).map((_, i) => ({
//   id: i + 1,
//   name:
//     location.pathname.split("/")[1] === "user"
//       ? faker.company.name()
//       : faker.person.fullName(),
//   price: faker.commerce.price(),
//   service: "Plumbing",
//   city: faker.location.city(),
//   invoiceNumber: ("#" + faker.database.mongodbObjectId()).slice(0, 7),
//   orderDate: moment().format("DD MMM YYYY"),
//   status: faker.helpers.arrayElement(["Pending", "Paid"]),
// }));

function DashboardBusiness() {
  const [totalRevenue, setTotalRevenue] = useState();
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [newVisitors, setNewVisitors] = useState();
  const [jobStats, setJobStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const userAuth = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const business_ID = localStorage.getItem("userBusinessId");
    setBusinessId(business_ID);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (userAuth.isLoggedIn) {
      navigate("/user");
    }
  }, [userAuth, navigate]);

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

    fetch(`${API_Endpoint}/order/getBusinessOrders?recent=true`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setRecentOrders(data);
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
          const jobStats = data.data.map((item) => item.count);
          setJobStats(jobStats);
        } else {
          console.error("Error fetching services:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        if (businessId) {
          const response = await axios.get(
            `${API_Endpoint}/payment/${businessId}`
          );
          setTransactions(response.data.data.transactions);
          console.log(response.data.data.transactions)
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (businessId) {
      fetchTransactions();
    }
  }, [businessId]);

  const formattedInvoices = transactions.map((invoice, index) => {
    const totalPrice = invoice.services.reduce((acc, service) => acc + service.price, 0);
  
    return {
      id: index + 1,
      name: "",
      price: totalPrice,
      city: invoice.businessCity,
      status: invoice.paymentStatus,
      service: invoice.services.map((service) => service.name),
      invoiceNumber: invoice.invoice,
      orderDate: invoice.orderDate,
    };
  });

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
        <Grid item xs={12} className="d-flex flex-column gap-3">
          {/* <p className="m-0 font-weight-bold">
            You have 3 new messages and 4 new notifications!
          </p> */}
        </Grid>
        <Grid item xs={12} lg={8}>
          <Card className="p-3 shadow-sm rounded  d-flex flex-column  gap-3  h-100">
            <h6 className="m-0">Monthly Revenue</h6>
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
        <Grid item xs={12} lg={4}>
          <Stack
            direction={{ xs: "column", md: "row", lg: "column" }}
            spacing={4}
            className=" h-100 w-100 "
          >
            <Card
              className="p-3 shadow-sm rounded d-flex flex-column justify-content-start gap-3 "
              style={{ flex: 1 }}
            >
              <Stack direction={"row"} className="h-100">
                <div className="h-100 d-flex flex-column justify-content-center w-50">
                  <h4 className="mb-4">New Visits</h4>
                  <div>
                    <h1 className="m-0">{newVisitors}</h1>
                    <p className="text-success">
                      +21.01% <TrendingUp />
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-end w-50">
                  <img src={LineSuccess} alt="" className="w-75" />
                </div>
              </Stack>
            </Card>
            <Card
              className="p-3 shadow-sm rounded d-flex flex-column justify-content-start gap-3 "
              style={{ flex: 1 }}
            >
              <Stack direction={"row"} className="h-100">
                <div className="h-100 d-flex flex-column justify-content-center w-50">
                  <h4 className="mb-4">Total Revenue</h4>
                  <div>
                    <h1 className="m-0">${totalRevenue}</h1>
                    <p className="text-success">
                      +21.01% <TrendingUp />
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-end w-50">
                  <img src={LineSuccess} alt="" className="w-75" />
                </div>
              </Stack>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Card className="p-3 shadow-sm rounded d-flex flex-column gap-3 h-100">
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <h6 className="m-0">Recent Orders</h6>
              <Link to={"recent-orders"}>See all</Link>
            </Stack>
            {!isLoading ? (
              <DataGrid
                rows={formattedInvoices}
                columns={recentPurchasesColumns}
                disableColumnMenu
                hideFooter
              />
            ) : (
              <div className="text-center text-2xl font-bold">
                Loading please wait
              </div>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className="p-3 shadow-sm rounded d-flex flex-column  h-100">
            <Stack direction={"row"} justifyContent={"space-between"}>
              <h6 className="m-0">Jobs in Cities</h6>
              <Link to={"recent-purchases"}></Link>
            </Stack>
            <Stack
              direction={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
              className="w-100 h-100 "
            >
              <BarChart
                series={[
                  {
                    data: jobStats,
                  },
                ]}
              />
            </Stack>
            <Divider className="mb-3" />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              className="w-100"
            >
              <p className="text-muted m-0">Total Jobs</p>
              <p className="text-muted m-0">26</p>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardBusiness;
