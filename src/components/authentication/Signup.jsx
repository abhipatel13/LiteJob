import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Text } from "../../components";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { updateBusinessFormData } from "../../redux/slices/businessFormDataSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import imageCompression from "browser-image-compression";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";

export default function SignupPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const fileInput = useRef(null);
  const [BusinessformData, setBusinessformData] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  const handleTabChange = (index) => {
    if (index === 0) {
      setCurrentPage(0); // Set current page to 0 if Client tab is clicked
    } else if (index === 1) {
      setCurrentPage(1); // Set current page to 2 if Business tab is clicked
    } else {
      setCurrentPage(2); // Set current page to 2 if Business tab is clicked
    }
  };

  const handleContinue = (data, prevPage) => {
    console.log(data);
    dispatch(updateBusinessFormData(data));
    localStorage.setItem("businessFormData", JSON.stringify(data));
    if (prevPage === 1) {
      setCurrentPage(2); // Assuming 2 represents the index of the second business page
    } else {
      setCurrentPage(1); // Set current page to the business form if the previous page was the first business page
    }
  };

  useEffect(() => {
    if (prevLocation.current === "/signup" && location.pathname !== "/signup") {
      localStorage.removeItem("businessFormData");
    }
    prevLocation.current = location.pathname;
  }, [location]);

  function ClientPage() {
    const [formData, setFormData] = useState({
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    });

    const navigate = useNavigate();


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const agreeTermsCheckbox = document.getElementById("agreeTerms");

      if (!agreeTermsCheckbox.checked) {
        alert("Please agree to the terms and conditions.");
        return; // Stop form submission if checkbox is not checked
      }

      try {
        const response = await axios.post(
          "http://localhost:5500/api/v1/users/signup",
          JSON.stringify(formData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data); // Assuming your backend sends back some response data
        // Show alert on successful signup
        if (response) {
          alert("Signup successful!");
          navigate("/login");
        }
        // Handle success, such as redirecting to another page
      } catch (error) {
        console.error("Error signing up:", error.message);
        // Handle error, such as displaying error message to the user
      }
    };
    return (
      <div
        className="flex flex-col items-center justify-center w-full h-full bg-white-A700 "
        style={{
          backgroundImage: `url("images/img_group_151.png")`,
          backgroundSize: "contain",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat", // Position the background image at the top right corner
        }}
      >
        <div className="flex justify-start items-start w-full p-[39px]">
          <Link to="/">
            <h2 className="text-[24px] font-[500] text-[#037783] flex justify-center items-center mt-3">
              LiteJob
            </h2>
          </Link>
        </div>
        <div className="flex flex-row justify-center w-full max-w-[1376px]">
          <div className="flex flex-row justify-center items-center w-full">
            <div className="flex flex-row justify-center w-full">
              <div className="flex flex-row justify-center items-center w-full">
                <div className="flex flex-col items-center justify-center lg:border lg:border-gray-400 rounded-[8px] w-[480px] h-full p-[10px]  gap-[30px] z-[1]">
                  <Tabs
                    className="flex flex-col items-center justify-center w-full gap-8"
                    selectedTabClassName="text-white bg-green-600 rounded"
                    selectedTabPanelClassName="relative tab-panel--selected"
                    selectedIndex={currentPage}
                    onSelect={handleTabChange}
                  >
                    <div className="flex flex-col items-center justify-start w-full gap-[18px]">
                      <a href="#">
                        <h1 className="text-center lg:text-[40px] text-[28px] font-[700]">
                          Create an Account
                        </h1>
                      </a>
                      <TabList className="flex flex-row justify-between w-[74%] gap-[72px] p-2.5 border-gray-800 lg:border border-solid rounded-lg">
                        <Tab className="mt-px ml-6 text-gray-400 px-[16px] py-[6px] text-center text-lg font-normal cursor-pointer">
                          Client
                        </Tab>
                        <Tab className="mr-6 text-white-A700 text-center text-lg font-normal cursor-pointer px-[16px] py-[6px] text-gray-400">
                          Business
                        </Tab>
                      </TabList>
                    </div>
                    {[...Array(2)].map((_, index) => (
                      <TabPanel
                        key={`tab-panel${index}`}
                        className="items-center w-full absolute"
                      >
                        <div className="flex flex-col items-center justify-start w-full">
                          <div className="flex flex-col items-center justify-start w-full gap-[34px]">
                            <form
                              className="flex flex-col items-center justify-start w-full gap-6"
                              onSubmit={handleSubmit}
                            >
                              <input
                                type="text"
                                name="FirstName"
                                placeholder="First Name"
                                className="w-full outline-none focus:outline-0 bg-transparent"
                                style={{
                                  borderBottom: "1px solid black",
                                  outline: "none !important",
                                }}
                                value={formData.FirstName}
                                onChange={handleChange}
                              />
                              <input
                                type="text"
                                name="LastName"
                                placeholder="Last Name"
                                className="w-full outline-none bg-transparent"
                                style={{
                                  borderBottom: "1px solid black",
                                  outline: "none !important",
                                }}
                                value={formData.LastName}
                                onChange={handleChange}
                              />
                              <input
                                type="email"
                                name="Email"
                                placeholder="Email"
                                className="w-full outline-none bg-transparent"
                                style={{
                                  borderBottom: "1px solid black",
                                  outline: "none !important",
                                }}
                                value={formData.Email}
                                onChange={handleChange}
                              />
                              <input
                                type="password"
                                name="Password"
                                placeholder="Password"
                                className="w-full outline-none bg-transparent"
                                style={{ borderBottom: "1px solid black" }}
                                value={formData.Password}
                                onChange={handleChange}
                              />
                              <input
                                type="password"
                                name="ConfirmPassword"
                                placeholder="Confirm Password"
                                className="w-full outline-none bg-transparent"
                                style={{ borderBottom: "1px solid black" }}
                                value={formData.ConfirmPassword}
                                onChange={handleChange}
                              />

                              <div>
                                <input
                                  className="mr-2 leading-tight border"
                                  type="checkbox"
                                  id="agreeTerms"
                                />
                                <label className="text-sm" htmlFor="agreeTerms">
                                  I agree to terms and conditions
                                </label>
                              </div>

                              <button
                                type="submit"
                                className="w-full bg-[#037783] rounded-[8px] text-white py-[12px]"
                              >
                                Create Account
                              </button>
                            </form>
                            <div className="flex flex-row justify-center w-full gap-4">
                              <a href="#" className="mb-px">
                                <Text as="p">Already Have an Account?</Text>
                              </a>
                              <Link to="/login">
                                <Text
                                  as="p"
                                  className="!text-cyan-800 underline"
                                >
                                  Login
                                </Text>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    ))}
                  </Tabs>
                  <div className="flex justify-center w-10 h-4" />
                </div>
                {/* <Img
                  src="images/img_group_151.png"
                  alt="image"
                  className="w-[946px] h-[998px] absolute object-cover"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function BusinessPageFirst() {
    const businessFormData = useSelector((state) => state.businessFormData);
    const [businessEmail, setBusinessEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [postcode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
      const savedData = JSON.parse(localStorage.getItem("businessFormData"));
      if (savedData) {
        setBusinessEmail(savedData.businessEmail || "");
        setPhoneNumber(savedData.phoneNumber || "");
        setAddress(savedData.address || "");
        setPostcode(savedData.postcode || "");
        setCity(savedData.city || "");
        setPassword(savedData.password || "");
        setConfirmPassword(savedData.confirmPassword || "");
      }
    }, []);

    const handleSubmit = () => {
      const data = {
        businessEmail,
        phoneNumber,
        address,
        postcode,
        city,
        password,
        confirmPassword,
      };
      dispatch(updateBusinessFormData(data));
      handleContinue(data, currentPage);
    };

    // Function to check if all inputs are filled
    const areInputsFilled = () => {
      return (
        businessEmail &&
        phoneNumber &&
        address &&
        postcode &&
        city &&
        password &&
        confirmPassword
      );
    };
    return (
      <div
        className="flex flex-col items-center justify-center w-full h-full bg-white-A700"
        style={{
          backgroundImage: `url("images/img_group_151.png")`,
          backgroundSize: "contain",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat", // Position the background image at the top right corner
        }}
      >
        <div className="flex justify-start items-start w-full p-[39px]">
          <Link to="/">
            <h2 className="text-[24px] font-[500] text-[#037783] flex justify-center items-center mt-3">
              LiteJob
            </h2>
          </Link>
        </div>
        <div className="flex flex-row justify-center w-full max-w-[1376px]">
          <div className="flex flex-row justify-center items-center w-full">
            <div className="flex flex-row justify-center w-full">
              <div className="flex flex-row justify-center items-center w-full">
                <div className="flex flex-col items-center justify-center  mb-6 lg:border lg:border-gray-400 rounded-[8px] w-[480px] h-full p-[10px]  gap-[30px] z-[1]">
                  <Tabs
                    className="flex flex-col items-center justify-center w-full gap-8"
                    selectedTabClassName="text-white bg-blue-600 rounded"
                    selectedTabPanelClassName="relative tab-panel--selected"
                    selectedIndex={currentPage} // Set the selected tab index
                    onSelect={handleTabChange}
                  >
                    <div className="flex flex-col items-center justify-start w-full gap-[18px]">
                      <a href="#">
                        <h1 className="text-center lg:text-[40px] text-[28px] font-[700]">
                          Create an Account
                        </h1>
                      </a>
                      <TabList className="flex flex-row justify-between w-[74%] gap-[72px] p-2.5 border-gray-300 lg:border border-solid rounded-lg">
                        <Tab className="mt-px ml-6 text-gray-400 text-center text-lg font-normal cursor-pointer p-[4px]">
                          Client
                        </Tab>
                        <Tab className="mr-6 text-white-A700 text-center text-lg font-normal cursor-pointer p-[8px] text-gray-400">
                          Business
                        </Tab>
                      </TabList>
                    </div>
                    {[...Array(2)].map((_, index) => (
                      <TabPanel
                        key={`tab-panel${index}`}
                        className="items-center w-full absolute"
                      >
                        <div className="flex flex-col items-center justify-start w-full">
                          <div className="flex flex-col items-center justify-start w-full gap-[34px]">
                            <form
                              className="flex flex-col items-center justify-start w-full gap-6"
                              onSubmit={() => handleSubmit(currentPage)}
                            >
                              <input
                                type="email"
                                name="BusinessEmail"
                                placeholder="Business Email"
                                className="w-full outline-none bg-transparent"
                                style={{
                                  borderBottom: "1px solid black",
                                  outline: "none !important",
                                }}
                                value={businessEmail}
                                onChange={(e) =>
                                  setBusinessEmail(e.target.value)
                                }
                                required
                              />
                              <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Business Phone Number"
                                className="w-full outline-none bg-transparent"
                                style={{ borderBottom: "1px solid black" }}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                              />
                              <input
                                name="address"
                                placeholder="Business Address"
                                className="w-full outline-none bg-transparent"
                                style={{ borderBottom: "1px solid black" }}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                              />
                              <div className="flex flex-row justify-start w-full gap-3">
                                <div className="flex flex-row justify-start w-1/2">
                                  <input
                                    name="postcode"
                                    placeholder="Postcode"
                                    className="w-full outline-none bg-transparent"
                                    style={{
                                      borderBottom: "1px solid black",
                                      outline: "none !important",
                                    }}
                                    value={postcode}
                                    onChange={(e) =>
                                      setPostcode(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <div className="flex flex-row justify-start w-[48%]">
                                  <input
                                    name="city"
                                    placeholder="City"
                                    className="w-full outline-none bg-transparent"
                                    style={{
                                      borderBottom: "1px solid black",
                                      outline: "none !important",
                                    }}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                  />
                                </div>
                              </div>
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full outline-none bg-transparent"
                                style={{
                                  borderBottom: "1px solid black",
                                  outline: "none !important",
                                }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                              <input
                                type="password"
                                name="confirmpassword"
                                placeholder="Confirm Password"
                                className="w-full outline-none bg-transparent"
                                style={{
                                  borderBottom: "1px solid black",
                                  outline: "none !important",
                                }}
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                required
                              />
                              <button
                                className={`w-full bg-[#037783] rounded-[8px] text-white py-[12px] ${
                                  !areInputsFilled()
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                type="submit"
                                disabled={!areInputsFilled()} // Disable button if inputs are not filled
                              >
                                Continue
                              </button>
                            </form>
                            <div className="flex flex-row justify-center w-full gap-4">
                              <a href="#" className="mb-px">
                                <Text as="p">Already Have an Account?</Text>
                              </a>
                              <Link to="/login">
                                <Text
                                  as="p"
                                  className="!text-cyan-800 underline"
                                >
                                  Login
                                </Text>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="w-full mt-4 flex gap-2 justify-center items-center">
                          <div className="first-dot w-[16px] h-[16px] rounded-full bg-black"></div>
                          <div className="second-dot w-[16px] h-[16px] rounded-full bg-gray-400"></div>
                        </div>
                      </TabPanel>
                    ))}
                  </Tabs>
                  <div className="flex justify-center w-10 h-4" />
                </div>
                {/* <Img
                    src="images/img_group_151.png"
                    alt="image"
                    className="w-[946px] h-[998px] absolute object-cover"
                  /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function BusinessPageSecond() {
    const businessDetails = useSelector((state) => state.businessFormData);

    const [BusinessEmail, setBusinessEmail] = useState(
      businessDetails.businessFormData.businessEmail
    );
    const [BusinessAddress, setBusinessAddress] = useState(
      businessDetails.businessFormData.address
    );
    const [BusinessPostcode, setBusinessPostcode] = useState(
      businessDetails.businessFormData.postcode
    );
    const [BusinessCity, setBusinessCity] = useState(
      businessDetails.businessFormData.city
    );
    const [BusinessPhoneNumber, setBusinessPhoneNumber] = useState(
      businessDetails.businessFormData.phoneNumber
    );
    const [BusinessPassword, setBusinessPassword] = useState(
      businessDetails.businessFormData.password
    );
    const [ConfirmBusinessPassword, setConfirmBusinessPassword] = useState(
      businessDetails.businessFormData.confirmPassword
    );
    const [BusinessName, setBusinessName] = useState("");
    const [BusinessSummary, setBusinessSummary] = useState("");
    const [BusinessImage, setBusinessImage] = useState([]);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const [showTooltip, setShowTooltip] = useState(false);

    const triggerFileInput = () => {
      fileInput.current.click();
    };

    const navigate = useNavigate();

    const handleImageChange = async (e) => {
      e.preventDefault();
    
      // Convert FileList to array
      const files = Array.from(e.target.files);
      let totalSize = 0;
    
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
    
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920, // compress the image if it's width or height is greater than this value
          useWebWorker: true,
        };
    
        try {
          const compressedFile = await imageCompression(file, options);
          totalSize += compressedFile.size;
    
          const reader = new FileReader();
    
          reader.onloadend = () => {
            // Add each file to the businessImages array
            setBusinessImage((prevImages) => [...prevImages, reader.result]);
            console.log(reader.result);
          };
    
          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error(error);
        }
      }
    
      // Check if the total size exceeds the threshold (40MB in this case)
      const maxSize = 40 * 1024 * 1024; // 40MB
      if (totalSize > maxSize) {
        alert("The total size of the images exceeds the limit of 40MB.");
        // Consider resetting the file input or handling this case appropriately
        setBusinessImage([]);
        return;
      }
    
      // If no files were selected, reset the businessImages state
      if (files.length === 0) {
        setBusinessImage([]);
      }
    };
    

    const areInputsFilledAndTermsAgreed = () => {
      return BusinessName && BusinessSummary && BusinessImage && agreeTerms;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (BusinessPassword !== ConfirmBusinessPassword) {
        alert("Passwords do not match!");
        return;
      }

      const formData = new FormData();

      formData.append("BusinessName", BusinessName);
      formData.append("BusinessSummary", BusinessSummary);
      formData.append("BusinessImage", BusinessImage);
      formData.append("BusinessEmail", BusinessEmail);
      formData.append("BusinessAddress", BusinessAddress);
      formData.append("BusinessPostcode", BusinessPostcode);
      formData.append("BusinessCity", BusinessCity);
      formData.append("BusinessPhoneNumber", BusinessPhoneNumber);
      formData.append("BusinessPassword", BusinessPassword);
      formData.append("ConfirmBusinessPassword", ConfirmBusinessPassword);

      for (let i = 0; i < BusinessImage.length; i++) {
        formData.append("BusinessImages", BusinessImage[i]);
      }

      for (let [key, value] of formData.entries()) {
        console.log("successful");
      }

      try {
        const response = await axios.post(
          "http://localhost:5500/api/v1/business/auth/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response.data); // Assuming your backend sends back some response data
        // Show alert on successful signup
        if (response) {
          alert("Business Signup successful!");
          localStorage.removeItem("businessFormData");
          navigate("/");
          window.location.reload();
        }
        // Handle success, such as redirecting to another page
      } catch (error) {
        console.error("Error signing up:", error);
        alert(
          `Error signing up: ${error.response.data.message || error.message}`
        );
      }
    };

    return (
      <>
        <div
          className="flex flex-col items-center justify-center w-full bg-white-A700"
          style={{
            backgroundImage: `url("images/img_group_151.png")`,
            backgroundSize: "contain",
            backgroundPosition: "top right",
            backgroundRepeat: "no-repeat", // Position the background image at the top right corner
          }}
        >
          <div className="flex justify-start items-start w-full p-[39px]">
            <Link to="/">
              <h2 className="text-[24px] font-[500] text-[#037783] flex justify-center items-center mt-3">
                LiteJob
              </h2>
            </Link>
          </div>
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-row justify-center items-center w-full">
              {/* <div className="flex flex-row justify-center mt-[39px]">
                <Text size="3xl" as="p" className="!text-cyan-800_02">
                  LiteJob
                </Text>
              </div> */}
              <div className="flex flex-row justify-center w-full">
                <div className="flex flex-row justify-center items-center w-full">
                  <div className="flex flex-col items-center justify-center w-[480px] lg:border lg:border-gray-400 rounded-[8px] h-full p-[10px]  gap-[30px] z-[1]">
                    <Tabs
                      className="flex flex-col items-center justify-center w-full gap-8"
                      selectedTabClassName="!text-white-A700 bg-blue-600 rounded"
                      selectedTabPanelClassName="relative tab-panel--selected"
                      selectedIndex={1}
                      onSelect={handleTabChange}
                    >
                      <div className="flex flex-col items-center justify-start w-full gap-[18px]">
                        <a href="#">
                          <h1 className="text-center lg:text-[40px] text-[28px] font-[700]">
                            Create an Account
                          </h1>
                        </a>
                        <TabList className="flex flex-row justify-between w-[74%] gap-[72px] p-2.5 border-gray-300 border border-solid rounded-lg">
                          <Tab className="mt-px ml-6 text-gray-400 text-center text-lg font-normal cursor-pointer p-[4px]">
                            Client
                          </Tab>
                          <Tab className="mr-6 text-white-A700 text-center text-lg font-normal cursor-pointer p-[4px] text-gray-400">
                            Business
                          </Tab>
                        </TabList>
                      </div>
                      {[...Array(2)].map((_, index) => (
                        <TabPanel
                          key={`tab-panel${index}`}
                          className="items-center w-full absolute"
                        >
                          <div className="flex flex-col items-center justify-start w-full">
                            <div className="flex flex-col items-center justify-start w-full gap-[34px]">
                              <form
                                className="flex flex-col justify-start w-full gap-6"
                                onSubmit={handleSubmit}
                              >
                                <input
                                  type="text"
                                  name="BusinessName"
                                  placeholder="Name of the business"
                                  className="w-full appearance-none bg-transparent focus:outline-none focus:shadow-outline"
                                  style={{
                                    borderBottom: "1px solid black",
                                    outline: "none !important",
                                  }}
                                  value={BusinessName}
                                  onChange={(e) =>
                                    setBusinessName(e.target.value)
                                  }
                                  required
                                />
                                <label
                                  htmlFor=""
                                  className="justify-start items-start text-start"
                                >
                                  Short summary of business
                                </label>
                                <textarea
                                  type="text"
                                  name="BusinessSummary"
                                  className="w-full appearance-none bg-transparent focus:outline-none focus:shadow-outline shadow-sm h-[176px]"
                                  style={{ borderBottom: "1px solid black" }}
                                  value={BusinessSummary}
                                  onChange={(e) =>
                                    setBusinessSummary(e.target.value)
                                  }
                                />

                                <div className="mb-6">
                                  <div className="flex gap-4">
                                    <label
                                      className="block text-gray-700 text-sm font-bold mb-2"
                                      htmlFor="photo"
                                    >
                                      Photo
                                    </label>
                                    <div
                                      className="cursor-pointer border border-black p-[2px] rounded-full w-[15px] h-[15px] flex justify-center mt-[3px] items-center font-bold"
                                      onMouseEnter={() => setShowTooltip(true)}
                                      onMouseLeave={() => setShowTooltip(false)}
                                      onClick={() =>
                                        setShowTooltip(!showTooltip)
                                      }
                                    >
                                      i
                                      {showTooltip && (
                                        <div
                                          style={{
                                            position: "absolute",
                                            width: "220px",
                                            marginLeft: "16rem",
                                            marginTop: "2.5rem",
                                            color: "black",
                                            padding: "5px",
                                            borderRadius: "5px",
                                            border: "1px solid black",
                                            zIndex: "100",
                                            fontSize: "14px",
                                          }}
                                        >
                                          The photos uploaded here will form the
                                          card component
                                        </div>
                                      )}
                                    </div>

                                    {/* <div className="z-10 absolute ml-[100px]">
                                      {showImage && imageShow()}
                                    </div> */}
                                  </div>
                                  <input
                                    ref={fileInput}
                                    className="hidden"
                                    id="photo"
                                    name="file" // Add this line
                                    type="file"
                                    onChange={handleImageChange}
                                    multiple // Allow multiple files to be selected
                                    required
                                  />

                                  <div
                                    className="flex justify-center items-center cursor-pointer"
                                    onClick={triggerFileInput}
                                  >
                                    <div className="image-container lg:w-[176px] h-[176px] w-[140px] mt-12">
                                      <Swiper
                                        effect={"cards"}
                                        grabCursor={true}
                                        slidesPerView={"auto"}
                                        modules={[EffectCards]}
                                        className="mySwiper"
                                      >
                                        {BusinessImage.length > 0 ? (
                                          BusinessImage.map((image, index) => (
                                            <SwiperSlide key={index}>
                                              <div className="lg:w-[176px] h-[176px] w-full">
                                                <img
                                                  src={image}
                                                  alt={`Selected ${index}`}
                                                  className="w-full h-full object-cover"
                                                />
                                              </div>
                                            </SwiperSlide>
                                          ))
                                        ) : (
                                          <SwiperSlide>
                                            <span className="w-full h-full flex justify-center items-center bg-transparent">
                                              <img
                                                src="images/pin.svg"
                                                alt=""
                                                style={{
                                                  width: "50px",
                                                  height: "50px",
                                                }} // Adjust the size as needed
                                              />
                                            </span>
                                          </SwiperSlide>
                                        )}
                                      </Swiper>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <input
                                    className="mr-2 leading-tight border"
                                    type="checkbox"
                                    id="agreeTerms"
                                    checked={agreeTerms}
                                    onChange={(e) =>
                                      setAgreeTerms(e.target.checked)
                                    }
                                    required
                                  />
                                  <label
                                    className="text-sm"
                                    htmlFor="agreeTerms"
                                  >
                                    I agree to terms and conditions
                                  </label>
                                </div>

                                <button
                                  className={`w-full bg-[#037783] rounded-[8px] text-white py-[12px] ${
                                    !areInputsFilledAndTermsAgreed()
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                  disabled={!areInputsFilledAndTermsAgreed()}
                                  type="submit" // Ensure the button triggers form submission
                                >
                                  Create Account
                                </button>
                              </form>
                              <div className="flex flex-row justify-center w-full gap-4">
                                <a href="#" className="mb-px">
                                  <Text as="p">Already Have an Account?</Text>
                                </a>
                                <Link to="/login">
                                  <Text
                                    as="p"
                                    className="!text-cyan-800 underline"
                                  >
                                    Login
                                  </Text>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mt-4 flex gap-2 justify-center items-center">
                            <div
                              className="first-dot w-[16px] h-[16px] rounded-full bg-gray-400"
                              onClick={() => setCurrentPage(1)}
                            ></div>
                            <div
                              className={`second-dot w-[16px] h-[16px] rounded-full ${
                                currentPage === 2 ? "bg-black" : "bg-gray-400"
                              }`}
                              onClick={() => setCurrentPage(2)}
                            ></div>
                          </div>
                        </TabPanel>
                      ))}
                    </Tabs>
                    <div className="flex justify-center w-10 h-4" />
                  </div>
                  {/* <Img
                    src="images/img_group_151.png"
                    alt="image"
                    className="w-[67%] hidden ml-[-163px] object-cover"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {currentPage === 1 ? ( // Render the first business page conditionally
        <BusinessPageFirst handleContinue={handleContinue} />
      ) : currentPage === 2 ? ( // Render the second business page conditionally
        <BusinessPageSecond BusinessformData={BusinessformData} />
      ) : (
        <ClientPage /> // Render the client page conditionally
      )}
    </>
  );
}
