module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "react/jsx-sort-props": "error",
    "react/jsx-filename-extension": [1, { allow: "as-needed" }],
    "require-jsdoc": 0,
    quotes: ["error", "double"]
  }
};
