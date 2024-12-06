import React, { useState, useEffect } from "react";
// import Login from '../authentication/Login'
// import SignUp from '../authentication/SignUp'
import logo from "../images/logo.png";
import { Sling as Hamburger } from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/Ai";
import landingPic from "../images/landingPic.svg";
import { AiOutlineSearch } from "react-icons/Ai";
import Carousel from "./Carousel";
import items from "./items";
import visibleItems from "./items";
import { Switch } from "@headlessui/react";
import languages from "./language";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/slices/auth";
// import data from "./data.json"

const NavbarTwo = ({ filterVisible, setFilterVisible, onChildData }) => {
  const filter = useSelector((state) => state.filter);
  const [nav, setNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const placeholderNames = [
    'Search "Builder"',
    'Search "Electrician"',
    'Search "Plumber"',
    'Search "Gardner"',
    'Search "Carpenter"',
    'Search "Architect"',
    'Search "Painter"',
    'Search "Lawyer"',
    'Search "Accountant"',
    'Search "Developer"',
  ];

  // useeffect to log filter
  useEffect(() => {
    console.log(filter);
    onChildData(searchTerm, filter ? filter : null);
  }, [filter.topRated, filter.mostPopular, filter.language, filter.city]);

  // Below two functions are for search bar
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onChildData(searchTerm, filter ? filter : null);
    // perform search action with searchTerm
  };

  const handleClickCarousel = (data) => {
    if (data) {
      console.log("carousel clickeddd", data);
      onChildData(data, filter ? filter : null);
    }
    // perform search action with searchTerm
  };

  // Below function is for placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % placeholderNames.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [placeholderNames.length]);

  // Below functions are for the filter

  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [languageFilter, setLanguageFilter] = useState(false);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submitBudgetValue();
    }
  };

  const submitBudgetValue = () => {
    // Do something with the value, like submit it to a server
    console.log(budget);
  };

  const [showAll, setShowAll] = useState(false);
  const visibleOptions = showAll ? languages : languages.slice(0, 11);
  const navigate = useNavigate();
  // Above functions are for the filter

  return (
    <div className="">
      <div>
        <nav className="justify-between flex max-w-[1500px] xl:justify-around ">
          <div className="flex">
            <Link to="/">
              <img className=" xs:ml-5 sm:ml-10 h-24 w-32" src={logo} alt="" />
            </Link>
            {/* <a href="/"><img className=' ml-10 h-24 w-32' src={logo} alt="" /></a> */}
          </div>

          <form
            onSubmit={handleSubmit}
            className="hidden mt-5 lg2:flex flex-grow ml-[4rem] mr-[25rem] h-[3rem]"
          >
            <input
              type="text"
              value={searchTerm}
              placeholder={` ${placeholderNames[placeholderIndex]} `}
              onChange={handleInputChange}
              className=" w-[100%] max-w-[25rem] rounded-l-full pl-5 border-[2px] placeholder:text-[#014e56] border-r-0 focus:border-black outline-none"
            />
            <button
              type="submit"
              className="bg-[#014e56] hover:bg-[#062c30] w-16 flex items-center justify-center rounded-r-full "
            >
              <AiOutlineSearch className="text-white" />
            </button>
          </form>

          <div className="flex absolute right-0 gap-6 text-lg font-bold mr-10  ">
            {isLoggedIn && (
              <button
                onClick={() => {
                  dispatch(Logout());
                }}
                className=" hidden md:block  text-black border text-[1.125rem] rounded-full h-[3rem]  w-[9.5625rem] font-medium  mt-5 border-black  hover:bg-[#014e56] hover:opacity-90 hover:text-white hover:font-medium"
              >
                {" "}
                Logout{" "}
              </button>
            )}
            {!isLoggedIn && (
              <button className=" hidden md:block  text-black border text-[1.125rem] rounded-full h-[3rem]  w-[9.5625rem] font-medium  mt-5 border-black  hover:bg-[#014e56] hover:opacity-90 hover:text-white hover:font-medium">
                {" "}
                <Link to="/Login">Login</Link>{" "}
              </button>
            )}
            {!isLoggedIn && (
              <button className=" hidden md:block text-black border text-[1.125rem] rounded-full h-[3rem]  w-[9.5625rem] font-medium  mt-5 border-black  hover:bg-[#014e56] hover:opacity-90 hover:text-white hover:font-medium ">
                {" "}
                <Link to="/Signup">Signup</Link>{" "}
              </button>
            )}
            <div className="mt-5 absolute right-0  md:hidden lg:hidden xl:hidden">
              <Hamburger toggled={nav} toggle={setNav} />
            </div>
          </div>

          {/* overlay */}
          <div>
            {nav ? (
              <div className="bg-black/70 fixed w-full h-screen z-10 top-0 right-0">
                {" "}
              </div>
            ) : (
              ""
            )}

            {/* sidemenu */}
            <div
              className={
                nav
                  ? "fixed top-0 right-0 w-[15.9375rem] h-screen overflow-auto bg-white z-10 duration-500"
                  : "fixed top-0 right-[-220%] w-[300px] h-screen bg-white z-10 duration-500"
              }
            >
              {/* innerMenu */}
              <AiOutlineClose
                onClick={() => setNav(!nav)}
                size={25}
                className="absolute right-10 top-10 cursor pointer text-black cursor-pointer"
              />
              <div className="flex flex-col mt-16">
                <Link
                  to="/Login"
                  className="items-center justify-center flex text-black border text-[1.125rem] rounded-full h-[3rem]  w-[9.5625rem] font-medium m-auto mt-8 border-black hover:bg-black hover:text-white hover:font-medium  "
                >
                  {" "}
                  Login{" "}
                </Link>
                {/* <a href="/Login" className='ml-14 font-bold text-gray-300 mb-6 hover:text-red-400'>Login</a> */}
                <Link
                  to="/SignUp"
                  className="items-center justify-center flex text-black border text-[1.125rem] rounded-full h-[3rem]  w-[9.5625rem] font-medium m-auto mt-8 border-black  hover:bg-black hover:text-white hover:font-medium "
                >
                  {" "}
                  SignUp{" "}
                </Link>
                {/* <a href="/SignUp" className='ml-14 font-bold text-gray-300 mb-6 hover:text-red-400'>SignUp</a> */}
                {/* <button className=' text-white border-2 text-[1.125rem] rounded-full h-[3rem]  w-[9.5625rem] font-medium m-auto mt-8 border-neutral-50 md:mt-0 hover:bg-neutral-50 hover:text-black hover:font-medium '><a href="/contact">contact us</a></button> */}
              </div>

              {/* Below is the filter function */}

              <div className="bg-white py-4  xs:flex">
                <div className="max-w-2xl w-[15rem] ml-10 ">
                  <div className="border border-gray-300 rounded-lg absolute right-0 w-[12rem] mr-10">
                    {/* SORT FILTER */}
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <h2 className="text-lg font-medium">Filter</h2>
                      <svg
                        className={`w-5 h-5 transition-transform transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414zM10 16a1 1 0 0 1-.707-.293l-3-3a1 1 0 0 1 1.414-1.414L10 13.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3A1 1 0 0 1 10 16z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {isOpen && (
                      <div className="p-4">
                        <div className="grid grid-cols gap-4">
                          <div className="flex items-center space-x-2">
                            <label htmlFor="checkbox1">Budget</label>
                            <input
                              type="text"
                              id="budgetBox"
                              value={budget}
                              onChange={(event) =>
                                setBudget(event.target.value)
                              }
                              onKeyPress={handleKeyPress}
                              className="border-gray-400 border-2 w-[5rem] pl-2 rounded-md"
                              placeholder="£150"
                            />
                          </div>

                          <div className="relative inline-flex items-center cursor-pointer">
                            <span className="mr-3">City</span>
                            <Switch
                              checked={enabled}
                              onChange={setEnabled}
                              className={`${
                                !enabled ? "bg-gray-700" : "bg-[#014e56]"
                              } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                              <span className="sr-only">Use setting</span>
                              <span
                                aria-hidden="true"
                                className={`${
                                  enabled
                                    ? "translate-x-[1.27rem]"
                                    : "translate-x-0"
                                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                              />
                            </Switch>
                            <span className="ml-3">National</span>
                          </div>

                          <div className="flex items-center space-x-2 ">
                            <input
                              type="checkbox"
                              id="checkbox1"
                              className="w-7 h-7 accent-[#014e56]"
                            />
                            <label htmlFor="checkbox1">Top rated</label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="checkbox2"
                              className="w-7 h-7 accent-[#014e56]"
                            />
                            <label htmlFor="checkbox2">Most popular</label>
                          </div>
                        </div>

                        {/* LANGUAGE FILTER */}
                        <div className="border border-gray-300 rounded-lg mt-3">
                          <div
                            className="flex items-center justify-between px-4 py-3 cursor-pointer"
                            onClick={() => setLanguageFilter(!languageFilter)}
                          >
                            <h2 className="text-lg font-medium">Languages</h2>
                            <svg
                              className={`w-5 h-5 transition-transform transform ${
                                languageFilter ? "rotate-180" : ""
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414zM10 16a1 1 0 0 1-.707-.293l-3-3a1 1 0 0 1 1.414-1.414L10 13.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3A1 1 0 0 1 10 16z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>

                          {languageFilter && (
                            <div className="p-4">
                              <div className="grid grid-cols gap-4">
                                {visibleOptions.map((language) => (
                                  <div
                                    key={languages}
                                    className="flex items-center space-x-2 text-lg"
                                  >
                                    <input
                                      type="checkbox"
                                      id={language}
                                      name={language}
                                      className="w-7 h-7 accent-[#014e56]"
                                    />
                                    <label htmlFor={language}>{language}</label>
                                  </div>
                                ))}
                                {!showAll && (
                                  <button
                                    onClick={() => setShowAll(true)}
                                    className="flex-start flex underline text-lg"
                                  >
                                    Show more
                                  </button>
                                )}
                                {showAll && (
                                  <button
                                    onClick={() => setShowAll(false)}
                                    className="flex-start flex underline text-lg "
                                  >
                                    Show less
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* <img className='absolute h-44 bottom-0 right-0 mb-2' src={landingPic} alt="" /> */}
            </div>
          </div>
        </nav>

        {/* small screen search bar */}
        <form onSubmit={handleSubmit} className="flex lg2:hidden  h-[3rem] ">
          <input
            type="text"
            value={searchTerm}
            placeholder={` ${placeholderNames[placeholderIndex]} `}
            onChange={handleInputChange}
            className=" w-[100%] ml-8 rounded-l-md pl-5 border-[2px] placeholder:text-[#014e56] border-r-0 focus:border-black outline-none"
          />
          <button
            type="submit"
            className="bg-[#014e56] hover:bg-[#062c30] w-16 flex items-center justify-center rounded-r-md mr-10 "
          >
            <AiOutlineSearch className="text-white" />
          </button>
        </form>

        <div>
          <Carousel
            items={items}
            visibleItems={14}
            onClickCarouselData={handleClickCarousel}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarTwo;
