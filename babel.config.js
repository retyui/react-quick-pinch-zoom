module.exports = {
  presets: [
    "@babel/preset-flow",
    [
      "@babel/preset-env",
      {
        modules: false,
        loose: false
      }
    ],
    "@babel/preset-react"
  ],
  plugins: ["@babel/plugin-proposal-class-properties"]
};
