/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cereal", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#004047",
        primaryLight: "#7eb8be",
      },
      animation: {
        text: "text 10s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
    screens: {
      vxs: "50px",
      xs: "200px",
      sm: "400px",
      md: "600px",
      md1: "610px",
      md2: "700px",
      md3: "750px",
      lg: "800px",
      lg1: "850px",
      lg2: "950px",
      xl: "1000px",
      "2xl": "1200px",
      "4xl": "1400px",
      "5xl": "1500px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
