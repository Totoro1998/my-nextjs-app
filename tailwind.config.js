/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "360px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      fontSize: {
        sm: "0.875rem",
      },
      colors: {
        primary: {
          light: "#60A3F9",
          medium: "rgba(0, 81, 255, 0.70)",
          DEFAULT: "#006efa",
          selcted: "#D7E3FD",
          selctedHover: "rgba(96, 163, 249, 0.18)",
          nav: "#D7E3FD",
          thead: "rgba(215, 227, 253, 0.70)",
        },
        gray: {
          placeholder: "rgba(150, 141, 141, 0.60)",
          DEFAULT: "rgba(0, 3, 20, 0.54)",
          input: "rgba(0, 3, 20, 0.70)",
          heavy: "#A9B7D4",
          nav: "#5B5B5B",
          radio: "#D4D4D8",
          icon: "#968D8D",
        },
        myWhite: {
          DEFAULT: "rgba(255, 255, 255, 0.95)",
        },
        red: {
          DEFAULT: "#FA4E38",
        },
      },
      borderWidth: {
        1.5: "1.5px",
      },
    },
  },
  plugins: [],
  plugins: [require("@tailwindcss/typography")],
});
