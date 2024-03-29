const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  rootDir: '',
  roots: ['<rootDir>/src'],
  preset: 'jest-preset-angular',
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
