import React, { useState, useEffect } from "react";
import { Button, Img, Text, Heading, RatingBar } from "../../components";
import DesktopNineColumnbob from "../../components/DesktopNineColumnbob";
import Footer from "../../components/Footer";
import Navbar from "../../components/landingPage/Navbar";
import { portfolioData } from "../../constants";
import Box from "@mui/material/Box";

//images
import heart from "../../assets/heart.svg";
import share from "../../assets/share.svg";
import phone from "../../assets/phone.svg";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import useServiceDataFetching from "../../hooks/serviceHook";
import useReviewsDataFetching from "../../hooks/reviewsHook";
import { useStripeCheckout } from "../../hooks/stripeHook";
import { addService, removeService } from "../../redux/slices/cart";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slices/auth";
import Chats from "../Chats";
import { Modal } from "@mui/material";
import ChatBox from "../../components/businessServices/ChatBox";
import { Link } from "react-router-dom";
import { API_Endpoint_Image } from "../../components/API";

export default function Electrician() {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [isOpen, setIsOpen] = useState(false);
  const [isMessageClicked, setIsMessageClicked] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [services, setServices] = useState([]);
  // const [selectedService, setSelectedService] = useState(null);
  const selectedServices = useSelector((state) => state.selectedServices);
  const businessId = useSelector((state) => state.business.id);
  const businessTitle = useSelector((state) => state.business.title);
  const businessDesc = useSelector((state) => state.business.desc);
  const businessRating = useSelector((state) => state.business.rating);
  const businessCity = useSelector((state) => state.business.businessCity)
  const businessPhoneNumber = useSelector((state) =>
    state.business.businessAuth && state.business.businessAuth[0]
      ? state.business.businessAuth[0].BusinessPhoneNumber
      : null
  );

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const dispatch = useDispatch();

  let title = "";
  let desc = "";

  const totalPrice = selectedServices.reduce(
    (total, service) => total + service.totalPrice,
    0
  );

  const handleSelect = (service) => {
    dispatch(
      addService({
        id: service._id,
        name: service.name,
        price: service.price,
      })
    );
    // setSelectedService(prevService => [...prevService, service]);
  };

  const handlePurchase = useStripeCheckout(
    totalPrice,
    selectedServices,
    businessId,
    businessCity
  );

  const loadMoreReviews = () => {
    setVisibleCount(visibleCount + 3);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(2); // Set slidesPerView to 2 for small screens
      } else {
        setSlidesPerView(4); // Set slidesPerView to 4 for larger screens
      }
    };

    window.addEventListener("resize", handleResize); // Add event listener for window resize

    // Call handleResize initially to set the initial value based on screen size
    handleResize();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); //

  const { serviceData, error } = useServiceDataFetching(
    `http://localhost:5500/api/v1/service/${businessId}?timestamp=${new Date().getTime()}`
  );

  const { reviewsData, reviewsLoading, reviewsError } = useReviewsDataFetching(
    `http://localhost:5500/api/v1/reviews/${businessId}`
  );

  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  if (reviewsData && reviewsData.data) {
    reviewsData.data.forEach((review) => {
      ratingCounts[review.rating]++;
    });
  }

  // Calculate the total number of reviews
  let totalReviews = 0; // Declare totalReviews outside of the if block

  if (reviewsData && reviewsData.data) {
    totalReviews = reviewsData.data.length; // Assign a value inside the if block
  }

  // Now totalReviews is accessible here
  const ratingWidths = {
    1: (ratingCounts[1] / totalReviews) * 100,
    2: (ratingCounts[2] / totalReviews) * 100,
    3: (ratingCounts[3] / totalReviews) * 100,
    4: (ratingCounts[4] / totalReviews) * 100,
    5: (ratingCounts[5] / totalReviews) * 100,
  };

  useEffect(() => {
    if (serviceData && serviceData.data) {
      let extractedIds = [];
      if (Array.isArray(serviceData.data.data)) {
        extractedIds = serviceData.data.data.map((item) => item);
      } else {
        // If data.data is not an array, treat it as a single object and extract its _id
        extractedIds.push(serviceData.data._id);
      }
      setServices(extractedIds);
    }
  }, [serviceData]);

  const handleClick = (index) => {
    setIsOpen(index === isOpen ? false : index);
  };

  const handleMessageClick = () => {
    setIsMessageClicked(!isMessageClicked);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start w-full bg-white-A700">
        <div className="flex flex-col items-center justify-start w-full gap-[119px] px-[30px] py-[10px] lg:px-[40px] lg:py-[20px] bg-[#D0E1F4]">
          <header className="justify-between w-full">
            <Navbar />
          </header>
          <div className="flex flex-col items-center justify-start w-full mb-[115px] gap-[13px]">
            <h1 className="lg:text-[40px] text-[30px] font-[700] text-center">
              {businessTitle}
            </h1>
            <p className="text-[20px] font-[400] text-center">{businessDesc}</p>
          </div>
        </div>
        <div className="flex padding-md flex-row justify-center items-start w-full gap-10 2xl:px-[80px] px-[24px] lg:py-[40px] py-[16px] bg-white">
          <div className="flex width-md flex-col items-start justify-start 2xl:w-[62%] w-full gap-[39px]">
            <div className="flex flex-col items-start justify-start w-full gap-[22px]">
              <h2 className="text-[28px] font-[700]">
                Please select a service
              </h2>
              {services.map((service) => (
                <div key={service._id} className="flex flex-col w-full gap-10">
                  <div className="flex flex-col items-center justify-start w-full pb-[23px] gap-3 border-gray-200 border-b border-solid">
                    <div className="flex lg:flex-row flex-col-reverse justify-start w-full gap-3">
                      <div className="flex flex-col items-start justify-start lg:w-3/4 w-full pt-[3px] gap-[9px]">
                        <h3 className="text-[20px] font-[700]">
                          {service.name}
                        </h3>
                        <p className="text-[14px] font-[400] text-[#5A6A73]">
                          {service.description}
                        </p>
                      </div>
                      <div className="lg:h-[150px] h-[320px] lg:w-[24%] w-full relative">
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={30}
                          loop={true}
                          pagination={{
                            clickable: true,
                          }}
                          navigation={true}
                          modules={[Pagination, Navigation]}
                          className="mySwiper"
                        >
                          {service?.images?.map((imageUrl, index) => {
                            // Replace backslashes with forward slashes
                            const formattedUrl = imageUrl.replace(/\\/g, "/");
                            return (
                              <SwiperSlide key={index}>
                                <img
                                  className="w-[200px] h-[150px] rounded-[20px]"
                                  src={`http://localhost:5500/${formattedUrl}`}
                                  alt=""
                                />
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                        <button
                          onClick={() => handleSelect(service)}
                          className="w-full hidden lg:block bg-[#037783] text-white rounded-[8px] px-[24px] py-[8px] mt-3"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                      <h4 className=" text-[20px] font-bold mt-[10px] lg:mt-[0px]">
                        <span className="text-[14px] font-400]">Total</span> £
                        {service.price}
                      </h4>
                      <button
                        onClick={() => handleSelect(service)}
                        className="w-[192px] block lg:hidden bg-[#037783] text-white rounded-[8px] px-[24px] py-[8px] mt-3"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-start w-full gap-[35px] bg-white-A700">
              <div className="flex flex-row justify-start w-full">
                <Heading as="h5" className="!text-blue_gray-900_02">
                  Frequently Asked Questions
                </Heading>
              </div>
              <div className="flex flex-col w-full gap-2">
                <button
                  className={`w-full p-4 rounded-lg hover:bg-gray-100 ${
                    isOpen === 1 ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleClick(1)}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-[24px] font-[500]">
                      Question text goes here
                    </p>
                    <svg
                      className={`transform transition duration-200 ${
                        isOpen === 1 ? "rotate-180" : ""
                      }`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 9L12 16L5 9"
                        stroke="#475569"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className={`mt-2 text-gray-500 ${
                      isOpen === 1 ? "" : "hidden"
                    }`}
                  >
                    LiteJob operates exclusively within the United Kingdom. If a
                    professional or business is listed in your city or nearby
                    areas on our platform, their services are available to you.
                    We are continuously working to expand our reach to include
                    more cities and regions within the UK, providing
                    comprehensive coverage for everybody's needs.
                  </p>
                </button>
                <button
                  className={`w-full p-4 rounded-lg hover:bg-gray-100 ${
                    isOpen === 2 ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleClick(2)}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-[24px] font-[500]">
                      Question text goes here
                    </p>
                    <svg
                      className={`transform transition duration-200 ${
                        isOpen === 2 ? "rotate-180" : ""
                      }`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 9L12 16L5 9"
                        stroke="#475569"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className={`mt-2 text-gray-500 ${
                      isOpen === 2 ? "" : "hidden"
                    }`}
                  >
                    Question text goes here
                  </p>
                </button>

                {/* Add more FAQ buttons here following the same structure */}
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full gap-[37px] bg-white-A700">
              <div className="flex flex-row justify-between items-center w-full pt-0.5">
                <Heading as="h6" className="!text-blue_gray-900_02">
                  Portfolio
                </Heading>
                <a href="#">
                  <Text as="p" className="!text-blue-A700 text-right underline">
                    view all
                  </Text>
                </a>
              </div>
              <div className="flex flex-row w-full gap-6">
                <Swiper
                  slidesPerView={slidesPerView}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {portfolioData.map((portfolio) => (
                    <SwiperSlide
                      key={portfolio.id}
                      className="w-[218px] h-[240px]"
                    >
                      <img
                        src={portfolio.img}
                        alt=""
                        className="w-[218px] h-[240px]"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full gap-[21px]">
              <div className="flex flex-col items-start justify-start w-full gap-[18px]">
                <div className="flex flex-row justify-between gap-10">
                  <Heading as="h4" className="!text-blue_gray-900_02">
                    Reviews
                  </Heading>
                  <div className="flex lg:hidden items-center justify-center w-full gap-[15px]">
                    <Heading size="sm" as="h3">
                      {businessRating}
                    </Heading>
                    <RatingBar
                      value={4}
                      starCount={businessRating}
                      isEditable={true}
                      color="#fcbc45"
                      activeColor="#fcbc45"
                      size={16}
                      className="flex justify-between w-[80px] rounded-[1px]"
                    />
                    <p className="text-[10px] font-[400]">
                      {totalReviews} reviews
                    </p>
                  </div>
                </div>
                <div className="flex flex-row lg:justify-start md:justify-between items-start w-full">
                  <div className="lg:flex flex-col items-start hidden justify-start w-[22%] mt-0.5 gap-[3px]">
                    <Heading size="xl" as="h3">
                      {businessRating}
                    </Heading>
                    <RatingBar
                      value={5}
                      starCount={businessRating}
                      isEditable={true}
                      color="#fcbc45"
                      activeColor="#fcbc45"
                      size={24}
                    />
                    <Text size="lg" as="p">
                      {totalReviews} reviews
                    </Text>
                  </div>
                  <div className="lg:flex flex-col w-[360px] gap-2.5 hidden">
                    <div className="flex flex-row justify-center items-center w-[98%] mr-[7px]">
                      <Text size="xs" as="p">
                        5 Stars
                      </Text>
                      <div className="h-3.5 w-[71%] ml-[27px] bg-gray-200 relative rounded-[7px]">
                        <div
                          style={{ width: `${ratingWidths[5]}%` }}
                          className="h-full border-orange-300 border bg-orange-300 absolute rounded-[7px]"
                        />
                      </div>
                      <Text size="xs" as="p" className="ml-5">
                        {ratingCounts[5]}
                      </Text>
                    </div>

                    <div className="flex flex-row justify-center items-center w-[99%] mr-1">
                      <Text size="xs" as="p">
                        4 Stars
                      </Text>
                      <div className="h-3.5 w-[70%] ml-[26px] bg-gray-200 relative rounded-[7px]">
                        <div
                          style={{ width: `${ratingWidths[4]}%` }}
                          className="h-full border-orange-300 border bg-orange-300 absolute rounded-[7px]"
                        />
                      </div>
                      <Text size="xs" as="p" className="ml-5">
                        {ratingCounts[4]}
                      </Text>
                    </div>
                    <div className="flex flex-row justify-center items-center w-[98%] mr-[7px]">
                      <Text size="xs" as="p">
                        3 Stars
                      </Text>
                      <div className="h-3.5 w-[71%] ml-[27px] bg-gray-200 relative rounded-[7px]">
                        <div
                          style={{ width: `${ratingWidths[3]}%` }}
                          className="h-full border-orange-300 border bg-orange-300 absolute rounded-[7px]"
                        />
                      </div>
                      <Text size="xs" as="p" className="ml-5">
                        {ratingCounts[3]}
                      </Text>
                    </div>

                    <div className="flex flex-row justify-center items-center w-[98%] mr-[7px]">
                      <Text size="xs" as="p">
                        2 Stars
                      </Text>
                      <div className="h-3.5 w-[71%] ml-[27px] bg-gray-200 relative rounded-[7px]">
                        <div
                          style={{ width: `${ratingWidths[2]}%` }}
                          className="h-full border-gray-200 border bg-gray-200 absolute rounded-[7px]"
                        />
                      </div>
                      <Text size="xs" as="p" className="ml-5">
                        {ratingCounts[2]}
                      </Text>
                    </div>
                    <div className="flex flex-row justify-center items-center w-[98%] mr-[7px]">
                      <Text size="xs" as="p">
                        1 Stars
                      </Text>
                      <div className="h-3.5 w-[71%] ml-[30px] bg-gray-200 relative rounded-[7px]">
                        <div
                          style={{ width: `${ratingWidths[1]}%` }}
                          className="h-full border-gray-200 border bg-gray-200 absolute rounded-[7px]"
                        />
                      </div>
                      <Text size="xs" as="p" className="ml-5">
                        {ratingCounts[1]}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-6">
                {reviewsData &&
                  reviewsData.data &&
                  reviewsData.data
                    .slice(0, visibleCount)
                    .map((review) => (
                      <DesktopNineColumnbob
                        key={review.id}
                        firstName={review.user.FirstName}
                        lastName={review.user.LastName}
                        rating={review.rating}
                        review={review.review}
                        createdAt={review.createdAt}
                        className="flex flex-col items-center justify-start w-full gap-3"
                      />
                    ))}
              </div>
            </div>
            {reviewsData && visibleCount < (reviewsData.data?.length || 0) && (
              <Button
                size="2xl"
                variant="outline"
                shape="round"
                className="font-medium min-w-[210px]"
                onClick={loadMoreReviews}
              >
                Show Next 10 reviews
              </Button>
            )}

            <div className="bg-white rounded-lg flex flex-col lg:px-4">
              <h2 className="text-[24px] font-[700] mb-2">About the host</h2>

              <div className="flex items-center mb-4 mt-4 gap-4">
                <img
                  src="https://i.imgur.com/fRjBY2Z.jpg" // Replace with your image path
                  alt="Profile picture"
                  className="w-[48px] h-[48px] rounded-full"
                />
                <div>
                  <h2 className="text-[16px] font-[700] text-gray-900 mb-1">
                    Bob parkson
                  </h2>
                  <p className="text-gray-600 text-sm">Joined in Jan 2024</p>
                </div>
              </div>
              <div className="flex flex-col justify-between text-gray-700 mb-4">
                <div className="flex gap-4">
                  <p className="font-bold">Response Rate: 88%</p>
                  <p className="font-bold"> Response Time: within a day</p>
                </div>
                <div className="flex gap-4">
                  <p>170 Reviews</p>
                  <p>Identity Verified</p>
                </div>
                <button className="text-gray-200 bg-[#037783] w-[240px] h-[44px] mt-3 rounded-[8px]">
                  Message host
                </button>
              </div>
            </div>
          </div>
          <div className="sticky hidden hiddem-md 2xl:flex flex-col items-center justify-center w-[400px] mr-10 gap-[22px] p-[24px] border-blue_gray-100 border border-solid bg-white-A700 shadow-sm rounded-[16px]">
            <div className="flex  flex-row justify-between items-center w-full">
              <Heading as="h2">Selected Service</Heading>
              <div className="flex flex-row justify-start gap-2">
                <button className="w-[24px] h-[24px]">
                  <img className="w-[24px] h-[24px]" src={heart} />
                </button>
                <button className="w-[24px] h-[24px]">
                  <img className="w-[24px] h-[24px]" src={share} />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-[98%] gap-3">
              <div className="flex flex-col justify-between w-full border-gray-300 border-b border-solid">
                {selectedServices.length > 0 ? (
                  selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between mt-px mb-[5px]"
                    >
                      <Text as="p" className="!text-gray-800">
                        {service.name} x {service.quantity}
                      </Text>
                      <div className="flex gap-2">
                        <Text as="p" className="!text-gray-800">
                          £{service.totalPrice}
                        </Text>
                        <button
                          className=" text-[12px] text-slate-900 p-1 rounded-md"
                          onClick={() => dispatch(removeService(service.id))}
                        >
                          <img className="w-4 h-4" src="/recycle.png" alt="" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <Text as="p" className="mt-px mb-[5px] !text-gray-800">
                    Select services
                  </Text>
                )}
              </div>

              <div className="flex flex-row justify-between w-full border-gray-300 border-b border-solid">
                <Text as="p" className="mb-[7px] !font-medium">
                  Total
                </Text>
                <Text as="p" className="!font-medium">
                  £{totalPrice.toFixed(2)}
                </Text>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full mb-0.5 gap-3 overflow-hidden">
              <div className="flex flex-row justify-start w-full gap-2">
                <button
                  className="gap-3 w-[170px] flex justify-center items-center bg-[#E8EFF0] text-[14px] px-[13px] py-[8px] rounded-[8px]"
                  onClick={handleMessageClick}
                >
                  {!isMessageClicked ? (
                    <>
                      <span>
                        <Img src={phone} alt="local_phone" />
                      </span>
                      <p>Call Business</p>
                    </>
                  ) : (
                    <p>{businessPhoneNumber}</p>
                  )}
                </button>
                {/* <button className="gap-3 w-[170px] flex justify-center items-center bg-[#E8EFF0] text-[13px] px-[12px] py-[8px] rounded-[8px]">
                  <span>
                    <Img src={email} alt="email" />
                  </span>
                  <p className="text-[12px]">Message Business</p>
                </button> */}
                {!isLoggedIn ? (
                  <button className="gap-3 w-[170px] flex justify-center items-center bg-[#E8EFF0] text-[13px] px-[12px] py-[8px] rounded-[8px]">
                    Login to open chat
                  </button>
                ) : (
                  <button
                    className="gap-3 w-[170px] flex justify-center items-center bg-[#E8EFF0] text-[13px] px-[12px] py-[8px] rounded-[8px]"
                    onClick={handleOpen}
                  >
                    Open Chat
                  </button>
                )}
              </div>
              <Button
                size="3xl"
                shape="round"
                className={`w-full font-medium ${
                  !isLoggedIn || totalPrice === 0
                    ? "bg-gray-300 text-gray-500"
                    : "bg-[#037783] text-white"
                }`}
                onClick={handlePurchase}
                disabled={!isLoggedIn || totalPrice === 0} // Disable button if user is not logged in or totalPrice is 0
              >
                Purchase
              </Button>
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="w-full flex flex-col justify-center items-center">
              <ChatBox />
            </div>
          </Box>
        </Modal>
        <Footer className="flex lg:justify-center lg:items-center w-full lg:px-[80px] px-[16px] lg:py-[80px] py-[40px] bg-white" />
        <div className="flex sticky-md sticky bottom-0 h-full flex-col 2xl:hidden 4xl:hidden 5xl:hidden justify-between items-center p-4 w-full bg-white">
          <div className="flex flex-col justify-between w-full border-gray-300 border-b border-solid">
            {selectedServices.length > 0 ? (
              selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between mt-px mb-[5px]"
                >
                  <Text as="p" className="!text-gray-800">
                    {service.name} x {service.quantity}
                  </Text>
                  <div className="flex gap-2">
                    <Text as="p" className="!text-gray-800">
                      £{service.totalPrice}
                    </Text>
                    <button
                      className="text-[12px] text-slate-900 p-1 rounded-md"
                      onClick={() => dispatch(removeService(service.id))}
                    >
                      <img className="w-4 h-4" src="/recycle.png" alt="" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <Text as="p" className="mt-px mb-[5px] !text-gray-800">
                Select services
              </Text>
            )}
          </div>
          <div className="parent-width-md flex space-x-4 justify-between mt-2">
            <button
              className="gap-3 w-[170px] flex justify-center items-center bg-[#E8EFF0] text-[12px] px-[13px] py-[8px] rounded-[8px]"
              onClick={handleMessageClick}
            >
              {!isMessageClicked ? (
                <>
                  <span>
                    <Img src={phone} alt="local_phone" />
                  </span>
                  <p>Call Business</p>
                </>
              ) : (
                <p>{businessPhoneNumber}</p>
              )}
            </button>
            {/* <button className="gap-3 w-[170px] flex justify-center items-center bg-[#E8EFF0] text-[12px] px-[12px] py-[8px] rounded-[8px]">
              <span>
                <Img src={email} alt="email" />
              </span>
              <p>Message Business</p>
            </button> */}
            {!isLoggedIn ? (
              <button className="gap-3 w-[170px] flex justify-center items-center bg-[#E8EFF0] text-[13px] px-[12px] py-[8px] rounded-[8px]">
                Login to open chat
              </button>
            ) : (
              <button
                className="gap-3 w-[170px] flex justify-center items-center bg-[#E8EFF0] text-[13px] px-[12px] py-[8px] rounded-[8px]"
                onClick={handleOpen}
              >
                Open Chat
              </button>
            )}
          </div>
          <Button
            size="3xl"
            shape="round"
            className={`w-full font-medium mt-2 py-1 ${
              !isLoggedIn || totalPrice === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-[#037783] text-white"
            }`}
            onClick={handlePurchase}
            disabled={!isLoggedIn || totalPrice === 0} // Disable button if user is not logged in or totalPrice is 0
          >
            Purchase
          </Button>
        </div>
      </div>
    </>
  );
}
