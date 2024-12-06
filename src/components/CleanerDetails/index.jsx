import { useDispatch } from "react-redux";
import { Button, Text, Img, Heading } from "..";
import { useNavigate } from "react-router-dom";
import { setBusinessDetails } from "../../redux/slices/businessSlice";

export default function CleanerDetails({
  title,
  desc,
  rating,
  price,
  star,
  id,
  businessAuth,
  businessCity,
  ...props
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    // Convert the title to a URL-friendly format (a slug)
    const titleSlug = title.toLowerCase().split(" ").join("-");

    dispatch(setBusinessDetails({ id, title, desc, rating, businessAuth,businessCity }));

    localStorage.setItem("businessId", id);

    navigate(`/profile/${titleSlug}`);
  };

  return (
    <div {...props}>
      <div className="flex flex-row justify-between items-start w-full">
        <div className="flex items-center justify-start">
          <Heading size="s" as="h1" className="mt-1 text-[10px]">
            {title}
          </Heading>
          <div className="online w-[12px] h-[18px] ml-2">
            <div className="bg-green-500 w-[12px] h-[12px] rounded-full mt-[2px]"></div>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center w-[17%] gap-2">
          <Text as="p" className="tracking-[-0.43px] !font-lexend">
            {rating}
          </Text>
          <div className="flex flex-col items-center justify-start h-[18px] w-[18px]">
            <Img
              src={star}
              alt="image"
              className="h-[18px] w-[18px] rounded-bl-[1px] rounded-br-[1px]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-start items-start w-full">
        <div className="flex justify-start items-start w-full">
          <Text
            as="p"
            className="tracking-[-0.43px] overflow-hidden overflow-ellipsis h-[3em]"
          >
            {desc.split(" ").slice(0, 20).join(" ") +
              (desc.split(" ").length > 20 ? "..." : "")}
          </Text>
        </div>
      </div>

      <div className="flex flex-row justify-between w-full gap-3">
        <div className="flex flex-row justify-start w-[48%] py-[11px]">
          <Text as="p" className="mt-px tracking-[-0.43px] !font-lexend">
            <span className="text-black-900 font-satoshi text-xl font-bold">
              £{price}/{" "}
            </span>
            <span className="text-black-900 font-satoshi text-xs font-light">
              avg
            </span>
          </Text>
        </div>
        <Button
          onClick={handleButtonClick}
          className="py-[12px] w-[139px] h-[44px] font-[400] text-white bg-[#037783] text-[16px] rounded-[8px] justify-end"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
}
