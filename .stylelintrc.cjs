/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard-scss'],
  overrides: [
    {
      files: ['**/*.{css,scss,sass}'],
      customSyntax: 'postcss-scss'
    }
  ],
  rules: {
    'color-function-notation': null,
    'color-function-alias-notation': null,
    'alpha-value-notation': null,
    'selector-class-pattern': null,
    'font-family-name-quotes': null
  }
};
