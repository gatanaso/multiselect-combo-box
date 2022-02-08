/* eslint-env node */
module.exports = {
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    include: ['src/*'],
    threshold: {
      statements: 98,
      branches: 87,
      functions: 98,
      lines: 98
    }
  }
};
