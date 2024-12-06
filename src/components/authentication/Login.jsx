import { Link } from "react-router-dom";
import UserLoginForm from "./UserLoginForm";

const LoginPage = () => {
  // const [isClientLogin, setIsClientLogin] = useState(true);

  // const toggleSignupType = () => {
  //   setIsClientLogin((prevState) => !prevState);
  // };

  return (
    <div
      style={{
        backgroundImage: `url("images/img_group_151.png")`,
        backgroundSize: "contain",
        backgroundPosition: "top right",
        backgroundRepeat: "no-repeat", // Position the background image at the top right corner
      }}
    >
      <div className="p-4 flex justify-between items-center gap-6">
        <div className="flex justify-start items-start w-full">
          <Link to="/">
            <h2 className="text-[24px] font-[500] text-[#037783] flex justify-center items-center mt-3">
              LiteJob
            </h2>
          </Link>
        </div>
        {/* <button
          className="bg-gray-200 rounded-lg py-2 px-4 mr-2"
          onClick={toggleSignupType}
        >
          {isClientLogin ? "Business Login" : "Client Login"}
        </button> */}
      </div>
      <div className="w-full h-full">
        <UserLoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
