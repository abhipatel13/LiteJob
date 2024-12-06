import axios from "axios";

export const paymentOnBackend = async (paymentMethodId) => {
  return await axios.post(
    `http://localhost:5500/api/v1/payment/`,
    { paymentMethodId },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );
};

export const stripePayment = async (services, totalCost, userID) => {
  return await axios.post(
    `http://localhost:5500/api/v1/payment/`,
    { services, totalCost, userID },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );
};
