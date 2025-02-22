/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        purse: ["Purple Purse", 'ui-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        text: "hsl(var(--text))",
        subText: "hsl(var(--sub-text))",
        btnGo: "hsl(var(--btn-go))",
        btn2: "hsl(var(--btn-2))",
        btnHome:"hsl(var(--btn-home))",
        inputLogin: "hsl(var(--input-login))",
        tst: {
          text: "hsl(var(--tst-text))",
          success: {
            DEFAULT: "hsl(var(--tst-success))",
            foreground: "hsl(var(--tst-success-foreground))",
          },
          error: {
            DEFAULT: "hsl(var(--tst-error))",
            foreground: "hsl(var(--tst-error-foreground))",
          },
          warning: {
            DEFAULT: "hsl(var(--tst-warning))",
            foreground: "hsl(var(--tst-warning-foreground))",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
