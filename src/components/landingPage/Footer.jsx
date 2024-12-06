import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="relative h-[10rem] bg-[#FFFFFF] ">
      <div className="flex lg:justify-between lg:flex-row flex-col lg:gap-5 gap-4 absolute left-0 bottom-0 mb-5 text-zinc-500 text-sm w-full">
        <div className="lg:px-4">2024 LiteJob. All rights reserved.</div>
        <div className="flex lg:px-4">
          <div className="hover:text-black mr-5">
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <div className="hover:text-black mr-5">
            <Link to="/terms">Terms of Service</Link>
          </div>
          <div className="hover:text-black mr-5">
            <Link to="/help">Cookies Settings</Link>
          </div>
          {/* <div className='hover:text-black'><Link to='/privacy'>Privacy Policy</Link></div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
