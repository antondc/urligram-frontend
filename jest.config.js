module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(jsx?|tsx?)$': 'ts-jest',
  },
  testRegex: './src/*/.*test.(jsx?|tsx?)$',
  setupFiles: ['<rootDir>/src/shared/tools/jest/setupTests.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|svg|ttf|woff|woff2)$': '<rootDir>/src/shared/tools/jest/fileMock.ts',
    '\\.(css|less)$': '<rootDir>/src/shared/tools/jest/styleMock.ts',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
