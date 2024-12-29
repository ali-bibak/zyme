/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "border-gray": "#343434",
        "primary-green": "#3B8C73",
      },
    },
  },
  plugins: [],
};
