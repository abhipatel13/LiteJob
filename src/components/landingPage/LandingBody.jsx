import { useEffect, useRef, useState } from "react";
import { Text, Button, Img, Heading, RatingBar } from "../../components";
import DesktopFourFaqsection from "../../components/DesktopFourFaqsection";
import Footer from "../../components/Footer";
import Navbar from "../../components/landingPage/Navbar";
import { homeReviews, whyChooseLiteJobData } from "../../constants";
import { GiRoad } from "react-icons/gi";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function LandingBody() {
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 768);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [city, setCity] = useState("");

  const AUTOFILL =
    "pk.eyJ1IjoidGF5eWliMTIzIiwiYSI6ImNsaTR0eGlnOTByeXQzbm53YnBjd292ZHIifQ.W8zvLNBqfsWLZ8esIltTww";
  const TOKEN =
    "pk.eyJ1IjoiaGFtemE4NDc5IiwiYSI6ImNrdDJtanNlazA3cjMybnJ6djZ4a3BjdGUifQ.FPyM33hFYLB6KipwmTDDlQ";

  const cardRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  // Calculate card height once when the component mounts
  useEffect(() => {
    if (isSmallDevice) {
      let timeoutId;

      const handleScroll = () => {
        const cardElements = document.querySelectorAll(".why-choose-card");
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const windowCenter = windowHeight / 2;

        let newIndex = -1;
        let minDistance = Infinity;
        cardElements.forEach((card, index) => {
          const { top, height } = card.getBoundingClientRect();
          const cardCenter = top + height / 2;
          const distanceToWindowCenter = Math.abs(windowCenter - cardCenter);

          // Check if the center of the card is closer to the center of the viewport
          if (distanceToWindowCenter < minDistance) {
            minDistance = distanceToWindowCenter;
            newIndex = index;
          }
        });

        // Clear any existing timeout
        clearTimeout(timeoutId);

        // Set a new timeout to update the focused index after a delay
        timeoutId = setTimeout(() => {
          setFocusedIndex(newIndex);
        }, 300); // Adjust the delay time as needed (in milliseconds)
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timeoutId); // Clear the timeout when the component unmounts
      };
    }
  }, [isSmallDevice]);

  useEffect(() => {
    if (inputValue) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              inputValue
            )}.json?access_token=${TOKEN}&autocomplete=true&types=place`
          );
          const features = response.data.features;

          setSuggestions(features);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.removeItem("searchCriteria");
    }
  }, []);

  const handleSelect = (address) => {
    setInputValue(address.place_name);
    console.log("Selected Address:", address);
    // dispatch(addFilter({ ...filter, city: address.text }));
    console.log("Coordinates:", address.center);

    // Construct the URL with the selected city and navigate
    const city = encodeURIComponent(address.place_name);
    setCity(city);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      return;
    }
    navigate(`/filter/${inputValue}`);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {/* <Helmet>
        <title>LiteJob</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet> */}
      <div className="flex flex-col items-center justify-start w-full bg-white-A700 overflow-hidden">
        <div className="lg:h-[774px] h-[580px] w-full pt-4 pl-4 bg-[#0B3E7B] relative overflow-hidden">
          <Img
            src="images/img_wepik_export_20.png"
            alt="wepikexporttwen"
            className="h-[742px] w-full lg:w-[52%] md:w-[70%] sm:w-[80%] lg:block hidden right-0 bottom-0 top-0 m-auto mt-5 object-cover absolute"
          />
          <div className="flex flex-col items-start justify-start w-[89%] lg:gap-[170px] gap-[80px] top-[2%] right-0 left-0 m-auto absolute">
            <header className="justify-between w-full">
              <Navbar />
            </header>
            <div className="flex flex-col items-start justify-start lg:w-[49%] w-full gap-[22px]">
              <div className="flex flex-row lg:justify-start">
                <h1 className="text-[#FFFFFF] lg:text-[48px] text-[35px] font-[700] leading-[60px]">
                  Top Businesses and Professionals Ready to Help
                </h1>
              </div>
              <h2 className="text-[#FFFFFF] tracking-[-0.40px] text-[20px] font-[700]">
                Compare Prices and Services in a few clicks
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex flex-row justify-between items-center w-full p-1.5 bg-white rounded-[28px]"
              >
                <input
                  placeholder="Your City"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="ml-3.5 !text-gray-400_01 !font-medium border-none outline-none w-full border-transparent"
                  style={{ outlineColor: "white" }}
                />

                <div className=" xs:hidden  lg:flex absolute left-12 mt-[220px]">
                  <ul className="bg-white">
                    {suggestions.map((address) => (
                      <li
                        className={`p-2 cursor-pointer hover:bg-primary hover:text-white flex items-center gap-2 ${
                          suggestions.length !== 1 ? "block" : "hidden"
                        }`}
                        key={address.id}
                        onClick={() => handleSelect(address)}
                      >
                        <span>
                          <GiRoad size={18} />
                        </span>
                        <span className="text-xs font-medium">
                          {suggestions.length === 1 ? "" : address.place_name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  size="3xl"
                  leftIcon={<Img src="images/img_search.svg" alt="search" />}
                  className="gap-2 font-medium w-[122px] rounded-[22px] bg-[#037783]"
                >
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full gap-[68px] lg:px-[80px] px-[16px] lg:py-[79px] py-[40px]">
            <h2 className="lg:text-[44px] lg:font-[700] text-[35px] font-[500] leading-[48px]">
              Why Choose LiteJob?
            </h2>
            <div className="flex lg:flex-row flex-col justify-start items-center w-full gap-10 max-w-7xl">
              <div className="lg:flex lg:flex-col lg1:w-[49%] lg:w-full grid grid-cols-1 gap-4 w-full lg:gap-6">
                {whyChooseLiteJobData.map((data, index) => (
                  <div
                    key={data.title}
                    ref={index === 0 ? cardRef : null}
                    className={`why-choose-card flex flex-row justify-start items-start w-full gap-6 p-[11px] border-gray-300 border border-solid cursor-pointer shadow-xs rounded-[16px]`}
                    style={{
                      backgroundColor: !isSmallDevice
                        ? ``
                        : index === focusedIndex
                        ? data.bgColor
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSmallDevice) {
                        e.currentTarget.style.backgroundColor = data.bgColor;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSmallDevice) {
                        e.currentTarget.style.backgroundColor = "";
                      }
                    }}
                  >
                    {!isSmallDevice ? (
                      <>
                        <Img
                          src={data.icon}
                          alt="userdouble_one"
                          className="h-9 w-9 mt-[3px] ml-[3px]"
                        />
                        <div className="flex flex-col items-start justify-start w-[89%] mb-[3px] mr-[3px] gap-[11px]">
                          <h2 className="text-[32px] font-[500]">
                            {data.title}
                          </h2>
                          <Text as="p">{data.desc}</Text>
                        </div>
                      </>
                    ) : (
                      <div className="rounded-[16px] p-[16px] ">
                        <div className="flex items-center gap-[24px]">
                          <div>
                            <Img
                              src={data.icon}
                              alt="userdouble_one"
                              className="h-9 w-9 mt-[3px] ml-[3px]"
                            />
                          </div>
                          <h2 className="text-[25px] font-[500]">
                            {data.title}
                          </h2>
                        </div>
                        <p className="text-[16px] font-[400] mt-[20px] w-full">
                          {data.desc}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* <Img
                src="images/img_qa_engineers_bro.svg"
                alt="qaengineers_one"
                className="lg:h-[620px] lg2:hidden xl:block hidden lg:w-[620px] h-[396px] w-[396px]"
              /> */}
              <Img
                src="images/img_qa_engineers_bro.svg"
                alt="qaengineers_one"
                className="lg:h-[620px] lg2:hidden xl:block hidden lg:w-[396px] h-[396px] w-[396px] md1:hidden"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-[30px] lg:px-[80px] px-[16px] lg:py-[80px] py-[40px] bg-[#E9F1FA]">
            <h2 className="lg:text-[40px] text-[35px] font-[500]">
              What Our Customers Say About us
            </h2>
            <div className="flex flex-row justify-center text-black items-center w-full gap-12 overflow-x-auto ">
              {/* <Img
                src="images/img_arrow_left.svg"
                alt="arrowleft_one"
                className="h-[38px] w-[38px] rounded-[50%] lg:block hidden"
              /> */}
              <div className="flex lg:flex-row flex-col lg:w-[87%] w-full gap-8">
                {homeReviews.map((review) => (
                  <>
                    {isSmallDevice && (
                      <div
                        key={review.id}
                        className="flex flex-col items-center justify-start border-1 lg:border-none border-[#ACCAEC] lg:w-[32%] w-full bg-[#DAE7F6] lg:bg-transparent mb-[30px] gap-8 rounded-[16px] lg:p-0 p-[24px]"
                      >
                        <RatingBar
                          value={5}
                          isEditable={true}
                          color="#000000"
                          activeColor="#000000"
                          size={16}
                          className="flex justify-between w-[93px]"
                        />
                        <div className="flex flex-col items-center justify-start w-full gap-8">
                          <div className="flex flex-col items-center justify-start w-full gap-[13px]">
                            <Heading size="md" as="h2" className="text-center">
                              {review.title}
                            </Heading>
                            <Text
                              size="lg"
                              as="p"
                              className="text-center text-black"
                            >
                              {review.desc}
                            </Text>
                          </div>
                          <div className="flex lg:flex-col items-center justify-center w-full gap-4">
                            <Img
                              src={review.img}
                              alt="carlos_g_one"
                              className="lg:h-[67px] lg:w-[67px] w-[32px] h-[32px] rounded-[50%]"
                            />
                            <div className="flex flex-row justify-center w-[21%]">
                              <div className="flex flex-row justify-center w-full">
                                <p className="text-[14px] font-[500]">
                                  Carlos G
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>

              {/* <Img
                src="images/img_arrow_right.svg"
                alt="arrowright_one"
                className="h-[38px] w-[38px] rounded-[50%] lg:block hidden"
              /> */}
            </div>
            <div className="hidden lg:flex justify-center items-center w-full">
              {!isSmallDevice && (
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="reviewSwiper"
                >
                  {homeReviews.map((review, idx) => (
                    <SwiperSlide key={idx} className="bg-transparent">
                      <div
                        key={review.id}
                        className="flex flex-col items-center justify-center border-1 lg:border-none border-[#ACCAEC]  w-full bg-[#DAE7F6] lg:bg-transparent mb-[100px] gap-8 rounded-[16px] lg:p-0 p-[24px]"
                      >
                        <RatingBar
                          value={5}
                          isEditable={true}
                          color="#000000"
                          activeColor="#000000"
                          size={16}
                          className="flex justify-between w-[93px]"
                        />
                        <div className="flex flex-col items-center justify-start w-full gap-8">
                          <div className="flex flex-col items-center justify-start w-full gap-[13px]">
                            <Heading
                              size="md"
                              as="h2"
                              className="text-center text-black"
                            >
                              {review.title}
                            </Heading>
                            <Text
                              size="lg"
                              as="p"
                              className="text-center text-black"
                            >
                              {review.desc}
                            </Text>
                          </div>
                          <div className="flex lg:flex-col items-center justify-center lg:h-[67px] mt-8 lg:w-[67px] w-[32px] h-[32px] gap-4">
                            <Img
                              src={review.img}
                              alt="carlos_g_one"
                              className="lg:h-[67px] lg:w-[67px] w-[32px] h-[32px] rounded-[50%]"
                            />
                            <div className="flex flex-row justify-center w-full">
                              <div className="flex flex-row justify-center w-full">
                                <p className="text-[16px] font-[500] text-black">
                                  Carlos G
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
          <DesktopFourFaqsection className="flex flex-row justify-center w-full lg:px-[80px] px-[16px] lg:py-[80px] py-[40px] bg-white" />
          <div className="flex flex-row justify-center w-full p-10 bg-[#E9F1FA]">
            <div className="lg:w-[1216px] w-[346px] lg:h-[480px] h-full flex lg:flex-row flex-col bg-[#E2ECF8] lg:rounded-[40px] border border-[#D6D7DA] sm:w-full sm:h-auto sm:rounded-[16px]">
              <div className="left lg:w-1/2 w-full lg:px-10 px-4 py-4 sm:w-full sm:px-4">
                <h4 className="lg:text-[48px] text-[40px] font-[500]">
                  Subscribe to our <br />
                  <span className="flex items-center">
                    <img src="/arrow.svg" alt="" className="mr-2" />
                    Newsletter
                  </span>
                </h4>
                <div className="flex gap-2">
                  <img src="/tick.svg" alt="" />
                  <p className="font-[400] mt-2 text-[14px] leading-[20px]">
                    Exclusive Access: Get first dibs on our top-rated service
                    professionals, handpicked for their expertise and customer
                    satisfaction.
                  </p>
                </div>
                <div className="flex gap-2">
                  <img src="/tick.svg" alt="" />
                  <p className="font-[400] mt-2 text-[14px] leading-[20px]">
                    Insider Tips: Receive valuable insights on how to enhance
                    your home or business environment with advice from industry
                    experts.
                  </p>
                </div>
                <div className="flex gap-2">
                  <img src="/tick.svg" alt="" />
                  <p className="font-[400] mt-2 text-[14px] leading-[20px]">
                    Latest Updates: Stay in the loop with the latest trends in
                    service solutions, innovative tools, and features designed
                    to streamline your search for the perfect professional.
                  </p>
                </div>
                <p className="font-[400] mt-4 text-[14px] leading-[20px]">
                  Your journey to effortless service procurement begins here.
                  Join the LiteJob community today and transform the way you
                  find and hire service professionals.
                </p>
              </div>
              <div className="right lg:w-1/2 w-full lg:px-4 px-4 flex flex-col justify-center items-center sm:w-full lg:mt-4">
                <p className="font-[400] lg:mt-4 text-[14px] leading-[20px]">
                  Subscribe to the LiteJob Newsletter and unlock the gateway to
                  unparalleled convenience in finding the right professionals
                  for your needs. Whether you're looking to renovate your home,
                  fix a leaky faucet, or find a trustworthy cleaning service,
                  LiteJob is your partner in making life easier.
                </p>
                <div className="flex gap-2 w-full mt-4 mb-4">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="lg:w-[347px] w-[300px] h-[48px] rounded-[4px]"
                  />
                  <button className="bg-[#047788] w-[125px] text-center text-white h-[48px] rounded-[8px] lg:px-[24px] px-[15px] py-[12px]">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer className="flex lg:justify-center lg:items-center w-full plg:px-[80px] px-[16px] lg:py-[80px] py-[40px] bg-white" />
        </div>
      </div>
    </>
  );
}
