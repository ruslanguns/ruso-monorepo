const baseConfig = require('../../jest.config');
module.exports = {
  ...baseConfig,
  rootDir: '',
  roots: ['<rootDir>/src'],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  modulePaths: ['<rootDir>/src'],
};
