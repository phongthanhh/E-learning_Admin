module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    ''
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', 'vite.config.ts']
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'linebreak-style': 0,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': ['off', { target: 'any' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-cycle': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/type-annotation-spacing': ['error', { after: true }]
  }
}
