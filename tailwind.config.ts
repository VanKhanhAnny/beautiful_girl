import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ["var(--font-merriweather)", "Merriweather", "serif"],
        favorit: ["var(--font-favorit)", "Merriweather", "serif"],
        inter: ["var(--font-inter)", "Merriweather", "serif"],
        fira: ["var(--font-fira)", "monospace"],
      },
      colors: {
        gray: {
          25: "#FBFBFF",
          200: "#E1E1E5",
          350: "#BBBBBF",
          450: "#949498",
          600: "#616165",
          700: "#4E4E52",
          800: "#2C2C33",
          850: "#1A1A1F",
          900: "#101014",
          1000: "#0B0B0C",
        },
        blue: {
          DEFAULT: "#809bce",
          dark: "#6a85b3", 
          light: "#c6def1",
          link: "#3498db",
        },
        green: {
          spring: "#4CAF50",
          dark: "#388E3C",
          light: "#E8F5E9",
        },
        primary: {
          DEFAULT: "#809bce",
          dark: "#6a85b3", 
          light: "#c6def1",
        },
        secondary: {
          DEFAULT: "#4CAF50",
          dark: "#388E3C", 
          light: "#E8F5E9",
        },
        danger: "#e74c3c",
        warning: "#f1c40f",
        text: {
          primary: "#2c3e50",
          secondary: "#7f8c8d",
        },
        background: {
          light: "#f8f9fa",
          dark: "#2c3e50",
        }
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
