/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}"
];
export const theme = {
  extend: {
    colors: {
      primary: "#0187e3", // deep indigo
      accent: "#3B82F6", // sky-blue
    },
    fontFamily: {
      sans: ["Lato", "sans-serif"]
    }
  }
};
export const plugins = [];
