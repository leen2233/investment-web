const config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,jsx}",
    "./index.html",
    "./src/**/*.{js,jsx}",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom neon colors
        neon: {
          blue: "#00b4ff",
          cyan: "#00ffff",
          purple: "#9d4edd",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        spin: "spin 5s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-blue":
          "linear-gradient(90deg, rgba(0, 180, 255, 0) 0%, rgba(0, 180, 255, 0.3) 50%, rgba(0, 180, 255, 0) 100%)",
        "glow-cyan":
          "linear-gradient(90deg, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.3) 50%, rgba(0, 255, 255, 0) 100%)",
        "glow-purple":
          "linear-gradient(90deg, rgba(157, 78, 221, 0) 0%, rgba(157, 78, 221, 0.3) 50%, rgba(157, 78, 221, 0) 100%)",
      },
      boxShadow: {
        neon: "0 0 5px theme('colors.neon.purple'), 0 0 20px theme('colors.neon.purple')",
        "neon-blue":
          "0 0 5px theme('colors.neon.blue'), 0 0 20px theme('colors.neon.blue')",
        "neon-cyan":
          "0 0 5px theme('colors.neon.cyan'), 0 0 20px theme('colors.neon.cyan')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
