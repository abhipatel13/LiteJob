import React, { useEffect, useState } from "react";
import Login from "../authentication/Login";
// import SignUp from '../authentication/SignUp'
import logo from "../images/logo.png";
import { Sling as Hamburger } from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/Ai";
import landingPic from "../images/landingPic.svg";
import { useDispatch, useSelector } from "react-redux";
import { Logout, selectIsLoggedIn } from "../../redux/slices/auth";
import { businessLogout } from "../../redux/slices/businessauth";

const Navbar = ({ color }) => {
  const [nav, setNav] = useState(false);
  const userAuth = useSelector((state) => state.auth);
  const businessAuth = useSelector((state) => state.businessauth);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log(businessAuth,userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("lastVisitedUrl", window.location.pathname);

    navigate("/login");
  };

  useEffect(() => {
    console.log('isLoggedIn state:', userAuth.isLoggedIn);
  }, [userAuth.isLoggedIn]);
  useEffect(() => {
    console.log('isLoggedIn state:', businessAuth.isLoggedIn);
  }, [businessAuth.isLoggedIn]);

  const handleLogout = () => {
    if (userAuth.isLoggedIn) {
      dispatch(Logout());
    } else if (businessAuth.isLoggedIn) {
      dispatch(businessLogout());
      localStorage.removeItem('businessId');
      localStorage.removeItem('userBusinessId');
    }
  };
  return (
    <div>
      <div>
        <nav className="justify-between flex relative">
          <div className="flex mr-auto justify-center items-center">
            <Link to="/">
              {/* <img className="h-[48px] w-[80px] text-white" src={logo} alt="" /> */}
              <h2 className="text-[24px] font-[500] text-white flex justify-center items-center mt-3">
                LiteJob
              </h2>
            </Link>
            {/* <a href="/"><img className=' ml-10 h-24 w-32' src={logo} alt="" /></a> */}
          </div>

          <div className="flex gap-6">
            {userAuth.isLoggedIn && (
              <button className="md:block border text-[14px] rounded-[8px] h-[40px] w-full font-medium mt-3 border-white text-white px-2 hover:bg-[#014e56] hover:opacity-90 hover:text-white hover:font-medium whitespace-nowrap">
              <Link to="/user">Go To Dashboard</Link>
            </button>
            )}

            {businessAuth.isLoggedIn && (
              <button className="md:block border text-[14px] rounded-[8px] h-[40px] w-full font-medium mt-3 border-white text-white px-2 hover:bg-[#014e56] hover:opacity-90 hover:text-white hover:font-medium whitespace-nowrap">
              <Link to="/business">Go To Dashboard</Link>
            </button>
            )}

            {isLoggedIn || businessAuth.isLoggedIn ? (
              <button
                onClick={handleLogout}
                className=" md:block bg-[#037783] text-white border text-[16px] rounded-[8px] h-[40px] w-full font-medium  mt-3 border-white px-2  hover:bg-[#014e56] hover:opacity-90 hover:text-white hover:font-medium "
              >
                {" "}
                Logout{" "}
              </button>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className=" md:block border text-[16px] rounded-[8px] h-[40px] w-[89px] font-medium  mt-3 border-white text-white hover:bg-[#014e56] hover:opacity-90 hover:text-white hover:font-medium"
                >
                  {" "}
                  Login
                </button>
                <button className=" md:block bg-[#037783] text-white border text-[16px] rounded-[8px] h-[40px] w-[89px] font-medium  mt-3 border-white  hover:bg-[#014e56] hover:opacity-90 hover:text-white hover:font-medium ">
                  {" "}
                  <Link to="/Signup">Signup</Link>{" "}
                </button>
              </>
            )}
            <div className="mt-5 absolute right-0 hidden">
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
                  ? "fixed top-0 right-0 w-[15.9375rem] h-screen bg-gray-200 z-10 duration-500"
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
                  className="items-center justify-center flex text-black border text-[16px] rounded-[8px] h-[40px]  w-[89px] font-[400] m-auto mt-8 border-white md:mt-0 hover:bg-[#014e56] hover:text-white hover:font-medium  "
                >
                  {" "}
                  Login{" "}
                </Link>
                {/* <a href="/Login" className='ml-14 font-bold text-gray-300 mb-6 hover:text-red-400'>Login</a> */}
                <Link
                  to="/SignUp"
                  className="items-center justify-center flex text-black border text-[1.125rem] rounded-full h-[3rem]  w-[9.5625rem] font-medium m-auto mt-8 border-black md:mt-0 hover:bg-[#014e56] hover:text-white hover:font-medium "
                >
                  {" "}
                  SignUp{" "}
                </Link>
                {/* <a href="/SignUp" className='ml-14 font-bold text-gray-300 mb-6 hover:text-red-400'>SignUp</a> */}
                {/* <button className=' text-white border-2 text-[1.125rem] rounded-full h-[3rem]  w-[9.5625rem] font-medium m-auto mt-8 border-neutral-50 md:mt-0 hover:bg-neutral-50 hover:text-black hover:font-medium '><a href="/contact">contact us</a></button> */}
              </div>

              <img
                className="absolute h-44 bottom-0 right-0 mb-2"
                src={landingPic}
                alt=""
              />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
