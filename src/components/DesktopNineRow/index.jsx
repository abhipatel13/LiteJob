import React from "react";
import { Button, Heading, Img, Slider, Text } from "./..";

export default function DesktopNineRow({
  joshscleaning = "Josh’s Cleaning Service",
  description = "Josh is a professional cleaning service that provides high-quality cleaning services to homes and businesses in Kentucky. We offer a wide range of services. we are dedicated to providing exceptional cleaning services that transform your space into a spotless and inviting environment. With our team of highly trained and experienced cleaners, we offer a comprehensive range of cleaning solutions tailored to meet your specific needs.",
  price = "Total $89",
  select = "Select",
  ...props
}) {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <div {...props}>
      <div className="flex flex-col items-center justify-start w-full gap-3">
        <div className="flex flex-row justify-start w-full gap-3">
          <div className="flex flex-col items-start justify-start w-3/4 pt-[3px] gap-[9px]">
            <Heading size="md" as="h1" className="!text-blue_gray-900_02">
              {joshscleaning}
            </Heading>
            <Text as="p" className="!text-blue_gray-600 tracking-[-0.43px]">
              {description}
            </Text>
          </div>
          <div className="h-[150px] w-[24%] relative">
            <Slider
              autoPlay
              autoPlayInterval={2000}
              responsive={{ 0: { items: 1 }, 550: { items: 1 }, 1050: { items: 1 } }}
              renderDotsItem={(props) => {
                return props?.isActive ? (
                  <div className="h-1.5 w-1.5 mr-2 bg-gray_600_01" />
                ) : (
                  <div className="h-1.5 w-1.5 mr-2 bg-white-A700" />
                );
              }}
              activeIndex={sliderState}
              onSlideChanged={(e) => {
                setSliderState(e?.item);
              }}
              ref={sliderRef}
              className="justify-center w-full left-0 bottom-0 right-0 top-0 m-auto absolute"
              items={[...Array(3)].map(() => (
                <React.Fragment key={Math.random()}>
                  <div className="flex flex-row justify-end items-center h-[150px] p-2 mx-auto bg-[url(/public/images/img_frame_1000004231.png)] bg-cover bg-no-repeat rounded-lg">
                    <Button className="w-6 my-[55px] rotate-[-90deg]">
                      <Img src="images/img_icon_white_a700.svg" />
                    </Button>
                  </div>
                </React.Fragment>
              ))}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <Heading size="md" as="h2" className="tracking-[-0.43px]">
            {price}
          </Heading>
          <Button size="lg" shape="round" className="min-w-[200px]">
            {select}
          </Button>
        </div>
      </div>
    </div>
  );
}
