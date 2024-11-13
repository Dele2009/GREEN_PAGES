import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    colors: {
      main_color: "#019934",
      dash_main_color: "#084808",
      dash_sub_color: "#022E1E",
      dash_primary: "#075228",
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
