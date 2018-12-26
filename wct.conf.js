module.exports = {
  verbose: false,
  plugins: {
    istanbul: {
      dir: './coverage',
      reporters: ['text-summary', 'lcov'],
      include: ['**/multiselect-combo-box*.html'],
      exclude: [],
      thresholds: {
        global: {
          statements: 100
        }
      }
    },
    local: {
      browsers: ['chrome'],
      browserOptions: {
        chrome: [
          'headless',
          'disable-gpu',
          'no-sandbox'
        ],
      }
    }
  }
};
