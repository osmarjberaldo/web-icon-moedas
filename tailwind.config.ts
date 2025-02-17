
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FFC107",
          foreground: "#1A1B1E",
        },
        secondary: {
          DEFAULT: "#4CAF50",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#252629",
          foreground: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#252629",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#252629",
          foreground: "#FFFFFF",
        },
        status: {
          ready: "#4CAF50",
          pending: "#FFC107",
          booked: "#3B82F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Clash Display", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
