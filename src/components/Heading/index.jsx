import React from "react";

const sizes = {
  "3xl": "text-5xl font-bold leading-[60px]",
  "2xl": "text-[40px] font-bold leading-[54px]",
  xl: "text-[28px] font-bold leading-[38px]",
  s: "text-lg font-bold leading-[25px]",
  md: "text-xl font-bold leading-[27px]",
  xs: "text-base font-bold leading-[150%]",
  lg: "text-2xl font-bold leading-[33px]",
};

const Heading = ({ children, className = "", size = "lg", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-black-900 font-satoshi ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
