import React from "react";
import { Text, Img } from "./..";

export default function DesktopFourRowtimeSaving({ timeSavingOne = "images/defaultNoData.png", ...props }) {
  return (
    <div {...props}>
      <div className="flex flex-col items-center justify-start h-9 w-9">
        <Img src={timeSavingOne} alt="time_saving_one" className="h-9 w-9" />
      </div>
      <div className="flex flex-col items-start justify-start w-[90%] gap-2">
        <Text size="2xl" as="p">
          Time Saving
        </Text>
        <Text as="p">
          Quick and easy searches with filters. Find the right professionals and businesses in one place, tailored to
          your budget.
        </Text>
      </div>
    </div>
  );
}
