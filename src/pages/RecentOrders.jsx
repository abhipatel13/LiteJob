import {
  Box,
  Card,
  Container,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { API_Endpoint, token, email } from "../components/API";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";

import { faker } from "@faker-js/faker";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";

// const Statuses = ["All", "Paid", "Pending"];

const InvoicesColumns = [
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

const inovicesRows = new Array(10).fill(null).map((_, i) => ({
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

const HeaderContent = () => {
  const history = useNavigate();
  const routeTo = (route) => {
    history(route);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <IconButton onClick={() => routeTo(-1)}>
        <ArrowBack />
      </IconButton>
      <h4 className="m-0">
        {location.pathname.split("/")[1] === "user"
          ? "Recent Purchases"
          : "Recent Orders"}
      </h4>
    </div>
  );
};

function RecentOrders() {
  const [transactions, setTransactions] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    const business_ID = localStorage.getItem("userBusinessId");
    setBusinessId(business_ID); // Update the state variable with the value from localStorage
  }, []);

  const history = useNavigate();

  const routeTo = (route) => {
    history(route);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        if (businessId) {
          const response = await axios.get(
            `${API_Endpoint}/payment/${businessId}`
          );
          setTransactions(response.data.data.transactions);
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

  const formattedInvoices = transactions.map((invoice, index) => ({
    id: index + 1,
    name: invoice.responseData.customer_details.name || "",
    price: invoice.totalPrice,
    city: invoice.businessCity,
    status: invoice.paymentStatus,
    service: invoice.services.map((service) => service.name),
    invoiceNumber: invoice.invoice,
    orderDate: invoice.orderDate,
  }));

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <Container maxWidth="100%">
      <Header Data={<HeaderContent />} />
      <Card className="p-3 shadow-sm-sm rounded d-flex flex-column gap-3 mt-4 h-screen">
        {/* <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={2}
          className="mt-3"
        >
          <TextField
            variant="filled"
            size="small"
            label="Search"
            fullWidth
            sx={{
              maxWidth: "300px",
            }}
            InputProps={{
              disableUnderline: true,
            }}
          ></TextField>
          <TextField
            id="outlined-select-currency"
            select
            value={"Paid"}
            defaultValue={"Paid"}
            variant="filled"
            label="Status"
            size="small"
            fullWidth
            sx={{
              maxWidth: "300px",
            }}
            InputProps={{
              disableUnderline: true,
            }}
          >
            {Statuses.map((option) => (
              <MenuItem
                key={option}
                value={option}
                className="d-flex align-items-center gap-2"
              >
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack> */}
        {!isLoading ? (
          <DataGrid
            rows={formattedInvoices.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )}
            columns={InvoicesColumns}
            disableColumnMenu
            hideFooter
            className="mt-2"
            sx={{
              "& .MuiDataGrid-cell:hover": {
                cursor: "pointer",
              },
            }}
            onRowClick={(params) => {
              routeTo(`${params.id}`);
            }}
          />
        ) : (
          <div className="text-2xl text-center font-bold">Loading...</div>
        )}
      </Card>
      <Box className="d-flex justify-content-end mt-4">
        <Pagination
          count={Math.ceil(formattedInvoices.length / pageSize)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
}

export default RecentOrders;
