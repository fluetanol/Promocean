// frontend/tailwind.config.ts

import type { Config } from "tailwindcss";
// import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0094ff",
        secondary: "#a6fbfc",
        background: "#fdfdfc",
        text: "#343434",
        "dark-mode": "#213477",
      },
    },
  },
  plugins: [
    // daisyui,
    typography,
  ],
} satisfies Config;

export const daisyuiThemes = {
  themes: [
    {
      promeocean: {
        primary: "#0094ff",
        secondary: "#a6fbfc",
        accent: "#4b7cf7",
        neutral: "#343434",
        "base-100": "#fdfdfc",
        info: "#93e3ff",
        success: "#36d399",
        warning: "#fbbd23",
        error: "#f87272",
      },
    },
    "light",
  ],
};

export default config;
