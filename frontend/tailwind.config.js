export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF5ED",
          100: "#FFE5D4",
          200: "#FFCAA8",
          300: "#FFA770",
          400: "#FF8040",
          500: "#FF6B35",
          600: "#F05A24",
          700: "#CC4417",
          800: "#A33616",
          900: "#843117",
        },
        accent: {
          50: "#FFF1F5",
          100: "#FFE0EB",
          200: "#FFBDD6",
          300: "#FFB3D9",
          400: "#FF7DB8",
          500: "#FF5999",
          600: "#F03A7A",
          700: "#D02460",
          800: "#AC2050",
          900: "#901F47",
        },
        soft: {
          50: "#FDF2F8",
          100: "#FCE7F3",
          200: "#FBCFE8",
          300: "#F9A8D4",
          400: "#F472B6",
          500: "#EC4899",
          600: "#DB2777",
          700: "#BE185D",
          800: "#9D174D",
          900: "#831843",
        },
      },
      fontFamily: {
        // poppins: ["Poppins", "sans-serif"],
        righteous: ["Righteous", "cursive"],
      },
      animation: {
        fadeInDown: "fadeInDown 0.6s ease-out",
        fadeInUp: "fadeInUp 0.6s ease-out both",
        fadeInRight: "fadeInRight 0.8s ease-out",
        blob: "blob 7s infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scroll-up": "scroll-up 20s linear infinite",
        "scroll-down": "scroll-down 25s linear infinite",
        "scroll-up-slow": "scroll-up-slow 30s linear infinite",
        "scroll-right": "scroll-right 30s linear infinite",
        "scroll-left": "scroll-left 35s linear infinite",
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "scroll-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "scroll-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "scroll-up-slow": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "scroll-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};
