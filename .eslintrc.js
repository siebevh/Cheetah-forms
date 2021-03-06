module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'no-plusplus': 'off',
    'no-prototype-builtins': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
