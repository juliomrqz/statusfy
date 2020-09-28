module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["@nuxtjs", "plugin:prettier/recommended"],
  // required to lint *.vue files
  plugins: ["prettier"],
  rules: {
    indent: ["error", 2, { MemberExpression: "off" }]
  }
};
