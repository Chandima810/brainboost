/** @type {import('tailwindcss').Config} */
export default {
  // Enable dark mode via system preference
  darkMode: 'media', // or 'class' if you want manual toggling

  // Where Tailwind should look for class names
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],

  // Extend theme with custom settings if needed
  theme: {
    extend: {
      colors: {
        brandIndigo: '#4f46e5', // example custom color
        brandPurple: '#7c3aed', // example custom color
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },

  // Add plugins if needed (forms, typography, etc.)
  plugins: [],
};
