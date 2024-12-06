import React from "react";
import { Text } from "./..";

export default function DesktopFourFaqsection({
  heading = "Frequently asked questions",
  para = "Everything you need to know is here",
  question = "Can I get a quote before hiring a professional?",
  description = "Yes, you can request quotes from different professionals. They will provide an estimated cost based on the details of your project, allowing you to make an informed decision.",
  question1 = "What types of services are offered through LiteJob?",
  description1 = "We offer a wide range of services including, but not limited to, plumbing, electrical work, carpentry, landscaping, painting and general maintenance.",
  question2 = "What if i am not satisfied with the work done?",
  description2 = "Customer satisfaction is our top priority. If you’re not satisfied with the work, please contact us immediately. We will work with you and the service provider to resolve any issues",
  question3 = "How do I pay for services?",
  description3 = "For your convenience and security, we use Stripe, a leading online payment processing platform, for all transactions. Once you have selected a professional for your project, you can pay securely through our platform using your credit or debit card. However, payments made by cash or outside the platform will not be recorded in our database and consequently, we cannot be held liable for any work provided.",
  question4 = "Can I leave a review for the professional hired?",
  description4 = "Absolutely! We encourage you to leave a review after the completion of your project. Your feedback is invaluable to us and helps other homeowners, businesses and individuals make informed decisions.",
  question5 = "Is LiteJob available globally?",
  description5 = "LiteJob operates exclusively within the United Kingdom. If a professional or business is listed in your city or nearby areas on our platform, their services are available to you. We are continuously working to expand our reach to include more cities and regions within the UK, providing comprehensive coverage for everybody’s needs.",
  ...props
}) {
  return (
    <div {...props}>
      <div className="flex flex-col items-center justify-start w-full gap-16 my-4 max-w-7xl px-3">
        <div className="flex flex-col items-center justify-start lg:w-3/5 w-full gap-[15px]">
          <div className="flex flex-row justify-center w-full">
            <h2
              className="lg:text-[48px] lg:font-[500] text-[35px] font-[700] lg:text-center"
            >
              {heading}
            </h2>
          </div>
          <div className="flex flex-row lg:justify-center justify-start w-full pt-1 px-1">
            <p className="lg:text-[18px] text-[14px] font-[400] lg:text-center">
              {para}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="w-full gap-8 lg:grid-cols-3 grid-cols-1 grid min-h-[auto]">
            <div className="flex flex-col items-center justify-start w-full lg:pb-[88px] pb-[48px] gap-3">
              <div className="flex flex-row justify-center w-full">
                <h2 className="text-[24px] font-[700] lg:font-[500]">
                  {question}
                </h2>
              </div>
              <div className="flex flex-row justify-center w-full">
                <Text as="p" className="!text-blue_gray-800 !leading-6">
                  {description}
                </Text>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full gap-3 lg:pb-[88px] pb-[48px]">
              <div className="flex flex-row justify-center w-full ">
              <h2 className="text-[24px] font-[700] lg:font-[500]">
                  {question1}
                </h2>
              </div>
              <div className="flex flex-row justify-center w-full">
                <Text as="p" className="!text-blue_gray-800 !leading-6">
                  {description1}
                </Text>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full gap-3 lg:pb-[88px] pb-[48px]">
              <div className="flex flex-row justify-center w-full">
              <h2 className="text-[24px] font-[700] lg:font-[500]">
                  {question2}
                </h2>
              </div>
              <div className="flex flex-row justify-center w-full">
                <Text as="p" className="!text-blue_gray-800 !leading-6">
                  {description2}
                </Text>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full gap-[7px] lg:pb-[88px] pb-[48px]">
              <div className="flex flex-row justify-start w-full">
              <h2 className="text-[24px] font-[700] lg:font-[500]">
                  {question3}
                </h2>
              </div>
              <div className="flex flex-row justify-center w-full">
                <Text as="p" className="!text-blue_gray-800 !leading-6">
                  {description3}
                </Text>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full gap-3 lg:pb-[88px] pb-[48px]">
              <div className="flex flex-row justify-center w-full">
              <h2 className="text-[24px] font-[700] lg:font-[500]">
                  {question4}
                </h2>
              </div>
              <div className="flex flex-row justify-center w-full">
                <Text as="p" className="!text-blue_gray-800 !leading-6">
                  {description4}
                </Text>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full pb-11 gap-[7px] lg:pb-[88px] pb-[48px]">
              <div className="flex flex-row justify-start w-full">
              <h2 className="text-[24px] font-[700] lg:font-[500]">
                  {question5}
                </h2>
              </div>
              <div className="flex flex-row justify-center w-full">
                <Text as="p" className="!text-blue_gray-800 !leading-6">
                  {description5}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
