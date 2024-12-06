import { useEffect, useState } from "react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { businessRegister } from "../../redux/slices/businessauth";

const BusinessSignupForm = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postcode, setPostcode] = useState('');
  const [road, setRoad] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.businessauth.loading);
  const error = useSelector((state) => state.businessauth.error);
  const isLoggedIn = useSelector((state) => state.businessauth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(localStorage.getItem("lastVisitedUrl") || "/");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = {
    BusinessName: businessName,
    BusinessEmail: email,
    BusinessAddress: road,
    BusinessPostcode: postcode,
    BusinessPhoneNumber: phoneNumber,
    BusinessPassword: password,
    ConfirmBusinessPassword: confirmPassword,
    businesses: "64a9683c3fc1727eec119294"
    };
    dispatch(businessRegister(formData))
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 lg:flex lg:flex-row">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-[#014e56]">
          Create a business account
        </h2>
      

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <form onSubmit={handleSubmit}>

                <div className="mt-4">
                  <label htmlFor="business-name" className="block text-sm font-medium text-black"> Business Name </label>
                  <div className="mt-1">
                    <input id="business-name" name="business-name" type="text" autoComplete="business-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required className="shadow-sm pl-1 h-8 focus:shadow-md outline-none block w-full sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-black"> Business Email </label>
                  <div className="mt-1">
                    <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="shadow-sm pl-1 h-8 focus:shadow-md outline-none block w-full sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-black"> Business Phone Number </label>
                  <input id="phone" type="tel" className="shadow-sm pl-1 h-8 focus:shadow-md outline-none block w-full sm:text-sm border-gray-300 rounded-md" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>

                <div className="mt-4">
                  <label htmlFor="road" className="block text-sm font-medium text-black">Business Address </label>
                  <input id="road" type="text" className="shadow-sm pl-1 h-8 focus:shadow-md outline-none block w-full sm:text-sm border-gray-300 rounded-md" value={road} onChange={(e) => setRoad(e.target.value)} />
                </div>  

                <div className="mt-4">
                  <label htmlFor="postcode" className="block text-sm font-medium text-black"> Postcode </label>
                  <input id="postcode" type="text" className="shadow-sm pl-1 h-8 focus:shadow-md outline-none block w-full sm:text-sm border-gray-300 rounded-md" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
                </div>  

                <div className="mt-4">
                  <label htmlFor="password" className="block text-sm font-medium text-black"> Password </label>
                  <div className="mt-1">
                    <input id="password" name="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="shadow-sm pl-1 h-8 focus:shadow-md outline-none block w-full sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>

                
                <div className="mt-4">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-black"> Confirm Password </label>
                  <div className="mt-1">
                    <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="shadow-sm pl-1 h-8 focus:shadow-md outline-none block w-full sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>

                <div className="flex items-center mt-5">
                  <input id="agree-to-terms" name="agree-to-terms" type="checkbox" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} required className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                  <label htmlFor="agree-to-terms" className="ml-2 block text-sm text-gray-900"> I agree to the{" "}
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> terms and conditions</a>
                  </label>
                </div>

                <div className="mt-6">
                  <button type="submit" disabled={!agreeToTerms || isSubmitting} className={classNames("w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#014e56] hover:bg-[#062c30] focus:outline-none ", {"opacity-50 cursor-not-allowed": !agreeToTerms || isSubmitting,})}>
                    {
                      isSubmitting ? "Signing up..." : "Create account"
                    }
                  </button>
                </div>
              </form>
              {/* <div className="justify-center items-center flex pt-3 text-black">Already have an account?<Link to='/Login' className="pl-1 text-[#014e56]">Login</Link></div> */}
              <Link to='/Login' className=" mt-4 text-sm text-[#014e56] font-light justify-center flex"><span className="text-black pr-1">Have an account?</span> Login </Link> 

            </div>
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

  export default BusinessSignupForm;
