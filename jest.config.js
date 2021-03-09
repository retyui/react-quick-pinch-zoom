module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['esm', 'cmj', 'ts.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
