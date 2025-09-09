import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // EduGems color palette
        gem: {
          ruby: "hsl(var(--gem-ruby))",
          emerald: "hsl(var(--gem-emerald))",
          sapphire: "hsl(var(--gem-sapphire))",
          topaz: "hsl(var(--gem-topaz))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        odia: ['Noto Sans Oriya', 'Noto Sans', 'sans-serif'],
        playful: ['Fredoka One', 'cursive'],
      },
      backgroundImage: {
        'gradient-temple': 'var(--gradient-temple)',
        'gradient-sky': 'var(--gradient-sky)', 
        'gradient-gem': 'var(--gradient-gem)',
        'gradient-monument': 'var(--gradient-monument)',
      },
      boxShadow: {
        'temple': 'var(--shadow-temple)',
        'gem': 'var(--shadow-gem)',
        'card': 'var(--shadow-card)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // Gamification Animations
        "gem-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "gem-collect": {
          "0%": { transform: "scale(1) translateY(0)", opacity: "1" },
          "50%": { transform: "scale(1.5) translateY(-20px)", opacity: "0.8" },
          "100%": { transform: "scale(0) translateY(-50px)", opacity: "0" }
        },
        "path-glow": {
          "0%": { opacity: "0.6" },
          "100%": { opacity: "1", filter: "brightness(1.2)" }
        },
        "monument-build": {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "100%": { transform: "scaleY(1)", opacity: "1" }
        },
        "quest-unlock": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        // Original animations
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        // EduYatra Custom Animations
        "gem-float": "gem-float 3s ease-in-out infinite",
        "gem-collect": "gem-collect 0.8s ease-out forwards",
        "path-glow": "path-glow 2s ease-in-out infinite alternate",
        "monument-build": "monument-build 1s ease-out forwards",
        "quest-unlock": "quest-unlock 0.6s ease-out forwards",
        // Original animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
