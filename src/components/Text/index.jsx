import React from "react";

const sizes = {
  xs: "text-sm font-normal leading-[19px]",
  lg: "text-xl font-normal leading-[150%]",
  s: "text-base font-normal leading-[150%]",
  "2xl": "text-[32px] font-medium leading-[44px]",
  "3xl": "text-4xl font-medium leading-[49px]",
  "4xl": "text-5xl font-medium leading-[65px]",
  xl: "text-2xl font-medium leading-[30px]",
  md: "text-lg font-normal leading-[22px]",
};

const Text = ({ children, className = "", as, size = "s", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-black-900 font-satoshi ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
