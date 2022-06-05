module.exports = {
  testEnvironment: './custom-test-env.js',
  testPathIgnorePatterns: ['esm', 'cmj', 'ts.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
