import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  'plugin:react/recommended',            // React-specific linting rules
  'plugin:jsx-a11y/recommended',         // Accessibility rules for JSX
  'plugin:react-hooks/recommended',      // React Hooks rules
  'prettier',                            // Disable formatting rules that conflict with Prettier
  'plugin:@typescript-eslint/recommended', // TypeScript-specific linting rules
];

export default [
  {
    ignores: ['node_modules', '.next', 'build', 'dist'], // Ignore unnecessary files
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      env: {
        browser: true,
        node: true,
        es2021: true,
      },
    },
    plugins: ['react', 'jsx-a11y', 'react-hooks', '@typescript-eslint'],
    extends: eslintConfig,
    rules: {
      'react/prop-types': 'off', // Disable PropTypes check when using TypeScript
      'react/react-in-jsx-scope': 'off', // React 17+ no longer requires React to be in scope
      'jsx-a11y/anchor-is-valid': [
        'warn',
        {
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off', // Allow any type in TypeScript (customize as needed)
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the version of React
      },
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parser: '@typescript-eslint/parser',
        plugins: ['@typescript-eslint'],
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:react/recommended',
          'plugin:jsx-a11y/recommended',
          'plugin:react-hooks/recommended',
          'prettier',
        ],
        rules: {
          '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' type for flexibility in TypeScript files
        },
      },
    ],
  },
];
