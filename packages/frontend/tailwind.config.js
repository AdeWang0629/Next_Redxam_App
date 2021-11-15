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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
