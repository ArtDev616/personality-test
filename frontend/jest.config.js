module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testEnvironment: "node",
  globals: {
    "babel-jest": {
      diagnostics: {
        warnOnly: true,
      },
    },
  },

  setupFilesAfterEnv: ["./src/setupTests.js"],
};
