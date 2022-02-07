const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error'
};

module.exports = {
  env: { es6: true },
  root: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      env: {
        browser: true,
        es2021: true
      },
      extends: [
        'standard-with-typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jsx-a11y/strict',
        'plugin:import/typescript',
        'plugin:functional/external-recommended',
        'plugin:functional/no-mutations',
        'plugin:functional/no-object-orientation',
        'prettier'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      },
      plugins: [
        'react',
        '@typescript-eslint',
        'jsx-a11y',
        'import',
        'react-hooks',
        'unicorn',
        'prefer-arrow',
        'functional'
      ],
      rules: {
        'no-void': RULES.OFF,
        'no-console': RULES.ERROR,
        'line-comment-position': [RULES.ERROR, 'above'],
        'multiline-comment-style': [RULES.ERROR, 'starred-block'],
        'padding-line-between-statements': [
          RULES.ERROR,
          { blankLine: 'always', prev: '*', next: 'return' }
        ],
        'prefer-arrow-callback': RULES.ERROR,

        'react/prop-types': RULES.OFF,
        'react/jsx-uses-react': RULES.OFF,
        'react/react-in-jsx-scope': RULES.OFF,
        'react/jsx-fragments': [RULES.ERROR, 'element'],
        'react/function-component-definition': [
          RULES.ERROR,
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function'
          }
        ],
        'react/destructuring-assignment': [RULES.ERROR, 'always'],
        'react/boolean-prop-naming': [
          RULES.OFF,
          {
            rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
            message:
              'boolean props should be named with the "is" or "has" prefix and start capitalized',
            validateNested: true
          }
        ],
        '@typescript-eslint/prefer-readonly-parameter-types': RULES.OFF,

        '@typescript-eslint/array-type': [RULES.ERROR, { default: 'generic' }],
        '@typescript-eslint/no-unused-vars': RULES.ERROR,
        '@typescript-eslint/explicit-module-boundary-types': RULES.ERROR,
        '@typescript-eslint/no-non-null-assertion': RULES.OFF,
        '@typescript-eslint/unbound-method': RULES.OFF,
        '@typescript-eslint/consistent-type-definitions': RULES.OFF,
        '@typescript-eslint/triple-slash-reference': RULES.OFF,
        '@typescript-eslint/strict-boolean-expressions': RULES.OFF,
        '@typescript-eslint/prefer-nullish-coalescing': RULES.OFF,

        'jsx-a11y/label-has-for': RULES.OFF,

        'import/export': RULES.ERROR,
        'import/exports-last': RULES.ERROR,
        'import/first': RULES.ERROR,
        'import/group-exports': RULES.ERROR,
        'import/newline-after-import': RULES.ERROR,
        'import/no-absolute-path': RULES.ERROR,
        'import/no-cycle': [RULES.ERROR, { ignoreExternal: true }],
        'import/no-default-export': RULES.ERROR,
        'import/no-deprecated': RULES.ERROR,
        'import/no-extraneous-dependencies': [
          RULES.ERROR,
          { optionalDependencies: false }
        ],
        'import/no-named-as-default': RULES.ERROR,
        'import/no-named-default': RULES.ERROR,
        'import/no-namespace': RULES.ERROR,
        'import/no-self-import': RULES.ERROR,
        'import/no-useless-path-segments': [
          RULES.ERROR,
          { noUselessIndex: true }
        ],
        'import/no-webpack-loader-syntax': RULES.ERROR,

        'react-hooks/rules-of-hooks': RULES.ERROR,
        'react-hooks/exhaustive-deps': RULES.ERROR,

        'unicorn/filename-case': RULES.ERROR,

        'prefer-arrow/prefer-arrow-functions': [
          RULES.ERROR,
          { disallowPrototype: true }
        ],

        'functional/prefer-readonly-type': RULES.OFF,
        'functional/no-mixed-type': RULES.OFF,
        'functional/no-loop-statement': RULES.ERROR,
        'functional/immutable-data': [
          RULES.ERROR,
          {
            ignoreImmediateMutation: true,
            ignoreAccessorPattern: ['*.current', '*.current.*', '*.displayName']
          }
        ]
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    }
  ]
};
