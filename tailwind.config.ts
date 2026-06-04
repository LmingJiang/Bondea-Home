import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "sans-serif"],
        display: ["Instrument Serif", "serif"],
      },
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        "surface-soft": "hsl(var(--surface-soft))",
        "text-primary": "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        stroke: "hsl(var(--stroke))",
        accent: "hsl(var(--accent))",
        "accent-soft": "hsl(var(--accent-soft))",
        cream: "hsl(var(--cream))",
        linen: "hsl(var(--linen))",
        coffee: "hsl(var(--coffee))",
        sage: "hsl(var(--sage))",
      },
      animation: {
        "scroll-down": "scroll-down 1.8s ease-in-out infinite",
        "role-fade-in": "role-fade-in 0.45s ease-out",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "gentle-float": "gentle-float 6s ease-in-out infinite",
        "soft-reveal": "soft-reveal 0.9s ease-out both",
      },
      keyframes: {
        "scroll-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        "role-fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "gentle-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "soft-reveal": {
          "0%": { opacity: "0", filter: "blur(8px)", transform: "translateY(20px)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [animate],
} satisfies Config;
