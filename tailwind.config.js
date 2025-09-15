module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bxSpin: {
          "0%": { transform: "translateY(0) rotate(0deg)", borderBottomRightRadius: "4px" },
          "17%": { borderBottomRightRadius: "3px" },
          "25%": { transform: "translateY(9px) rotate(22.5deg)" },
          "50%": { transform: "translateY(18px) scale(1, .9) rotate(45deg)", borderBottomRightRadius: "40px" },
          "75%": { transform: "translateY(9px) rotate(67.5deg)" },
          "100%": { transform: "translateY(0) rotate(90deg)" },
        },
        shadow: {
          "0%, 100%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(1.2, 1)" },
        },
      },
      animation: {
        bxSpin: "bxSpin 1s linear infinite",
        shadow: "shadow 1s linear infinite",
      },
    },
  },
  plugins: [],
};