module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint-config-airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: [
    'import',
    'react',
    '@typescript-eslint',
    'simple-import-sort',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.stories.*', '**/.storybook/**/*.*'],
        peerDependencies: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'linebreak-style': ['error', 'windows'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 80,
      },
    ],
    quotes: ['warn', 'single'],
    'react/display-name': 'off',
    'react/prop-types': 0,
    'no-param-reassign': ['error', { props: false }],
    semi: ['warn', 'always'],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^react',
            '^@?\\w',
            '^(\\.\\.\\/)+[A-Z]{1}[a-zA-Z]+$',
            '^\\.(?!/?$)',
            '^(\\.\\.\\/)*\\w+(-)?types\\u0000$',
            '(jpg|jpeg|png|svg)$',
            '^.+\\.?(css)$',
          ],
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
