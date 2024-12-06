import React from "react";
import { Text, Button, Img } from "./..";

export default function DesktopNineFaqitem({
  question = "Question text goes here",
  description = "LiteJob operates exclusively within the United Kingdom. If a professional or business is listed in your city or nearby areas on our platform, their services are available to you. We are continuously working to expand our reach to include more cities and regions within the UK, providing comprehensive coverage for everybody’s needs.",
  ...props
}) {
  return (
    <div {...props}>
      <div className="flex flex-row justify-between items-center w-full">
        <Text size="xl" as="p" className="!text-blue_gray-800 !font-inter">
          {question}
        </Text>
        <Button className="w-6">
          <Img src="images/img_accordion_icon.svg" />
        </Button>
      </div>
      <Text as="p" className="!text-blue_gray-800 !font-inter !leading-6">
        {description}
      </Text>
    </div>
  );
}
