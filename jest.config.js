module.exports = {
  roots: ['<rootDir>/packages'],
  testMatch: ['**/__tests__/*.test.(ts|js)?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverageFrom: [
    'packages/*/src/**/*.{js,jsx,ts,tsx}',
    '!packages/*/src/**/*.stories.{js,jsx,ts,tsx}',
    '!packages/*/src/types/*.ts',
  ],
};
