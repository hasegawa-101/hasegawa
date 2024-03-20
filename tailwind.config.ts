/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.75rem",
      "4xl": "2rem",
      "5xl": "2.25rem",
      "6xl": "2.5rem",
    },
    extend: {
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
      borderColor: {
        DEFAULT: "rgb(var(--border-color-DEFAULT) / <alpha-value>)",
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme, addVariant, addUtilities }) => {
      matchUtilities(
        {
          "grid-cols-auto-fill": (value, extra) => ({
            gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))`,
          }),
          "grid-cols-auto-fit": (value, extra) => ({
            gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))`,
          }),
          pbl: (value, extra) => ({
            paddingBlock: value,
          }),
          mbs: (value) => ({
            marginBlockStart: value,
          }),
          mbe: (value) => ({
            marginBlockEnd: value,
          }),
          mis: (value) => ({
            marginInlineStart: value,
          }),
          mie: (value) => ({
            marginInlineEnd: value,
          }),
          "space-b": (value) => ({
            "& > :not([hidden]) ~ :not([hidden])": {
              "--tw-space-b-reverse": "0",
              "margin-block-start": `calc(${value} * calc(1 - var(--tw-space-b-reverse)))`,
              "margin-block-end": `calc(${value} * var(--tw-space-b-reverse))`,
            },
          }),
          "space-i": (value) => ({
            "& > :not([hidden]) ~ :not([hidden])": {
              "--tw-space-i-reverse": "0",
              "margin-inline-start": `calc(${value} * calc(1 - var(--tw-space-i-reverse)))`,
              "margin-inline-end": `calc(${value} * var(--tw-space-i-reverse))`,
            },
          }),
        },
        { values: theme("spacing") },
      );
      addUtilities({
        ".space-b-reverse > :not([hidden]) ~ :not([hidden])": {
          "--tw-space-b-reverse": "1",
        },
        ".space-i-reverse > :not([hidden]) ~ :not([hidden])": {
          "--tw-space-i-reverse": "1",
        },
      });
      matchUtilities(
        {
          "border-lb": (value) => ({
            borderBlockStartWidth: value,
            borderBlockEndWidth: value,
          }),
          "border-li": (value) => ({
            borderInlineStartWidth: value,
            borderInlineEndWidth: value,
          }),
        },
        { values: theme("borderWidth") },
      );
      matchUtilities(
        {
          "border-bs": (value) => ({
            borderBlockStartWidth: value,
          }),
          "border-be": (value) => ({
            borderBlockEndWidth: value,
          }),
          "border-is": (value) => ({
            borderInlineStartWidth: value,
          }),
          "border-ie": (value) => ({
            borderInlineEndWidth: value,
          }),
        },
        { values: theme("borderWidth") },
      );
      matchUtilities(
        {
          "block-start": (value) => ({
            "inset-block-start": value,
          }),
          "block-end": (value) => ({
            "inset-block-end": value,
          }),
        },
        {
          values: theme("inset"),
        },
      );
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("hover", [
        "@media (any-hover: hover) { &:where(:any-link, :enabled, summary):hover }",
      ]);
      // group-hover
      // addVariant("group-hover", [
      //   "@media (any-hover: hover) { &:merge(.group):hover & }",
      // ]);
      addVariant("optional", "&:optional");
      addVariant(
        "group-optional",
        "@media (any-hover: hover) { &:merge(.group):hover & }",
      );
      // peer-hover

      // addVariant("group-hover", ["@media (any-hover: hover) { &:hover }"]);
      // addVariant("peer-hover", ["@media (any-hover: hover) { & ~ *:hover }"]);
    }),
  ],
};
