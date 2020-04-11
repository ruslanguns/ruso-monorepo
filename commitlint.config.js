module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'chore',
        'revert',
        'feat',
        'fix',
        'improvement',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'all',
        'service',
        'module',
        'interceptor',
        'integration',
        'deps',
        'docs',
        'release',
        'common',
      ],
    ],
  },
};
