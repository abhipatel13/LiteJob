import { Text, RatingBar, Img } from "./..";

export default function DesktopNineColumnbob({
  firstName,
  lastName,
  rating,
  review,
  createdAt,
  ...props
}) {
  let date = new Date(createdAt);
  let formattedDate = `${date.getDate()} ${date.toLocaleString(
    "default",
    { month: "long" }
  )} ${date.getFullYear()}`;
  return (
    <div {...props}>
      <div className="flex flex-row justify-between items-center w-full">
  <div className="flex flex-row justify-start w-1/5 gap-6">
    <Img
      src="images/img_ellipse_2659.png"
      alt="bob_parkson_one"
      className="h-11 w-11 rounded-[50%]"
    />
    <div className="flex flex-col items-start justify-start w-[58%] pt-0.5 gap-[3px]">
      <Text as="p" className="!font-medium" style={{ whiteSpace: 'nowrap' }}>
        {firstName} {lastName}
      </Text>
      <RatingBar
        starCount={rating}
        value={3}
        isEditable={true}
        color="#fcbc45"
        activeColor="#fcbc45"
        size={16}
        className="flex justify-between w-20 rounded-[1px]"
      />
    </div>
  </div>
  <Text as="p" className="!font-medium">
    {formattedDate}
  </Text>
</div>

      <div className="flex flex-col items-start justify-start w-full gap-[5px]">
        <Text as="p" className="!font-medium">
          {review}
        </Text>
        {/* {!!showmore ? (
          <Text as="p" className="!text-lime-700 !font-medium">
            {showmore}
          </Text>
        ) : null} */}
      </div>
    </div>
  );
}
