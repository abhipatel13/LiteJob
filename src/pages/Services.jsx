import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Typography,
  makeStyles,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Add, Close, Edit, EditNotifications } from "@mui/icons-material";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import {
  API_Endpoint,
  token,
  email,
  API_Endpoint_Image,
} from "../components/API";

import { faker } from "@faker-js/faker";
import styled from "@emotion/styled";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../redux/slices/servicesSlice";
import { Swiper, SwiperSlide } from "swiper/react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const recentPurchasesRows = new Array(5).fill(null).map((_, i) => ({
  id: i + 1,
  name: "Plumbing",
  price: faker.commerce.price(),
  description: faker.lorem.sentences(),
  vat: faker.helpers.rangeToNumber({ min: 10, max: 15 }),
}));

const AddService = ({ open, handleClose }) => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [vat, setVat] = useState("");
  const [image, setImage] = useState(null);
  const [isImageUploaded, setImageUploaded] = useState(false);
  const [imagePaths, setImagePaths] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    const business_ID = localStorage.getItem("userBusinessId");
    setBusinessId(business_ID); // Update the state variable with the value from localStorage
  }, []);

  const handleServiceNameChange = (e) => {
    setServiceName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleVatChange = (e) => {
    setVat(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    // Append all images to formData
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    try {
      const response = await axios.post(
        `${API_Endpoint_Image}/upload/${businessId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        console.log("Images uploaded successfully");
        setImageUploaded(true);
        setImagePaths(response.data.data.paths);
        alert("Images uploaded successfully");
      } else {
        console.error("Error uploading images:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true)
    if (!isImageUploaded) {
      alert("Please upload an image first");
      return;
    }

    // Create a JavaScript object with the data
    const data = {
      name: serviceName,
      description: description,
      price: price,
      vat: vat,
      images: imagePaths,
      business: businessId,
    };

    try {
      const response = await axios.post(
        `${API_Endpoint}/service/${businessId}`,
        data, // Pass the data object directly to axios.post()
        {
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
          },
        }
      );

      if (response.data.status === "success") {
        dispatch(addService(data));
        console.log("Service saved successfully");
        alert("Service added successfully");
        handleClose(); // Close the dialog after successful save

        setServiceName("");
        setDescription("");
        setPrice("");
        setImagePaths([]);
        setBusinessId(null);
      } else {
        console.error("Error saving service:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving service:", error);
    } finally{
      setLoading(false)
    }
  };

  return (
    <Dialog
      open={open}
      handleClose={() => handleClose()}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle>
        <Box className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="m-0 fw-bold">Service Information</h6>
          <IconButton onClick={() => handleClose()}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack direction={"column"} gap={3}>
          <TextField
            label="Service name"
            size="small"
            variant="filled"
            onChange={handleServiceNameChange}
            value={serviceName}
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <TextField
            label="Description"
            multiline
            rows={6}
            size="small"
            variant="filled"
            onChange={handleDescriptionChange}
            value={description}
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <Stack direction={"row"} spacing={2}>
            <TextField
              label="Price"
              size="small"
              variant="filled"
              onChange={handlePriceChange}
              value={price}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              label="VAT"
              size="small"
              variant="filled"
              onChange={handleVatChange}
              value={vat}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Stack>
          <Box
            component="label"
            className="border d-flex flex-column align-items-center justify-content-center"
            sx={{
              width: 100,
              height: 100,
              overflow: "visible",
              position: "relative",
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
              multiple
            />
            {image && image.length > 0 ? (
              <img
                src={URL.createObjectURL(image[0])}
                alt="Selected Image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <>
                <Add className="text-muted" />
                <p className="m-0 text-muted" style={{ fontSize: "12px" }}>
                  Add Image
                </p>
              </>
            )}

            <Button
              variant="contained"
              disableElevation
              onClick={() => handleUpload()}
            >
              Upload
            </Button>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Box className="d-flex align-items-center justify-content-center gap-3 w-100 mb-2">
          <Button disableElevation onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => handleSave()}
          >
            {loading ? "Loading..." : "Save"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

const EditService = ({ editDialogOpen, handleClose, service }) => {
  const [serviceName, setServiceName] = useState(service ? service.name : "");
  const [description, setDescription] = useState(
    service ? service.description : ""
  );
  const [price, setPrice] = useState(service ? service.price : "");
  const [vat, setVat] = useState(service ? service.vat : "");
  const [image, setImage] = useState(null);

  const [isImageUploaded, setImageUploaded] = useState(true);
  const [imagePaths, setImagePaths] = useState(service ? service.images : []);
  const [businessId, setBusinessId] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const business_ID = localStorage.getItem("userBusinessId");
    setBusinessId(business_ID); // Update the state variable with the value from localStorage
  }, []);

  useEffect(() => {
    setServiceName(service ? service.name : "");
    setDescription(service ? service.description : "");
    setPrice(service ? service.price : "");
  }, [service]);

  const handleServiceNameChange = (e) => {
    setServiceName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleVatChange = (e) => {
    setVat(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    // Append all images to formData
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    try {
      const response = await axios.post(
        `${API_Endpoint_Image}/upload/${businessId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        console.log("Images updated successfully");
        setImageUploaded(true);
        setImagePaths(response.data.data.paths);
        alert("Images updated successfully");
      } else {
        console.error("Error uploading images:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    if (!isImageUploaded) {
      alert("Please upload an image first");
      return;
    }

    // Create a JavaScript object with the data
    const data = {
      name: serviceName,
      description: description,
      price: price,
      vat: vat,
      images: imagePaths,
      business: businessId,
    };

    try {
      const response = await axios.patch(
        `${API_Endpoint}/service/${service._id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        dispatch(addService(data));
        console.log("Service updated successfully");
        alert("Service updated successfully");
        handleClose();
      } else {
        console.error("Error updating service:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={editDialogOpen}
      onClose={handleClose}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle>
        <Box className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="m-0 fw-bold">Service Information</h6>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack direction={"column"} gap={3}>
          <TextField
            label="Service name"
            size="small"
            variant="filled"
            onChange={handleServiceNameChange}
            value={serviceName}
            fullWidth
          />
          <TextField
            label="Description"
            multiline
            rows={6}
            size="small"
            variant="filled"
            onChange={handleDescriptionChange}
            value={description}
            fullWidth
          />
          <TextField
            label="Price"
            size="small"
            variant="filled"
            onChange={handlePriceChange}
            value={price}
            fullWidth
          />
          <TextField
            label="VAT"
            size="small"
            variant="filled"
            onChange={handleVatChange}
            value={vat}
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <Box
            component="label"
            className="border d-flex flex-column align-items-center justify-content-center"
            sx={{
              width: 100,
              height: 100,
              overflow: "visible",
              position: "relative",
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
              multiple
            />
            {image && image.length > 0 ? (
              <img
                src={URL.createObjectURL(image[0])}
                alt="Selected Image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <>
                <Add className="text-muted" />
                <p className="m-0 text-muted" style={{ fontSize: "12px" }}>
                  Add Image
                </p>
              </>
            )}

            <Button
              variant="contained"
              disableElevation
              onClick={() => handleUpload()}
            >
              Upload
            </Button>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {loading ? "Loading..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ServiceDetails = ({ selectedService, dialogOpen, handleClose }) => {
  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle className="text-blue-400">Service Details</DialogTitle>
      <DialogContent className="bg-blue-100 py-2">
        {selectedService && (
          <>
            <Typography variant="h6" className="font-semibold">
              Service ID: {selectedService.id}
            </Typography>
            <Typography variant="h6">
              Service Name: {selectedService.name}
            </Typography>
            <Typography variant="h6">
              Service Description: {selectedService.description}
            </Typography>
            <Typography variant="h6">
              Service Price: £{selectedService.price}
            </Typography>
            {/* Add more fields as necessary */}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

function Services() {
  const [servicesDailogOpen, setServicesDailogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [servicesData, setServicesData] = useState([]);
  const servicesDailogClose = () => {
    setServicesDailogOpen(false);
  };
  const editDailogClose = () => {
    setEditDialogOpen(false);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedService, setSelectedService] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const dispatch = useDispatch();

  const reduxServicesData = useSelector((state) => state.services);

  useEffect(() => {
    const fetchServices = async () => {
      // Fetch services data here
      const businessId = localStorage.getItem("userBusinessId");
      try {
        const response = await fetch(`${API_Endpoint}/service/${businessId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.status === "success") {
          // Set services data to state
          setServicesData(data.data.data);
        } else {
          console.error("Error fetching services:", data.message);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    // Call the function to fetch services data
    fetchServices();
  }, [reduxServicesData]);

  const handleDelete = async (serviceId) => {
    try {
      const response = await axios.delete(
        `${API_Endpoint}/service/${serviceId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        dispatch(addService());
        console.log("Service deleted successfully");
        alert("Service deleted successfully");
      } else {
        console.error("Error deleting service:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const recentPurchasesColumns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
      cellClassName: "text-muted",
      headerClassName: "fw-bold bg-light",
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 350,
      flex: 1,
      cellClassName: "text-muted",
      headerClassName: "fw-bold bg-light",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 130,
      flex: 1,
      cellClassName: "text-muted",
      headerClassName: "fw-bold bg-light",
      valueFormatter: (params) => "£" + params.value,
    },
    {
      field: "vat",
      headerName: "Vat",
      minWidth: 130,
      flex: 1,
      cellClassName: "text-muted",
      headerClassName: "fw-bold bg-light",
      valueFormatter: (params) => params.value + "%",
    },
    {
      field: "image",
      headerName: "Thumbnail",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
      cellClassName: "text-muted",
      headerClassName: "fw-bold bg-light",
      renderCell: (params) => (
        <div
          className=" w-full object-cover h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {params.row.images?.length > 0 ? (
            <Swiper>
              {params.row.images?.map((imgUrl, index) => {
                const formattedUrl = imgUrl.replace(/\\/g, "/");
                return (
                  <SwiperSlide key={index}>
                    <img
                      className="w-[200px] h-[150px] rounded-[8px] object-cover"
                      src={`http://localhost:5500/${formattedUrl}`}
                      alt=""
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div>No images available</div>
          )}
        </div>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      minWidth: 100,
      maxWidth: 100,
      cellClassName: "text-muted",
      headerClassName: "fw-bold bg-light",
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={(event) => {
            event.stopPropagation(); // Prevent row click event from firing
            setSelectedService(params.row);
            setEditDialogOpen(true);
          }}
        >
          <EditNotifications />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      minWidth: 100,
      maxWidth: 100,
      cellClassName: "text-muted",
      headerClassName: "fw-bold bg-light",
      renderCell: (params) => (
        <IconButton
          color="secondary"
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(params.row.id);
          }}
        >
          <GridDeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Container maxWidth="100%" className="min-vh-100">
      <AddService open={servicesDailogOpen} handleClose={servicesDailogClose} />

      <Header />
      <Grid container spacing={2} sx={{ flex: 1 }} className="mt-4 ">
        <Grid item xs={12}>
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              setServicesDailogOpen(true);
            }}
          >
            <Add /> Add service
          </Button>
        </Grid>
        <Grid item xs={12} className="d-flex flex-column gap-3">
          <ServiceDetails
            selectedService={selectedService}
            dialogOpen={dialogOpen}
            handleClose={() => setDialogOpen(false)}
          />

          {selectedService && (
            <EditService
              editDialogOpen={editDialogOpen}
              handleClose={editDailogClose}
              service={selectedService}
            />
          )}

          <Card className="p-3 shadow-sm rounded d-flex flex-column gap-3 h-screen">
            <DataGrid
              rows={servicesData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )}
              columns={recentPurchasesColumns}
              disableColumnMenu
              hideFooter
              rowHeight={85}
              onRowClick={(params) => {
                setSelectedService(params.row);
                setDialogOpen(true);
              }}
              pagination
              pageSize={pageSize}
              paginationMode="server"
            />
          </Card>
          <div className="d-flex justify-content-end">
            <Pagination
              count={Math.ceil(servicesData.length / pageSize)}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Services;
