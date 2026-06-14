import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#f7f9fc",
                foreground: "#191c1e",
                primary: {
                    DEFAULT: "#00256f",
                    foreground: "#ffffff",
                },
                accent: {
                    DEFAULT: "#00256f",
                    foreground: "#ffffff",
                },
                muted: {
                    DEFAULT: "#f2f4f7",
                    foreground: "#444651",
                },
            },
            fontFamily: {
                headline: ["var(--font-headline)", "Manrope", "system-ui", "sans-serif"],
                body: ["var(--font-body)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
                sans: ["var(--font-body)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.125rem",
                lg: "0.25rem",
                xl: "0.5rem",
                "2xl": "0.75rem",
                full: "9999px",
            },
        },
    },
    plugins: [],
};
export default config;
