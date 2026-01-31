/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        button: "var(--button)",
        "secondary-2": "var(--secondary-2)",
        text: "var(--text)",
        "text-2": "var(--text-2)",
      },
    },
  },
  plugins: [],
};
