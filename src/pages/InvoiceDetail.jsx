import { Box, Card, Container, IconButton, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ArrowBack } from "@mui/icons-material";

import AppIcon from "../assets/icon.svg";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";

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
      <h4 className="m-0">Invoice Details</h4>
    </div>
  );
};

const invoiceColumns = [
  {
    field: "service",
    headerName: "Service Ordered",
    minWidth: 130,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 250,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
  },

  {
    field: "qty",
    headerName: "Qty",
    minWidth: 50,
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
    field: "price",
    headerName: "Price",
    minWidth: 100,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
    valueFormatter: (params) => "$" + params.value,
  },
  {
    field: "tax",
    headerName: "Tax",
    minWidth: 110,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
    valueFormatter: (params) => params.value + "% VAT",
  },
  {
    field: "total",
    headerName: "Total",
    minWidth: 100,
    flex: 1,
    cellClassName: "text-muted",
    headerClassName: "fw-bold bg-light",
    valueFormatter: (params) => "$" + params.value,
  },
];

const invoiceRows = new Array(5).fill(null).map((_, i) => ({
  id: i + 1,
  service: "Plumbing",
  description: faker.lorem.sentences(2),
  qty: 1,
  orderDate: moment().format("DD MMM YYYY"),
  price: faker.commerce.price(),
  tax: 15,
  total: faker.commerce.price(),
}));

function InvoiceDetail() {
  return (
    <Container maxWidth="100%">
      <Header Data={<HeaderContent />} />
      <Card className="p-3 shadow-sm-sm rounded d-flex flex-column gap-3 mt-4">
        <Box className="d-flex flex-column flex-md-row align-items-center justify-content-between  gap-2">
          <img src={AppIcon} alt="" style={{ width: "150px" }} />
          <Box className="p-2 px-4 bg-secondary rounded text-white">
            Invoice: <span className="fw-bold">#1236547</span>{" "}
          </Box>
        </Box>
        <Stack direction={"column"} spacing={2}>
          <p className="fw-bold">Tayyab Enterprise</p>
          <p>Recipent Name : Salman Kahlid</p>
          <p>City: London</p>
          <p>Date: {moment().format("DD/MM/YYYY")}</p>
        </Stack>
        <DataGrid
          columns={invoiceColumns}
          rows={invoiceRows}
          disableColumnMenu
          hideFooter
        />
        <Box className="d-flex justify-content-end">
          <Stack
            direction={"column"}
            gap={1}
            sx={{ bgcolor: "#F9F9FA", fontSize: "13px" }}
            className="rounded p-2 px-4 border"
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              spacing={3}
            >
              <p className="text-muted">Sub Total (excl Tax):</p>
              <p className="text-muted">${faker.commerce.price()}</p>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              spacing={3}
            >
              <p className="text-muted">Total Tax:</p>
              <p className="text-muted">$0.00</p>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              spacing={3}
            >
              <p className="text-muted">Lite Job Charges:</p>
              <p className="text-muted">$92.00</p>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              spacing={3}
            >
              <p className="fw-bold">Total Payable:</p>
              <p className="text-muted">${faker.commerce.price()}</p>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Container>
  );
}

export default InvoiceDetail;
