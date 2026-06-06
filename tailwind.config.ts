import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        panel: "#101822",
        panel2: "#0c131c",
        line: "rgba(255,255,255,.11)",
        brand: "#2f80ff",
        gold: "#f6c453"
      },
      boxShadow: {
        glow: "0 20px 80px rgba(47,128,255,.16)"
      }
    }
  },
  plugins: []
};

export default config;
