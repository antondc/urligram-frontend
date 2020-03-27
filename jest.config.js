module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(jsx?|tsx?)$': 'ts-jest',
  },
  testRegex: './src/*/.*test.tsx$',
  setupFiles: ['<rootDir>/src/shared/tools/jest/setupTests.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|svg|ttf|woff|woff2)$': '<rootDir>/tools/jest/fileMock.js',
    '\\.(css|less)$': '<rootDir>/tools/jest/styleMock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
