/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        foreground: "#161414",
        "muted-foreground": "#9A9897",
        accent: "#FF1115",
        surface: "#FAF8F8",
        "surface-warm": "#FBF1E9",
        "surface-muted": "#E4D7CD",
        "border-subtle": "#D9D9D9",
      },
      fontFamily: { sans: ["Poppins", "sans-serif"] },
      borderRadius: { DEFAULT: "10px" },
    },
  },
  plugins: [],
};
