import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Load Stripe.js
const stripePromise = loadStripe(
  "pk_test_51OGnTzLEMtUF0MCXmQgE2EUi5Ql6uFazYF6cusy6QbRqn6CZuyK0iaJGoTSqp57Fm5U1DYzyvJB8ETsqWlZQlzqm00duqUXSM6"
);

export const useStripeCheckout = (
  totalPrice,
  selectedService,
  businessId,
  businessCity
) => {
  const handlePurchase = async () => {
    try {
      // Get Stripe.js instance
      const stripe = await stripePromise;

      const servicesWithQuantity = selectedService.map((service) => ({
        ...service,
        quantity: service.quantity, // Include the quantity
      }));
      // Call your backend to create the Checkout Session
      const response = await axios.post(
        "http://localhost:5500/api/v1/payment",
        {
          totalPrice: totalPrice * 100,
          services: servicesWithQuantity,
          businessId: businessId,
          businessCity: businessCity,
        }
      );

      const session = response.data;
      console.log("Session:", session);
      // Log the session
      const sessionId = session.url.match(/\/pay\/([^#]+)/)[1];

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
      console.log("Redirect result:", result); // Log the result

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("An error occurred:", error); // Log any errors
    }
  };

  return handlePurchase;
};
