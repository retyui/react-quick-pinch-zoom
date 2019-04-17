module.exports = {
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/.setupTest.js"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      statements: 90
    }
  },
  coveragePathIgnorePatterns: ["/node_modules/"]
};
