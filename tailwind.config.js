/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "blue-dark": "#4d5b9e",
        "yellow-light": "#fffad1",
        "blue-light": "#deebf8",
        "violet-light": "#d6dbf5",
        "pink-light": "#f7d9db",
        "green-light": "#94d7a2",
        dark: "#1a212d",
        grey: "#34414a",
      },
      fontFamily: {
        base: "Poppins, sans-serif",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
