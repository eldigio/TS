/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/main.ts", "./lib/**/*.ts", "./components/**/*.ts"],
  theme: {
    extend: {
      keyframes: {
        "alert-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
      },
      animation: {
        "alert-out": "alert-out 0.25s ease-out",
      },
    },
  },
  plugins: [require("daisyui")],
};
