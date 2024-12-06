import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { API_Endpoint, token } from "../components/API";

import Review from "../components/Review";

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
      <h4 className="m-0">Recent Reviews</h4>
    </div>
  );
};

function RecentReviews() {
  const history = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    // Fetch data from the API with JWT token in headers
    fetch(`${API_Endpoint}/reviews/getUserReview`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        
        // Update the state with the fetched reviews
        setReviews(data.data.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const routeTo = (route) => {
    history(route);
  };

  return (
    <Container maxWidth="100%">
      <Header Data={<HeaderContent />} />
      <Grid container spacing={2} className="mt-4">
        {reviews.map((review) => (
          <Grid key={review._id} item xs={12} md={6} xl={4}>
            <Card className="p-3 shadow-sm-sm rounded d-flex flex-column gap-3">
              <Review
                review={review}
               
                className="border"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RecentReviews;
