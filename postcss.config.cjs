module.exports = {
  plugins: [
    // Nesting support must come before TailwindCSS.
    require("postcss-nesting"), // Enables native CSS nesting
    require("tailwindcss"), // Tailwind utility framework
    require("autoprefixer"), // Adds vendor prefixes for compatibility
  ],
};
