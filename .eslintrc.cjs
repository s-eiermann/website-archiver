module.exports = {
    "env": {
        "browser": false
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "client/tsconfig.json",
        "sourceType": "module"
    },
    "overrides": [
        {
            "files": ['*.ts', '*.tsx'], // Your TypeScript files extension
        }
    ],
    "rules": {
        "max-len": ["error", { "code": 80 }],
        "quotes": ["warn", "single"],
        "semi": ["warn", "never"],
        "indent": ["error", 2, {
            "SwitchCase": 1
        }],
        "keyword-spacing": ["error", { "before": true }],
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "no-extra-parens": "off",
        "@typescript-eslint/no-unused-vars": "off" // TODO: remove
    }
}

