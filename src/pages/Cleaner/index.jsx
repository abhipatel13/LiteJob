import { useEffect, useState } from "react";

import { Img, Button } from "../../components";
import CleanerDetails from "../../components/CleanerDetails";
import Footer from "../../components/Footer";
import Navbar from "../../components/landingPage/Navbar";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

//images
import star from "../../assets/star.svg";
import search from "../../assets/search.svg";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import useBusinessDataFetching from "../../hooks/businessHook";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addFilter,
  setName,
  setProfessionInput,
} from "../../redux/slices/filter";
import axios from "axios";
import Loader from "../../components/Loader";

export default function Cleaner() {
  const { slug } = useParams();
  const [firstWord, setFirstWord] = useState(
    slug.split(" ")[0].replace(",", "")
  );
  // firstWord = firstWord.replace(",", "");

  const [currentPage, setCurrentPage] = useState(1);
  const [businesses, setBusinesses] = useState([]);
  const [cityInput, setCityInput] = useState(firstWord);
  const [searchProfession, setSearchProfession] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);

  const dispatch = useDispatch();
  const professionInput = useSelector((state) => state.filter.professionInput);
  const topRated = useSelector((state) => state.filter.topRated);
  const mostPopular = useSelector((state) => state.filter.mostPopular);
  const filter = useSelector((state) => state.filter); // Get the filter state
  const enabled = useSelector((state) => state.filter.enabled);
  const serviceName = useSelector((state) => state.filter.serviceName);

  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const budget = useSelector((state) => state.filter.budget);

  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch an action to update the `enabled` state in your Redux store
    // based on the initial state of `enabled` in your component
    dispatch(addFilter({ ...filter, enabled: enabled }));
  }, [enabled]);

  const saveSearchCriteriaToStorage = () => {
    localStorage.setItem(
      "searchCriteria",
      JSON.stringify({
        cityInput,
        professionInput,
        hasSearched,
        currentPage,
      })
    );
  };

  const getSearchCriteriaFromStorage = () => {
    const searchCriteria = localStorage.getItem("searchCriteria");
    return searchCriteria ? JSON.parse(searchCriteria) : null;
  };

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.avgPrice <= budget &&
      (enabled ||
        (business.city &&
          typeof business.city === "string" &&
          business.city.toLowerCase() === firstWord.toLowerCase())) &&
      (business.title.toLowerCase().includes(searchProfession.toLowerCase()) ||
        business.summary
          .toLowerCase()
          .includes(searchProfession.toLowerCase()) ||
        business.services.some(
          (service) =>
            service.name
              .toLowerCase()
              .includes(searchProfession.toLowerCase()) ||
            service.description
              .toLowerCase()
              .includes(searchProfession.toLowerCase())
        )) &&
      (!topRated ||
        (business.ratingsAverage >= 4 && business.ratingsAverage <= 5)) &&
      (!mostPopular || business.ratingsQuantity > 1)
  );

  // Default Sorting (when no filter is clicked)
  const sortedBusinesses = filteredBusinesses.sort((a, b) => {
    if (mostPopular) {
      // If mostPopular is clicked, sort by ratingsQuantity first
      if (b.ratingsQuantity !== a.ratingsQuantity) {
        return b.ratingsQuantity - a.ratingsQuantity;
      }
      // If ratingsQuantity is the same, then sort by ratingsAverage
      return b.ratingsAverage - a.ratingsAverage;
    } else {
      // If mostPopular is not clicked, sort by ratingsAverage first
      if (b.ratingsAverage !== a.ratingsAverage) {
        return b.ratingsAverage - a.ratingsAverage;
      }
      // If ratingsAverage is the same, then sort by ratingsQuantity
      return b.ratingsQuantity - a.ratingsQuantity;
    }
  });

  // Sorting when "Most Popular" is clicke

  const handleSearch = async (e) => {
    e.preventDefault();
    setFirstWord(cityInput);
    setSearchProfession(professionInput);
    setHasSearched(true);
    navigate(`/filter/${encodeURIComponent(cityInput)}`);
    saveSearchCriteriaToStorage();
  };

  useEffect(() => {
    const searchCriteria = getSearchCriteriaFromStorage();
    if (searchCriteria) {
      setCityInput(searchCriteria.cityInput);
      setSearchProfession(searchCriteria.professionInput);
      setHasSearched(searchCriteria.hasSearched);
      setCurrentPage(searchCriteria.currentPage);
      // Fetch the business data using the search criteria from the storage
    }
  }, []);

  useEffect(() => {
    console.log("Search Profession:", searchProfession);
  }, [searchProfession]);

  let url = "http://localhost:5500/api/v1/business";

  // if (professionInput) {
  //   url += `?serviceName=${professionInput}`;
  // }

  const { businessData, loading } = useBusinessDataFetching(url);




  useEffect(() => {
    if (businessData && businessData.data) {
      let businessesData = [];
      if (Array.isArray(businessData.data.data)) {
        businessesData = businessData.data.data;
      } else {
        businessesData.push(businessData.data);
      }
      setBusinesses(businessesData);
    }
  }, [businessData]);

  function handlePageClick(page) {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);
  }

  useEffect(() => {
    if (hasSearched && filteredBusinesses.length && firstSearch) {
      setCurrentPage(1);
      localStorage.setItem("currentPage", 1);
      setFirstSearch(false);
    }
  }, [professionInput, filteredBusinesses, hasSearched, firstSearch]);

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(Number(storedPage));
    }
  }, []);

  useEffect(() => {
    // Check if the filter is set to 'City'
    if (!enabled && localStorage.getItem("currentPage") > 1) {
      // Reset the current page to 1
      setCurrentPage(1);
      localStorage.setItem("currentPage", 1);
    }
  }, [enabled]); // Add enabled to the dependency array

  return (
    <>
      <div className="flex flex-col items-center justify-start w-full bg-white-A700">
        <div className="flex flex-col items-center justify-start w-full gap-24 bg-[#0B3E7B]">
          <header className="justify-between w-full px-[10px] lg:px-[40px] py-[40px]">
            <Navbar />
          </header>
          <div
            className="flex flex-col items-center justify-start lg:md:w-[61%] pb-[80px] px-[10px] w-full sm:w-full mb-6 gap-6
           md3:w-[70%] md2:w-[65%] sm:sm:w-[50%]"
          >
            <h1 className=" text-white text-center lg:text-[48px] xs:text-[28px] text-[35px] font-[700]">
              Top Businesses and Professionals Ready to Help
            </h1>

            <div className="px-[16px] py-[10px] bg-white rounded-[16px] w-full lg:lg1:w-[800px]">
              <div className="flex flex-row items-center justify-between gap-4">
                <input
                  type="text"
                  placeholder="Your City"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  className="w-full hidden md:hidden md:flex-grow lg:flex p-2 md:mt-0"
                />
                <input
                  type="text"
                  placeholder="Profession"
                  value={professionInput}
                  onChange={(e) => {
                    dispatch(setProfessionInput(e.target.value));
                    if (e.target.value === "") {
                      setSearchProfession("");
                    }
                    dispatch(setName(e.target.value));
                  }}
                  className="border-left-md w-full flex-grow p-2 md:mt-0"
                  style={{ borderLeft: "1px solid lightgray" }}
                />
                <Button
                  size="xl"
                  shape="round"
                  onClick={(e) => {
                    handleSearch(e);
                    setSearchProfession(professionInput);
                  }}
                  leftIcon={<Img src={search} alt="Icon" />}
                  className="button-width-md w-full md:w-auto text-[16px] px-[20px] py-[10px] text-white gap-2 md:mt-0 rounded-[10px] bg-[#037783]"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full bg-[#FFFFFF]">
          <div className="flex flex-col items-center justify-start w-full gap-10 py-[20px] px-[30px] bg-white-A700">
            <div className="flex flex-row md:justify-between lg:justify-between gap-2 items-center w-full max-w-7xl">
              <h2 className="lg:text-[24px] lg:font-[700] text-[20px] font-[500]">
                {filteredBusinesses.length} businesses available in your
                location
              </h2>
              <Filter
                cityInput={cityInput}
                setCityInput={setCityInput}
                handleSearch={handleSearch}
              />
              {/* <Button
                color="blue_gray_100_02"
                size="4xl"
                variant="outline"
                shape="round"
                leftIcon={
                  <Img src="images/img_settings_2.svg" alt="settings/2" />
                }
                className="font-[700] text-[16px] gap-2 w-[117px] rounded-[8px] border border-[#D0D5DD]"
              >
                Filter
              </Button> */}
            </div>
            <div className="justify-center grid-md w-full gap-10 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid min-h-[auto] max-w-7xl">
              {loading && <Loader />}
              {sortedBusinesses.length === 0 && !loading && (
                <div className="flex items-center justify-center w-full h-[200px]">
                  <h1 className="text-[24px] text-center font-[700] text-[#000000]">
                    No businesses found
                  </h1>
                </div>
              )}
              {sortedBusinesses.slice(startIndex, endIndex).map((business) => (
                <div
                  key={business._id}
                  className="flex flex-col items-center justify-start w-full gap-3"
                >
                  <div className="h-80 w-full relative">
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      loop={true}
                      pagination={{ clickable: true }}
                      navigation={true}
                      modules={[Pagination, Navigation]}
                      className="mySwiper"
                    >
                      {business.imageCover.map((imageUrl, index) => (
                        <SwiperSlide key={index}>
                          <img
                            className="w-[290px] h-[320px] rounded-[20px]"
                            src={imageUrl}
                            alt=""
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <CleanerDetails
                    title={business.title}
                    desc={business.summary}
                    rating={business.ratingsAverage}
                    price={business.avgPrice}
                    id={business._id}
                    star={star}
                    businessAuth={business.businessAuth}
                    businessCity={business.city}
                    className="flex flex-col items-center justify-start w-full gap-3"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center h-full w-full ">
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-[16px] pt-[80px] gap-1 pb-[20px]  md:px-[50px] flex items-center ${
                  currentPage === 1 ? "opacity-50" : ""
                }`}
              >
                <FaLongArrowAltLeft />
                Previous
              </button>
              <div className="w-full h-full flex justify-center  items-center mt-14 gap-2">
                {Array.from(
                  {
                    length: Math.ceil(filteredBusinesses.length / itemsPerPage),
                  },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    className={`px-2 py-1 md:px-4 md:py-2 flex items-center ${
                      currentPage === page ? "bg-gray-200 rounded" : ""
                    }`}
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredBusinesses.length / itemsPerPage)
                }
                className={`px-[16px] pt-[80px]  gap-1 pb-[20px] md:px-[50px] flex items-center ${
                  currentPage ===
                  Math.ceil(filteredBusinesses.length / itemsPerPage)
                    ? "opacity-50"
                    : ""
                }`}
              >
                Next
                <FaLongArrowAltRight />
              </button>
            </div>
          </div>
          <Footer className="flex justify-center items-center w-full lg:px-10 px-[16px] py-[40px] lg:py-[80px] bg-[#FFFFFF]" />
        </div>
      </div>
    </>
  );
}
