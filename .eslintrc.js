module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    indent: ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'no-console': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    'arrow-parens': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    'no-duplicate-imports': ['warn', { includeExports: false }],
    'no-redeclare': 0,
    'no-dupe-keys': 0,
    'no-debugger': 0,
    'newline-before-return': 'error',
    'no-multi-spaces': 'error',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
