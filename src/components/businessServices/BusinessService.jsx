import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../landingPage/Navbar";
import BusinessContactInfo from "./BusinessContactInfo";
import RatingComponent from "../RatingComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { StarIcon } from "@heroicons/react/solid";
import { getBusinessServices } from "../../functions/services";
import {
  createBusinessReview,
  deleteBusinessReview,
  editBusinessReview,
  getBusinessServicesReviews,
} from "../../functions/reviews";

import { ArrowRightIcon, CheckIcon } from "@heroicons/react/solid";
import ChatBox from "./ChatBox";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51NbrWIHsKur4dQkYbK9vEZUJmc3zhItCCk0aqA3hUv1JDwEItgkuom2rdmooc3FXNPbgFPo8KYm26U0wEauG17Mr00tFtlqc2o"
);
import { useSelector } from "react-redux";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";


const BusinessService = () => {
  const params = useParams();
  const [showContactInfo, setShowContactInfo] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [reviews, setreviews] = useState([]);
  const [cumulativeRating, setCumulativeRating] = useState(0);
  const [data, setData] = useState(null);
  const [selectArrayData, setSelectArrayData] = useState([]);
  const [servicesAddedIndexes, setServicesAddedIndexes] = useState([]);
  const [avgPrices, setAvgPrices] = useState([]);
  const location = useLocation();
  const starsQuantity = new Array(5).fill(0);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [rating, setRating] = useState(5);
  const [reviewBody, setReviewBody] = useState("");
  const [reviewEditIndex, setReviewEditIndex] = useState(-1);
  const [reviewEditContent, setReviewEditContent] = useState("");
  // const user = JSON.parse(localStorage.getItem("user"));

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };
  

  const navigate = useNavigate();

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Array of month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract date components
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format the date
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  }

  const reformatFetchedReviews = (reviews) => {
    return reviews.map((review) => {
      setCumulativeRating(cumulativeRating + review.rating);
      return {
        id: review.id,
        content: review.review,
        date: formatDate(review.createdAt),
        datetime: review.createdAt,
        author: review.user.FirstName + " " + review.user.LastName,
        userId: review.user.id,
        avatarSrc:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
      };
    });
  };

  const handleReviewSubmit = () => {
    const data = {
      review: reviewBody,
      rating: rating === 5 ? 1 : starsQuantity - rating + 1,
      business: params.id,
      user: JSON.parse(localStorage.getItem("user")).id,
    };
    createBusinessReview(data)
      .then((res) => {
        const data = res.data.data.data;
        setreviews([
          ...reviews,
          {
            id: data.id,
            content: data.review,
            date: formatDate(data.createdAt),
            datetime: data.createdAt,
            author: user.FirstName + " " + user.LastName,
            userId: data.user,
            avatarSrc:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
          },
        ]);
        setReviewBody("");
      })
      .catch((err) => {
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleReviewEdit = (id, rating) => {
    const data = {
      review: reviewEditContent,
      rating: rating === 5 ? 1 : starsQuantity - rating + 1,
      business: params.id,
      user: JSON.parse(localStorage.getItem("user")).id,
    };
    editBusinessReview(id, data)
      .then((res) => {
        setreviews(
          reviews.map((review) => {
            if (review.id === id) {
              review.content = reviewEditContent;
            }
            return review;
          })
        );
        toast.success("Review Edited Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log("errrr", err);
      });
    setReviewEditIndex(-1);
  };

  const handleDeleteReview = (id) => {
    deleteBusinessReview(id)
      .then((res) => {
        setreviews(reviews.filter((review) => review.id !== id));
        toast.success("Review Deleted Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {});
  };

  const submitReviews = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    const formData = {
      business: localStorage.getItem("businessId"),
      user: localStorage.getItem("id"),
      review: reviewBody,
      rating: rating,
    };
    try {
      //  Send a POST request to the server with the form data
      const response = await fetch("http://localhost:5500/api/v1/reviews", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //  If the response is OK, show a success message
      if (response) {
        alert("Review submitted");
        setReviewBody("");
        navigate("/")
      } else {
        //  Otherwise, show an error message
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   fetchedBusinessServices();
  //   fetchReviews();
  // }, []);

  // const fetchedBusinessServices = () => {
  //   getBusinessServices(params.id)
  //     .then((res) => {
  //       // let avgPrice = [];
  //       setData(res.data.data.data);
  //       // res.data.data.data.map((res) => {
  //       //   avgPrice.push(res.price);
  //       // });
  //       // setAvgPrices(...avgPrices, avgPrice);
  //     })
  //     .catch((err) => {
  //       console.log("errrr", err);
  //     });
  // };

  // const fetchReviews = () => {
  //   getBusinessServicesReviews(params.id)
  //     .then((res) => {
  //       setreviews(reformatFetchedReviews(res.data.data.data));
  //     })
  //     .catch((err) => {
  //       console.log("errrr", err);
  //     });
  // };

  useEffect(() => {
    const handleScroll = () => {
      const servicesSectionOffsetTop =
        document.querySelector(".reviews-section").offsetTop;

      setShowContactInfo(window.pageYOffset < servicesSectionOffsetTop);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove scroll event listener on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onHandleSelect = (data, index) => {
    setSelectArrayData([...selectArrayData, data]);
    setServicesAddedIndexes([...servicesAddedIndexes, index]);
  };

  useEffect(() => {
    console.log("selectArrayData", selectArrayData);
  }, [selectArrayData]);

  const GiveRatingComponent = () => {
    return (
      <div className="flex justify-center py-10">
        {starsQuantity.map((star, index) => (
          <StarIcon
            key={index}
            onClick={() => handleRating(index + 1)}
            className={`peer ${
              rating >= index + 1 ? "fill-yellow-500" : "fill-gray-500"
            } peer-hover:fill-yellow-500 hover:fill-yellow-500 w-6 h-6 mr-0.5 order-${
              index + 1
            }}`}
          />
        ))}
      </div>
    );
  };
  

  return (
    <main className="bg-white relative">
      <div className="max-w-[1500px] px-6 mx-auto">
        <Navbar />
      </div>

      <section className="bg-primary text-white py-10">
        <div className="max-w-[1500px] px-6 mx-auto">
          <div className="text-center">
            <h1 className="mb-2 font-bold text-xl md:text-3xl">
              {location?.state?.title}
            </h1>
            <h4 className="font-medium text-base md:text-xl text-gray-300">
              {location?.state?.summary}
            </h4>
          </div>
        </div>
      </section>
      <section className="my-14">
        <div className="max-w-[1500px] px-6 mx-auto">
          <div className="flex flex-wrap flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="services-section">
                <h5 className="mb-6 text-xl md:text-2xl font-semibold">
                  Please select a service
                </h5>
                <ul className="divide-y-2">
                  {data?.map((item, index) => (
                    <li key={`service-${index}`}>
                      <div className="flex gap-3 my-2">
                        <div className="max-w-sm mr-auto">
                          <h6 className="text-base xl:text-lg font-semibold mb-2">
                            {item?.name}
                          </h6>
                          <p className="text-xs sm:text-sm xl:text-base">
                            {item?.description}
                          </p>
                        </div>
                        <div className="w-[7rem] min-w-[7rem] h-[7rem] md:w-[10rem] md:min-w-[10rem] md:h-[10rem] rounded-md group bg-gray-50 mb-2">
                          <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            navigation
                            pagination={{
                              clickable: true,
                              dynamicBullets: true,
                            }}
                            modules={[Pagination, Navigation]}
                            className="card-swiper"
                          >
                            {item?.images.map((image, imageIndex) => (
                              <SwiperSlide key={`image-${imageIndex}`}>
                                <div className="w-[7rem] min-w-[7rem] h-[7rem] md:w-[10rem] md:min-w-[10rem] md:h-[10rem] rounded-md bg-gray-50">
                                  <img
                                    className="block h-full w-full rounded-md"
                                    src={image}
                                    alt={`Service ${index + 1} - Image ${
                                      imageIndex + 1
                                    }`}
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </div>
                      <div className="flex items-center justify-between flex-wrap gap-3 my-2">
                        <div>
                          <span className="text-sm text-gray-500 font-medium mr-1">
                            Total
                          </span>
                          <span className="text-lg text-primary font-bold">
                            £{item.price}
                          </span>
                        </div>
                        <div>
                          <button
                            type="button"
                            disabled={servicesAddedIndexes.includes(index)}
                            className="w-full py-2 px-4 transition-all duration-300 flex justify-between items-center gap-1 bg-primary hover:bg-opacity-70 text-white rounded-lg active:scale-105"
                            onClick={() => {
                              if (!servicesAddedIndexes.includes(index)) {
                                onHandleSelect(
                                  { ...item, serviceIndex: index },
                                  index
                                );
                              }
                            }}
                          >
                            <span className="text-sm font-semibold capitalize">
                              {servicesAddedIndexes.includes(index)
                                ? "Added"
                                : "Select"}
                            </span>
                            {servicesAddedIndexes.includes(index) ? (
                              <CheckIcon className="h-4 w-4" />
                            ) : (
                              <ArrowRightIcon className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reviews-section mt-10">
                {reviews.length > 0 && (
                  <div className="flex gap-1">
                    <RatingComponent
                      size="1.25rem"
                      rating={cumulativeRating / reviews.length}
                    />
                    <span className="text-xl font-semibold">
                      {reviews.length}{" "}
                      {reviews.length === 1 ? "Review" : "Reviews"}
                    </span>
                  </div>
                )}
                <ul>
                  {reviews.map((review, reviewIdx) => (
                    <li
                      key={`review-${reviewIdx}`}
                      className="flex space-x-4 text-sm text-gray-500"
                    >
                      <div className="flex-none py-10">
                        <img
                          src={review.avatarSrc}
                          alt=""
                          className="h-10 w-10 rounded-full bg-gray-100"
                        />
                      </div>
                      <div
                        className={`${
                          reviewIdx === 0 ? "" : "border-t border-gray-200"
                        } flex-1 py-10`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">
                            {review.author}
                          </h3>
                          {reviewEditIndex === reviewIdx ? (
                            <button
                              onClick={() => handleReviewEdit(review.id)}
                              className=" w-44 mt-3 p-2 font-semibold transition-all duration-300 bg-primary hover:bg-opacity-70 text-white rounded-lg active:scale-105"
                            >
                              Submit
                            </button>
                          ) : (
                            review?.userId === user?.id && (
                              <div className="flex gap-3 items-center justify-start">
                                <PencilIcon
                                  className="h-6 cursor-pointer hover:text-primary"
                                  onClick={() => {
                                    setReviewEditIndex(reviewIdx);
                                    setReviewEditContent(review.content);
                                  }}
                                />
                                <TrashIcon
                                  className="h-6 cursor-pointer hover:text-red-500"
                                  onClick={() => {
                                    handleDeleteReview(review.id);
                                  }}
                                />
                              </div>
                            )
                          )}
                        </div>
                        {reviewEditIndex === reviewIdx ? (
                          <div>
                            <textarea
                              required
                              rows="4"
                              value={reviewEditContent}
                              onChange={(e) =>
                                setReviewEditContent(e.target.value)
                              }
                              className="w-full p-2 mt-2 border-2 border-gray-300 rounded-lg"
                            />
                          </div>
                        ) : (
                          <div>
                            <p>
                              <time dateTime={review.datetime}>
                                {review.date}
                              </time>
                            </p>
                            <div
                              className="prose prose-sm mt-4 max-w-none text-gray-500"
                              dangerouslySetInnerHTML={{
                                __html: review.content,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {isLoggedIn && (
                <div className="abouthost-section mt-10">
                  <div className=" flex justify-between items-center">
                    <h5 className="text-xl md:text-2xl font-semibold">
                      Add a Review
                    </h5>
                    <GiveRatingComponent />
                  </div>
                  <form>
                    <textarea
                      required
                      rows="4"
                      value={reviewBody}
                      onChange={(e) => setReviewBody(e.target.value)}
                      placeholder="Message"
                      className="w-full rounded-md border-gray-300 focus:border-primary"
                    />
                  </form>
                  <button
                    onClick={submitReviews}
                    className=" w-44 mt-3 p-2 font-semibold transition-all duration-300 bg-primary hover:bg-opacity-70 text-white rounded-lg active:scale-105"
                  >
                    Submit
                  </button>
                </div>
              )}
              <div className="abouthost-section mt-10 max-w-lg">
                <h5 className="mb-6 text-xl md:text-2xl font-semibold">
                  About the host
                </h5>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-none">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                      alt="...."
                      className="h-16 w-16 rounded-full bg-gray-100"
                    />
                  </div>
                  <h3 className="font-medium text-xl">
                    Quickest Electrician In Town ltd
                  </h3>
                </div>
                {/* <form>
                  <textarea
                    required
                    rows="4"
                    placeholder="Message"
                    className="w-full rounded-md border-gray-300 focus:border-primary"
                  />
                </form>
                <button
                  type="submit"
                  className="w-full mt-3 p-2 font-semibold transition-all duration-300 bg-primary hover:bg-opacity-70 text-white rounded-lg active:scale-105"
                >
                  Send
                </button> */}
              </div>
            </div>
            <div className="md:min-w-[23.5rem] order-first lg:order-last">
              <div className="sticky top-4">
                {showChat ? (
                  <ChatBox
                    setShowChatBox={setShowChat}
                    businessName={location?.state?.title}
                  />
                ) : (
                  <Elements stripe={stripePromise}>
                    <BusinessContactInfo
                      scrollDown={showContactInfo}
                      selectArrayData={selectArrayData}
                      setSelectArrayData={setSelectArrayData}
                      servicesAddedIndexes={servicesAddedIndexes}
                      setServicesAddedIndexes={setServicesAddedIndexes}
                      setShowChat={setShowChat}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BusinessService;
