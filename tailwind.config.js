/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: "#ECEDE7",
          card: "#FFFFFF",
          surface: "#F1EEE9",
          glow: "#F6ECEA",
          soft: "#FAF8F5",
        },
        charcoal: {
          DEFAULT: "#1C1917",
          muted: "rgba(28, 25, 23, 0.62)",
          subtle: "rgba(28, 25, 23, 0.40)",
          border: "rgba(28, 25, 23, 0.08)",
        },
        blush: {
          DEFAULT: "#E8B4B8",
          deep: "#C98A93",
          light: "#F6ECEA",
          soft: "#FBF3F4",
          gradientEnd: "#8A5A62",
        },
        champagne: {
          DEFAULT: "#C9A66B",
          light: "#DFCA9E",
          dark: "#A78349",
          hairline: "rgba(201, 166, 107, 0.25)",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Playfair Display", "Georgia", "serif"],
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "SF Pro Text", "sans-serif"],
      },
      boxShadow: {
        'luxe': '0 20px 40px -15px rgba(201, 138, 147, 0.12)',
        'luxe-hover': '0 25px 50px -12px rgba(201, 138, 147, 0.22)',
        'btn': '0 8px 24px -4px rgba(201, 138, 147, 0.35)',
        'card': '0 10px 30px -10px rgba(28, 25, 23, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.98)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

