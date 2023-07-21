module.exports = {
  root: true,
  extends: [
    '@react-native',
    'prettier',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-key': ['error'],
    'no-console': ['error', { allow: ['info', 'error'] }],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
          },
        ],
      },
    ],
    'react/no-unstable-nested-components': [
      'warn',
      {
        allowAsProps: true,
      },
    ],
  },
};
