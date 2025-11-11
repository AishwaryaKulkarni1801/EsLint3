const { pathsToModuleNameMapper } = require('ts-jest');
const fs = require('fs');
const path = require('path');

// Read tsconfig.json and strip comments
function readTsConfig() {
  try {
    const tsConfigPath = path.join(__dirname, 'tsconfig.json');
    const tsConfigContent = fs.readFileSync(tsConfigPath, 'utf8');
    // Remove comments from JSON content
    const jsonString = tsConfigContent
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove /* */ comments
      .replace(/\/\/.*$/gm, ''); // Remove // comments
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Could not read tsconfig.json, using empty paths');
    return { compilerOptions: { paths: {} } };
  }
}

const { compilerOptions } = readTsConfig();

/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  
  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  
  // Root directory for Jest
  rootDir: '.',
  
  // Test environment
  testEnvironment: 'jsdom',
  
  // Module file extensions
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  
  // Transform files
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  
  // Module name mapping for Angular imports
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  
  // Test file patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|js)',
    '<rootDir>/src/**/*.(test|spec).(ts|js)',
  ],
  
  // Files to ignore
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)',
  ],
  
  // Coverage configuration
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary', 'lcov'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/test.ts',
    '!src/environments/**',
  ],
  
  // Coverage thresholds (optional)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Resolver for modules
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks after each test
  restoreMocks: true,
  
  // Verbose output
  verbose: false,
  
  // Cache directory
  cacheDirectory: '<rootDir>/.jest-cache',
};