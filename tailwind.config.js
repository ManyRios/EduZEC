/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "300px",
      md: "830px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
