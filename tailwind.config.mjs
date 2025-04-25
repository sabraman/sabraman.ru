/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["JetBrains Mono", "monospace"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Based on 1.2 ratio as specified in design.md
        xs: ["0.694rem", { lineHeight: "1rem" }],
        sm: ["0.833rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.2rem", { lineHeight: "1.75rem" }],
        xl: ["1.44rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.728rem", { lineHeight: "2rem" }],
        "3xl": ["2.074rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.488rem", { lineHeight: "2.5rem" }],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
    },
  },
  plugins: [],
};
