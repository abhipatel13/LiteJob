import axios from "axios";

export const getBusinessServices = async (id) => {
  // let query = "http://localhost:5500/api/v1/services/id";

  return await axios.get(`http://localhost:5500/api/v1/service/${id}`, {
    headers: {
      "Content-Type": "application/json",
      // authorization: token,
    },
  });
};
