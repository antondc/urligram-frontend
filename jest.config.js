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
    '^Root(.*)$': ['<rootDir>$1'],
    '^Redux(.*)$': ['<rootDir>/src/shared/redux$1'],
    '^Modules(.*)$': ['<rootDir>/src/shared/redux/modules$1'],
    '^Common(.*)$': ['<rootDir>/src/shared/common$1'],
    '^Components(.*)$': ['<rootDir>/src/shared/components$1'],
    '^Assets(.*)$': ['<rootDir>/src/shared/assets$1'],
    '^Routes(.*)$': ['<rootDir>/src/shared/routes$1'],
    '^Tools(.*)$': ['<rootDir>/src/shared/tools$1'],
    '^Services(.*)$': ['<rootDir>/src/shared/services$1'],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
