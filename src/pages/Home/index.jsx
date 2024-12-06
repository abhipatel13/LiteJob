import React, { useEffect, useRef, useState } from "react";
import { Text, Button, Img, Input, Heading, RatingBar } from "../../components";
import DesktopFourFaqsection from "../../components/DesktopFourFaqsection";
import Footer from "../../components/Footer";
import Navbar from "../../components/landingPage/Navbar";
import { homeReviews } from "../../constants";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function HomePage() {
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 768);

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
      <div className="flex flex-col items-center justify-start w-full bg-white-A700 overflow-hidden">
        <div className="lg:h-[774px] h-[580px] w-full pt-4 pl-4 bg-[#0B3E7B] relative overflow-hidden">
          <Img
            src="images/img_wepik_export_20.png"
            alt="wepikexporttwen"
            className="h-[742px] w-[52%] lg:block hidden right-0 bottom-0 top-0 m-auto mt-5 object-cover absolute"
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
              <div className="flex flex-row justify-between items-center w-full p-1.5 bg-white rounded-[28px]">
                <input
                  placeholder="Your City"
                  className="ml-3.5 !text-gray-400_01 !font-medium border-none outline-none w-full border-transparent"
                  style={{ outlineColor: "white" }}
                />

                <Button
                  size="3xl"
                  leftIcon={<Img src="images/img_search.svg" alt="search" />}
                  className="gap-2 font-medium w-[122px] rounded-[22px] bg-[#037783]"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full gap-[68px] lg:px-[80px] px-[16px] lg:py-[79px] py-[40px]">
            <h2 className="lg:text-[44px] lg:font-[700] text-[35px] font-[500] leading-[48px]">
              Why Choose LiteJob?
            </h2>
            <div className="flex lg:flex-row flex-col justify-start items-center w-full gap-10 max-w-7xl">
              <div className="flex flex-col lg:w-[49%] w-full gap-6">
                <div className="flex flex-row justify-start items-start w-full gap-6 p-[11px] border-gray-300 border border-solid bg-[#FEF3F2] shadow-xs rounded-[16px]">
                  <Img
                    src="images/img_component_2.svg"
                    alt="userdouble_one"
                    className="h-9 w-9 mt-[3px] ml-[3px]"
                  />
                  <div className="flex flex-col items-start justify-start w-[89%] mb-[3px] mr-[3px] gap-[11px]">
                    <Text size="2xl" as="p">
                      Time Saving
                    </Text>
                    <Text as="p">
                      Quick and easy searches with filters. Find the right
                      professionals and businesses in one place, tailored to
                      your budget.
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-start w-full gap-6 p-[11px] border-gray-300 border border-solid bg-[#F4F3FF] shadow-xs rounded-[16px]">
                  <Img
                    src="images/img_component_3.svg"
                    alt="userdouble_one"
                    className="h-9 w-9 mt-[3px] ml-[3px]"
                  />
                  <div className="flex flex-col items-start justify-start w-[89%] mb-[3px] mr-[3px] gap-[11px]">
                    <Text size="2xl" as="p">
                      Verified Excellence
                    </Text>
                    <Text as="p">
                      Explore portfolios, read client reviews, and trust in our
                      thorough identity verification for professionals and
                      businesses.
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-start w-full gap-6 p-[11px] border-gray-300 border border-solid bg-[#FEFDF0] shadow-xs rounded-[16px]">
                  <Img
                    src="images/img_component_4.svg"
                    alt="userdouble_one"
                    className="h-9 w-9 mt-[3px] ml-[3px]"
                  />
                  <div className="flex flex-col items-start justify-start w-[89%] mb-[3px] mr-[3px] gap-[11px]">
                    <Text size="2xl" as="p">
                      No upfront costs
                    </Text>
                    <Text as="p">
                      Engage with confidence as you only pay when you decide to
                      hire.
                    </Text>
                  </div>
                </div>

                <div className="flex flex-row justify-start items-start w-full gap-6 p-[11px] border-gray-300 border border-solid bg-[#F8F9FC] shadow-xs rounded-[16px]">
                  <Img
                    src="images/img_user_double.svg"
                    alt="userdouble_one"
                    className="h-9 w-9 mt-[3px] ml-[3px]"
                  />
                  <div className="flex flex-col items-start justify-start w-[89%] mb-[3px] mr-[3px] gap-[11px]">
                    <Text size="2xl" as="p">
                      Tailored Interviews
                    </Text>
                    <Text as="p">
                      Find your ideal match by interviewing potentials to assess
                      their fit for your project.
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-start w-full gap-6 p-[15px] border-gray-300 border border-solid bg-[#FDF4FF] shadow-xs rounded-[16px]">
                  <Img
                    src="images/img_terminal_box.svg"
                    alt="terminalbox_one"
                    className="h-9 w-9"
                  />
                  <div className="flex flex-col items-start justify-start w-[90%] gap-[7px]">
                    <Text size="2xl" as="p">
                      Negotiate your terms
                    </Text>
                    <Text as="p">
                      Have the freedom to discuss and agree on rates that work
                      for both you and your potential hire.
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-start w-full gap-6 p-3.5 border-gray-300 border border-solid bg-[#ECFDF3] shadow-xs rounded-[16px]">
                  <Img
                    src="images/img_messages_svgrepo_com.svg"
                    alt="messages_one"
                    className="h-9 w-9"
                  />
                  <div className="flex flex-col items-start justify-start w-[90%] gap-2">
                    <Text size="2xl" as="p">
                      Call and Message Feature
                    </Text>
                    <Text as="p">
                      Engage with professionals effortlessly through our
                      Twilio-Integrated messaging or by accessing their direct
                      business lines.
                    </Text>
                  </div>
                </div>
              </div>
              <Img
                src="images/img_qa_engineers_bro.svg"
                alt="qaengineers_one"
                className="lg:h-[620px] lg:w-[620px] h-[396px] w-[396px]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-[30px] lg:px-[80px] px-[16px] lg:py-[80px] py-[40px] bg-[#E9F1FA]">
            <h2 className="lg:text-[40px] text-[35px] font-[500]">
              What Our Customers Say About us
            </h2>
            <div className="flex flex-row justify-center items-center w-full gap-12 py-20 overflow-x-auto ">
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
                            <Text size="lg" as="p" className="text-center">
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
                                <p className="text-[18px] font-[500]">
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

                {/* <div className="flex flex-col items-center justify-start lg:w-[32%] w-full mb-[30px] gap-8">
                  <div className="flex flex-col items-center justify-start w-full border-1 gap-8 lg:border-none border-[#ACCAEC] bg-[#DAE7F6] lg:bg-transparent rounded-[16px] lg:p-0 p-[24px]">
                    <RatingBar
                      value={5}
                      isEditable={true}
                      color="#000000"
                      activeColor="#000000"
                      size={16}
                      className="flex justify-between w-[93px]"
                    />
                    <div className="flex flex-col items-center justify-start w-full pt-1 gap-2.5">
                      <Heading size="md" as="h3" className="text-center">
                        Secure and Trustworthy!
                      </Heading>
                      <Text size="lg" as="p" className="text-center">
                        What stands out for me is the secure payment gateway
                        with Stripe. It adds an extra layer of trust and
                        security to the hiring process. LiteJcb has made finding
                        the right talent stress-free and secure
                      </Text>
                    </div>
                    <div className="flex lg:flex-col items-center justify-center w-full gap-4">
                      <Img
                        src="images/img_picture_placeholder_67x67.png"
                        alt="picture_one"
                        className="lg:h-[67px] lg:w-[67px] w-[32px] h-[32px]"
                      />
                      <div className="flex flex-row justify-center w-[23%]">
                        <div className="flex flex-row justify-center w-full">
                          <p className="text[18px] font-[500]">Michael R</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start lg:w-[32%] w-full gap-8">
                  <div className="flex flex-col items-center justify-start w-full border-1 gap-8 lg:border-none border-[#ACCAEC] bg-[#DAE7F6] lg:bg-transparent rounded-[16px] lg:p-0 p-[24px]">
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
                        <Heading size="md" as="h4" className="text-center">
                          A True Time-Saver!
                        </Heading>
                        <Text size="lg" as="p" className="text-center">
                          Using Lite Job has been a game-changer for my company.
                          The platform is intuitive, making it easy to find
                          qualified professionals quickly. It&#39;s not just
                          budget-friendly, it&#39;s a true time-saver. I
                          can&#39;t imagine going back to traditional hiring
                          methods
                        </Text>
                      </div>
                      <div className="flex lg:flex-col items-center justify-center w-full gap-4">
                        <Img
                          src="images/img_picture_placeholder_1.png"
                          alt="picture_one"
                          className="lg:h-[67px] lg:w-[67px] w-[32px] h-[32px]"
                        />
                        <div className="flex flex-row justify-center w-[18%]">
                          <div className="flex flex-row justify-center w-full">
                            <p className="text-[18px] font-[500]">Anita D</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
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
                  {homeReviews.map((review) => (
                    <SwiperSlide className="bg-transparent">
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
                            <Heading size="md" as="h2" className="text-center">
                              {review.title}
                            </Heading>
                            <Text size="lg" as="p" className="text-center">
                              {review.desc}
                            </Text>
                          </div>
                          <div className="flex lg:flex-col items-center justify-center lg:h-[67px] mt-8 lg:w-[67px] w-[32px] h-[32px] gap-4">
                            <Img
                              src={review.img}
                              alt="carlos_g_one"
                              className="lg:h-[67px] lg:w-[67px] w-[32px] h-[32px] rounded-[50%]"
                            />
                            <div className="flex flex-row justify-center w-[21%]">
                              <div className="flex flex-row justify-center w-full">
                                <p className="text-[18px] font-[500]">
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
