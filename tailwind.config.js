/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
 }
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["fantasy"],
  },
}