const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '7r91y1',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://lojaebac.ebaconline.art.br/"
  },
});
