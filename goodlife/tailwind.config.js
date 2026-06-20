/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FBF6EE",
          200: "#F5EBDB",
        },
        clay: {
          50: "#FBF1EC",
          100: "#F3DDD2",
          200: "#E6BBA8",
          300: "#D7977C",
          400: "#C67857",
          500: "#B15F3D",
          600: "#964C30",
          700: "#793D27",
          800: "#5C2F1F",
        },
        sage: {
          50: "#F4F6F1",
          100: "#E5EADD",
          200: "#C9D4BA",
          300: "#ABBC96",
          400: "#8DA476",
          500: "#71885C",
          600: "#586B46",
        },
        ink: {
          400: "#7A7569",
          500: "#5C574C",
          600: "#433F36",
          700: "#2F2C26",
          800: "#1F1D18",
        },
      },
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink[700]"),
            "--tw-prose-headings": theme("colors.ink[800]"),
            "--tw-prose-links": theme("colors.clay[600]"),
            "--tw-prose-bold": theme("colors.ink[800]"),
            "--tw-prose-quotes": theme("colors.clay[700]"),
            "--tw-prose-quote-borders": theme("colors.clay[300]"),
            maxWidth: "70ch",
            fontSize: "1.125rem",
            lineHeight: "1.8",
            a: { textDecoration: "underline", textDecorationColor: theme("colors.clay[300]"), fontWeight: "500" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
