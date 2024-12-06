import React, { useEffect, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  // PaymentElement,
} from "@stripe/react-stripe-js";

import TelButton from "../TelButton";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51NbrWIHsKur4dQkYbK9vEZUJmc3zhItCCk0aqA3hUv1JDwEItgkuom2rdmooc3FXNPbgFPo8KYm26U0wEauG17Mr00tFtlqc2o"
);
// icons
import { HeartIcon, MailIcon, ShareIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";import { paymentOnBackend, stripePayment } from "../../functions/payment";

const BusinessContactInfo = ({
  scrollDown,
  selectArrayData,
  setSelectArrayData,
  setServicesAddedIndexes,
  setShowChat,
}) => {
  const bookingFee = 26;
  const otherFee = 0;
  const [showDetailsIndex, setShowDetailsIndex] = React.useState(-1);
  const [totalCost, setTotalCost] = React.useState(0);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  useEffect(() => {
    // add booking fee and other fee to each item price and save into totalCost
    let total = 0;
    selectArrayData.forEach((item) => {
      total += item.price + otherFee;
    });
    setTotalCost(total + bookingFee);
  }, [selectArrayData]);

  const handlePurchase = () => {
    if (isLoggedIn) {
      //handle purchase
    } else {
      toast.error("Please Login to Purchase", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    // Create a payment method with the card details.
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      // Handle errors
      setPaymentError(result.error.message);
    } else {
      // Send the payment method ID to your backend to complete the payment.
      const paymentMethodId = result.paymentMethod.id;
      // Call your backend endpoint to process the payment and handle the payment intent.
      handlePaymentOnBackend(paymentMethodId);
    }
  };

  const handlePaymentOnBackend = (paymentMethodId) => {
    paymentOnBackend(paymentMethodId)
      .then(async (res) => {
        setPaymentSuccess(res.data.message);
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:5174/Home",
            receipt_email: emailAddress,
          },
        });
      })
      .catch((error) => {
        // Payment failed
        setPaymentError(res.data.message);
        setPaymentError("Network error occurred. Please try again.");
      });
  };

  // const handleClick = async () => {
  //   try {
  //     // Replace the amount with the actual payment amount you want to charge the user
  //     const amount = 1000; // $10.00 in cents

  //     const response = await fetch("http://localhost:5500/api/v1/payment/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ amount }),
  //     });

  //     const data = await response.json();
  //     const { client_secret } = data;

  //     const stripe = await stripePromise;
  //     const result = await stripe.redirectToCheckout({
  //       sessionId: client_secret,
  //     });

  //     if (result.error) {
  //       // Handle any errors that occur during the redirection to Stripe
  //     }
  //   } catch (err) {
  //     console.error("Error:", err);
  //   }
  // };

  const handleCheckout = () => {
    const currentUser = JSON.parse(window.localStorage.getItem("user"));
    stripePayment(selectArrayData, totalCost, currentUser._id)
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-4 shadow-xl border">
        {/* Contact Info Header */}
        {scrollDown ? (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className=" p-2 flex items-center justify-center gap-1 text-center transition-all duration-300 bg-primary/5 text-primary hover:bg-primary/80 hover:text-white rounded-lg active:scale-105"
            >
              <HeartIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              className=" p-2 flex items-center justify-center gap-1 text-center transition-all duration-300 bg-primary/5 text-primary hover:bg-primary/80 hover:text-white rounded-lg active:scale-105"
            >
              <ShareIcon className="h-4 w-4" />
            </button>
          </div>
        ) : null}
        {/* Contact Info Main */}
        {scrollDown ? (
          <div className="mt-6">
            <div className="mx-auto max-w-xs mb-6">
              <h5 className="text-center text-xl font-semibold">
                {selectArrayData.length > 0
                  ? "Services Selected"
                  : "Please select a service"}
              </h5>
            </div>
            <div>
              <ul className="space-y-3 text-sm max-h-53 overflow-y-auto">
                {selectArrayData.map((item, index) => (
                  <li key={index}>
                    <div className="flex gap-2 cursor-pointer">
                      <span className="flex mr-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-5"
                          onClick={() => {
                            setSelectArrayData(
                              selectArrayData.filter((item, i) => i !== index)
                            );
                            setServicesAddedIndexes((prev) =>
                              prev.filter(
                                (service, i) => service !== item.serviceIndex
                              )
                            );
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>

                        {item.name}
                      </span>
                      <span
                        className={`font-bold flex ${
                          showDetailsIndex === index ? "open" : ""
                        }`}
                      >
                        £{item.price + otherFee}
                        <span
                          className={"arrow-icon ml-1"}
                          onClick={() =>
                            setShowDetailsIndex(
                              showDetailsIndex === index ? -1 : index
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`h-5 w-6 transition ease-in duration:400 ${
                              showDetailsIndex === index ? "rotate-180" : ""
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </span>
                    </div>
                    <div
                      className={`details ${
                        showDetailsIndex === index ? "open" : ""
                      } transition-all`}
                      style={{
                        maxHeight: showDetailsIndex === index ? "100px" : "0",
                        opacity: showDetailsIndex === index ? 1 : 0,
                        overflow: "hidden",
                      }}
                    >
                      <ol className="space-y-2 mt-3 pt-3 border-t border-gray-300">
                        <li>
                          <div className="flex gap-2">
                            <span className="mr-auto">Base fee</span>
                            <span className="font-bold">£ {item.price}</span>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-2">
                            <span className="mr-auto">Other fee</span>
                            <span className="font-bold">£{otherFee}</span>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-gray-300">
                <div className="flex gap-2">
                  <span className="mr-auto">Booking fee</span>
                  <span className="font-bold">
                    £ {selectArrayData.length > 0 ? bookingFee : 0}
                  </span>
                </div>

                <div className="flex gap-2 text-base">
                  <span className="font-bold mr-auto">Total</span>
                  <span className="font-bold">
                    £ {selectArrayData.length > 0 ? totalCost : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Contact Info Footer */}
        <div
          className={`${
            scrollDown ? "mt-3 pt-4 border-t border-gray-300" : null
          }`}
        >
          <div className="flex gap-2">
            <TelButton
              phoneNumber="000111000"
              onClick={() => {
                setShowChat(true);
              }}
            />
            {/* <a
              href="mailto:liteJob@info.com"
              className="w-full p-2 flex items-center justify-center gap-1  text-center transition-all duration-300 bg-primary/5 text-primary hover:bg-primary/80 hover:text-white rounded-lg active:scale-105"
            >
              <MailIcon className="h-4 w-4" />
              <span className="text-sm font-semibold capitalize">
                Email Business
              </span>
            </a> */}
          </div>
          <div className="mt-2">
            {/* <Elements stripe={stripePromise}> */}
            {/* <form onSubmit={handleSubmit}>
              <CardElement />
              <button
                type="button"
                className="w-full p-2 transition-all duration-300 bg-primary hover:bg-opacity-70 text-white rounded-lg active:scale-105"
              >
                <span className="text-sm font-semibold capitalize">
                  Purchase
                </span>
              </button>
              {paymentError && <div>{paymentError}</div>}
              {paymentSuccess && <div>{paymentSuccess}</div>}
            </form> */}
            {/* </Elements> */}
            {/* <button
              onClick={handleClick}
              type="button"
              className="w-full p-2 transition-all duration-300 bg-primary hover:bg-opacity-70 text-white rounded-lg active:scale-105"
            >
              <span className="text-sm font-semibold capitalize">Purchase</span>
            </button> */}
            {/* <form action="http://localhost:5500/api/v1/payment/" method="POST"> */}
            <button
              onClick={handleCheckout}
              type="submit"
              className="w-full p-2 transition-all duration-300 bg-primary hover:bg-opacity-70 text-white rounded-lg active:scale-105"
             
            >
              <span className="text-sm font-semibold capitalize">Purchase</span>
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
      {/* == */}
    </>
  );
};

export default BusinessContactInfo;
