/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        darkText: '#1F2937',
        grayText: '#6B7280',
        lightGray: '#F3F4F6',
      },
    },
  },
  plugins: [],
}
