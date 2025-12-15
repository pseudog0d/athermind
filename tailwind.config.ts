import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                primary: ['"Space Grotesk"', 'sans-serif'],
                secondary: ['Inter', 'sans-serif'],
                mono: ['"Roboto Mono"', 'monospace'],
            },
            colors: {
                background: '#141414',
                foreground: '#f8f8f8',
                accent: '#0078B4',
            },
            borderWidth: {
                '3': '3px',
                '5': '5px',
                '6': '6px',
                '8': '8px',
            },
        },
    },
    plugins: [],
};

export default config;
