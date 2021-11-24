module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#6FC50B",
        "darker-primary": "#219653",
        "lighter-black": "#2A3037",
        accent: "#CA7795",
        "calculator-bg": "#e7ebee80",
        question: "#828282",
        "footer-bg": "#F0FCE3",
        "buttons-green": "#ace96b",
        "palette-gray": "#CBD1D4",
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        flip: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(180deg)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        flip: "flip 0.5s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
