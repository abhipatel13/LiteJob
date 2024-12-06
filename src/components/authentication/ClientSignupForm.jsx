import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/auth";

const ClientSignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(localStorage.getItem("lastVisitedUrl") || "/");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  Handle client signup form submission

    //  Create an object with the form data
    const formData = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
    };
    dispatch(register(formData));
    console.log(
      "form submitted",
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      agreeToTerms
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 lg:flex-row lg:flex w-full ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#014e56]">
          Create an account
        </h2>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-black"
                  >
                    {" "}
                    First Name{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="shadow-sm pl-1 h-8 focus:shadow-md  outline-none w-full sm:text-sm border-gray-700 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-black"
                  >
                    {" "}
                    Last Name{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="shadow-sm pl-1 h-8 focus:shadow-md  outline-none w-full sm:text-sm border-gray-700 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-black"
                  >
                    {" "}
                    Email Address{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      id="email-address"
                      name="email-address"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="shadow-sm pl-1 h-8 focus:shadow-md  outline-none w-full sm:text-sm border-gray-700 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="shadow-sm pl-1 h-8 focus:shadow-md  outline-none w-full sm:text-sm border-gray-700 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-black"
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="shadow-sm pl-1 h-8 focus:shadow-md  outline-none w-full sm:text-sm border-gray-700 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="agree-to-terms"
                    name="agree-to-terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="agree-to-terms"
                    className="ml-2 block text-sm text-black"
                  >
                    {" "}
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {" "}
                      terms and conditions{" "}
                    </a>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className={classNames(
                      "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#014e56] hover:bg-[#062c30] focus:outline-none",
                      { "opacity-50 cursor-not-allowed": !agreeToTerms }
                    )}
                    disabled={!agreeToTerms || loading}
                  >
                    {" "}
                    {loading ? "Loading..." : "Create Account"}
                  </button>
                </div>
              </div>
            </form>
            {/* <div className="justify-center items-center flex pt-3 text-black">Already have an account?<Link to='/Login' className="pl-1 text-[#014e56]">Login</Link></div> */}
            <Link
              to="/Login"
              className="flex justify-center mt-4 text-sm text-[#014e56] font-light"
            >
              <span className="text-black pr-1">Have an account?</span> Login{" "}
            </Link>
          </div>
        </div>
      </div>

      <div className=" xl:w-1/3 justify-center items-center text-[#014e56] px-8 py-12 hidden lg:flex lg:flex-row h-[25rem] ">
        <p className="text-xl font-medium">
          Sign up as a client to find the best services for your needs.
        </p>
      </div>
    </div>
  );
};

export default ClientSignupForm;
