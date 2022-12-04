/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0.5rem",
        "sm": "1rem",
        "lg": "2.5rem",
        "xl": "3.5rem",
        "2xl": "5rem"
      }
    },
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        "gray-backgraound": "#F6F6F6",
        "primary-first": "#3EC3DC",
        secondary: "#2761BA",
        "menu-label": "#1C3C6E",
        // "neutral-40": "#6C7280",

        "primary-10": "#0C3841",
        "primary-20": "#145E6C",
        "primary-30": "#1B8497",
        "primary-40": "#05ABCA",
        "primary-50": "#3EC3DC",
        "primary-60": "#68D0E4",
        "primary-70": "#8DE1F1",
        "primary-80": "#93DDEB",
        "primary-90": "#BEEBF3",
        "primary-100": "#E9F8FB",

        "secondary-10": "#040B15",
        "secondary-20": "#0D213F",
        "secondary-30": "#163769",
        "secondary-40": "#234B88",
        "secondary-50": "#2761BA",
        "secondary-60": "#2C71DB",
        "secondary-70": "#6B99E0",
        "secondary-80": "#96B6E9",
        "secondary-90": "#C0D3F2",
        "secondary-100": "#EAF0FB",

        "tertiary-10": "#451C08",
        "tertiary-20": "#732F0D",
        "tertiary-30": "#A14212",
        "tertiary-40": "#C75216",
        "tertiary-50": "#E55E19",
        "tertiary-60": "#FF7833",
        "tertiary-70": "#ED8F5E",
        "tertiary-80": "#F2AF8C",
        "tertiary-90": "#F7CFBA",
        "tertiary-100": "#FCEFE8",

        "red-10": "#3C1811",
        "red-20": "#63281C",
        "red-30": "#993D2B",
        "red-40": "#BF4C36",
        "red-50": "#DC573E",
        "red-60": "#CC614C",
        "red-70": "#D88474",
        "red-80": "#E3A79C",
        "red-90": "#EECAC3",
        "red-100": "#F9EDEB",

        "green-10": "#006E49",
        "green-20": "#008458",
        "green-30": "#0F996B",
        "green-40": "#00B377",
        "green-50": "#00E699",
        "green-60": "#1AFFB3",
        "green-70": "#4DFFC3",
        "green-80": "#80FFD4",
        "green-90": "#B3FFE5",
        "green-100": "#E5FFF7",

        "yellow-10": "#4D3B00",
        "yellow-20": "#806200",
        "yellow-30": "#B38900",
        "yellow-40": "#E5B000",
        "yellow-50": "#FAC000",
        "yellow-60": "#FFCF33",
        "yellow-70": "#FFD64D",
        "yellow-80": "#FFE180",
        "yellow-90": "#FFEDB3",
        "yellow-100": "#FFF9E5",

        "neutral-10": "#2B2E33",
        "neutral-20": "#41454D",
        "neutral-30": "#565B66",
        "neutral-40": "#6C7280",
        "neutral-50": "#818999",
        "neutral-60": "#97A0B2",
        "neutral-70": "#B8BECC",
        "neutral-80": "#CFD6E5",
        "neutral-90": "#E6EAF2",
        "neutral-95": "#F5F8FF",
        "neutral-100": "#FFFFFF",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/colors/themes")["[data-theme=light]"],
        "primary": "#3EC3DC",
        "primary-focus": "#05ABCA",
        "primary-content": "#FFFFFF",
        "secondary": "#2761BA",
        "secondary-focus": "#234B88",
        "secondary-content": "#EAF0FB",
        "accent": "#E55E19",
        "accent-focus": "#C75216",
        "accent-content": "#FCEFE8"
      }
    }]
  }
}
