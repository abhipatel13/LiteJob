import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { unwrapResult } from "@reduxjs/toolkit";
import { businessLogin } from "../../redux/slices/businessauth";

export default function UserLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const { loading, error, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const makeToast = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const userType = event.target.userType.value;
  //   let url = "http://localhost:5500/api/v1/users/login";
  //   let data = {
  //     data: {
  //       user: {
  //         Email: event.target.elements.email.value,
  //         Password: event.target.elements.password.value,
  //       },
  //     },
  //   };

  //   // console.log("Email:", email);
  //   // console.log("Password:", password);

  //   if (userType === "business") {
  //     url = "http://localhost:5500/api/v1/business/auth/login";
  //     data = {
  //       BusinessEmail: email,
  //       BusinessPassword: password,
  //     };
  //   }

  //   try {
  //     console.log("Data to be sent:", data);
  //     const response = await axios.post(url, data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("Response:", response);

  //     if (response && response.data.token) {
  //       localStorage.setItem("authToken", response.data.token);
  //       alert("Login Successful");

  //       // Dispatch the login action and handle the result
  //       // console.log("Before dispatching login action");
  //       // let resultAction;
  //       // try {
  //       //   resultAction = await dispatch(login(response.data));
  //       //   console.log("Result action:", resultAction);
  //       // } catch (error) {
  //       //   console.error("Error dispatching login action:", error);
  //       // }
  //       // console.log("After dispatching login action");

  //       // console.log("Before unwrapping result");
  //       // const originalPromiseResult = unwrapResult(resultAction);
  //       // console.log("Original promise result:", originalPromiseResult);
  //       // console.log("After unwrapping result");

  //       console.log("Before navigation");
  //       navigate(localStorage.getItem("lastVisitedUrl") || "/");
  //       console.log("After navigation");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Login Failed", error.message);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userType = event.target.userType.value;
    let data = {
      data: {
        user: {
          Email: event.target.elements.email.value,
          Password: event.target.elements.password.value,
        },
      },
    };

    if (userType === "business") {
      data = {
        data: {
          user: {
            BusinessEmail: event.target.elements.email.value,
            BusinessPassword: event.target.elements.password.value,
          },
        },
      };
    }

    try {
      // Dispatch the login or businessLogin action based on userType
      const actionResult =
        userType === "business"
          ? await dispatch(businessLogin(data))
          : await dispatch(login(data));

      const loginResponse = unwrapResult(actionResult);

      if (loginResponse && loginResponse.token) {
        localStorage.setItem("authToken", loginResponse.token);
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.businesses && user.businesses.length > 0) {
          const businessId = user.businesses[0]; // Assuming you want to set the first business ID

          // Set the businessId in localStorage
          localStorage.setItem("userBusinessId", businessId);
        }
        alert("Login Successful");
        navigate(localStorage.getItem("lastVisitedUrl") || "/");
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed", error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.removeItem("lastVisitedUrl");
    }
  }, [isLoggedIn]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate(localStorage.getItem("lastVisitedUrl") || "/");
  //     // console.log("logged in");
  //     makeToast("Login Successful");
  //   }
  // }, [isLoggedIn]);
  // useEffect(() => {
  //   console.log(error?.message);
  // }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:max-w-2xl mx-auto">
        <div className="flex flex-col items-center my-5">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 md:p-10 w-full  landscape:md2:w-[80%] rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-8">Login</h2>
              <Link
                to="/signup"
                className="block text-sm text-black font-light mb-7"
              >
                {" "}
                Create an account?{" "}
              </Link>
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-black font-bold mb-2"
              >
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="email@example.com"
                onChange={handleEmailChange}
                className="border-gray-400 border-2 p-2 w-full rounded-lg"
                required
                autoFocus
                style={{
                  border: isEmailFocused ? "2px solid #014e56" : "none",
                }}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-black font-bold mb-2"
              >
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                id="password"
                minLength={8}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                className="border-gray-400 border-2 p-2 w-full rounded-lg focus:border-[#014e56]"
                required
                autoFocus
                style={{
                  border: isPasswordFocused ? "2px solid #014e56" : "none",
                }}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              <div className="flex flex-col mt-2">
                <label htmlFor="" className="block text-black font-bold mb-2">
                  Select user type
                </label>
                <select name="userType" required>
                  <option value="client">Client</option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>
            {error && (
              <div className="text-red-500 font-bold text-center mb-2">
                {error?.message}
              </div>
            )}

            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-3 bg-[#014e56] hover:bg-[#062c30] text-white font-bold rounded-lg"
              >
                Continue
              </button>
              <Link
                to="/forgottenPassword"
                className="block mt-4 text-sm text-black font-light"
              >
                Forgotten your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
