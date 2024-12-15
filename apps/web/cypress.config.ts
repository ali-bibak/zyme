const cypress = require("cypress");

module.exports = cypress.defineConfig({
  e2e: {
    baseUrl: "http://localhost:1234",
    // eslint-disable-next-line
    // @ts-ignore
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/index.js",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
