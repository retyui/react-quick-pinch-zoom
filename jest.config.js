module.exports = {
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/.setupTest.js"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/src/__mocks__/styleMock.js"
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      statements: 90
    }
  }
};
