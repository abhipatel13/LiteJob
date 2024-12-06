import React from "react";
import PropTypes from "prop-types";

const shapes = {
  circle: "rounded-[50%]",
  round: "rounded-lg",
  square: "rounded-[0px]",
};
const variants = {
  fill: {
    cyan_800_01: "bg-cyan-800_01 text-white-A700",
    gray_50_02: "bg-gray-50_02 text-deep_purple-400",
    blue_600: "bg-blue-600 text-white-A700",
    white_A700: "bg-white-A700 shadow-md",
    blue_gray_50_e8: "bg-blue_gray-50_e8",
    blue_gray_50: "bg-blue_gray-50 text-cyan-800_02",
    cyan_800: "bg-cyan-800 text-white-A700",
    cyan_50: "bg-cyan-50",
    cyan_800_02: "bg-cyan-800_02 text-white-A700",
  },
  outline: {
    blue_gray_100_02: "border-blue_gray-100_02 border border-solid text-black-900",
    cyan_800_02: "border-cyan-800_02 border border-solid text-cyan-800_02",
    white_A700: "border-white-A700 border border-solid text-white-A700",
  },
};
const sizes = {
  md: "h-[34px] px-6 text-lg",
  xl: "h-10 px-2.5",
  xs: "h-5 px-[5px]",
  "4xl": "h-12 px-6 text-base",
  lg: "h-9 px-[35px] text-sm",
  "2xl": "h-10 px-5 text-base",
  "3xl": "h-11 px-5 text-base",
  sm: "h-6 px-0.5",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "square",
  variant = "fill",
  size = "sm",
  color = "cyan_800_02",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["circle", "round", "square"]),
  size: PropTypes.oneOf(["md", "xl", "xs", "4xl", "lg", "2xl", "3xl", "sm"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf([
    "cyan_800_01",
    "gray_50_02",
    "blue_600",
    "white_A700",
    "blue_gray_50_e8",
    "blue_gray_50",
    "cyan_800",
    "cyan_50",
    "cyan_800_02",
    "blue_gray_100_02",
  ]),
};

export { Button };
