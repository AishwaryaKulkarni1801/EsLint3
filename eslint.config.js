import js from '@eslint/js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Global ignores
  {
    ignores: [
      'dist/**/*',
      'tmp/**/*', 
      'out-tsc/**/*',
      'bazel-out/**/*',
      'node_modules/**/*',
      '.vscode/**/*',
      '.idea/**/*',
      'coverage/**/*',
      '.jest-cache/**/*',
      '.angular/**/*',
      '*.js',
      '*.map', 
      '*.d.ts',
      '!jest.config.js'
    ]
  },
  
  // JavaScript/TypeScript files
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // Base recommended rules
      ...js.configs.recommended.rules,
      
      // TypeScript specific rules
      'no-unused-vars': 'off',
      'no-undef': 'off', // TypeScript handles this
      
      // General ESLint rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-eval': 'error',
      'no-fallthrough': 'error',
      'no-invalid-this': 'off',
      'no-multiple-empty-lines': ['error', { max: 2 }],
      'no-new-wrappers': 'error',
      'no-redeclare': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error'
    },
  },
  
  // Test files configuration
  {
    files: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        describe: 'readonly',
        it: 'readonly', 
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      // Relaxed rules for test files
      'no-unused-vars': 'off',
      'no-console': 'off'
    },
  },
];