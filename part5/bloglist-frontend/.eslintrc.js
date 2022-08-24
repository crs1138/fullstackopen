module.exports = {
    env: {
        browser: true,
        es6: true,
        'jest/globals': true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: '2020',
        sourceType: 'module',
    },
    plugins: ['react', 'jest'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        eqeqeq: 'error',
        'no-trailing-spaces': 'error',
        'arrow-spacing': ['error', { before: true, after: true }],
        'no-console': 'off',
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        'no-unused-vars': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
