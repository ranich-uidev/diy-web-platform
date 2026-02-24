import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "../../apps/**/*.{ts,tsx}", // Scan the consuming app
  ],
  theme: {
    extend: {
      colors: {
        // We link these to the CSS variables in index.css
        primary: "var(--color-primary)",
        medical: {
          blue: "var(--color-medical-primary)",
        },
        finance: {
          green: "var(--color-finance-primary)",
        }
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
    },
  },
  plugins: [animate],
};

export default config;