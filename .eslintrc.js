module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'plugin:react/jsx-runtime',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            env: {
                browser: true,
                es2021: true,
                jest: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', 'prettier'],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/prop-types': 0,
        'react/destructuring-assignment': [0],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/no-array-index-key': 0,
        'react/jsx-no-bind': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-no-useless-fragment': 0,
        'label-has-associated-control': 0,
    },
};
