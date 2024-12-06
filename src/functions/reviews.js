import axios from "axios";

export const getBusinessServicesReviews = async (id) => {
  return await axios.get(`http://localhost:5500/api/v1/reviews/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const createBusinessReview = async (data) => {
  return await axios.post(`http://localhost:5500/api/v1/reviews/`, data, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const editBusinessReview = async (id,data) => {
  return await axios.patch(`http://localhost:5500/api/v1/reviews/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};
export const deleteBusinessReview = async (id) => {
  return await axios.delete(`http://localhost:5500/api/v1/reviews/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};
