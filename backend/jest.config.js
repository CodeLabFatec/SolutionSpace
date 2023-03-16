module.exports = {
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  coverageProvider: 'babel',
  coverageDirectory: 'coverage',
  roots: [
    '<rootDir>/src',
    '<rootDir>/test'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/test/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
