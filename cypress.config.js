
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const { defineConfig } = require("cypress");

const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
const { sqlQueryPlugin } = require("cypress-multiple-db-sql-server");

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  // reporter: 'mocha-junit-reporter',
  //reporterOptions: {
  //    mochafile: 'cypress/reports/junitreport-[hash].xml',
  //  toConsole: true
  //}


  /* reporter: 'cypress-mochawesome-reporter',
   reporterOptions: {
     
   reportDir: 'test-report',
   overwrite:  false,
   saveJson: true,
   saveHtml: true,
 
   reportFilename: 'cypressreport',
   timestamp: 'yyyy_mm_dd_hh_MM',
   
   
     charts: true,
     reportPageTitle: 'custom-title',
     embeddedScreenshots: true,
     inlineAssets: true,
     saveAllAttempts: false,
   },*/
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
  reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
  mochawesomeReporterOptions: {
  reportDir: 'cypress/reports',
  overwrite:  false,
  saveJson: true,
  saveHtml: true,
 
  reportFilename: 'cypressreport',
  timestamp: 'yyyy_mm_dd_hh_MM',
    
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  mochaJunitReporterReporterOptions: {
    reportDir: 'cypress/reports',
    //mochafile: 'cypress/reports/junitreport-[hash].xml',
    mochafile: 'junitreport-[hash].xml',
    toConsole: true
  },
  },
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  taskTimeout: 80000,
  pageLoadTimeout: 150000,


  e2e: {
    specPattern: ["cypress/e2e/features/*.feature", "cypress/e2e/*.cy.js"],
    env: {
      allureReuseAfterSpec: true,
    },
    setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);

      // implement node event listeners here

      on('task', { downloadFile })
      on('task', { ...sqlQueryPlugin });
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
      });

      preprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );
      allureWriter(on, config);

      return config;

    },
    env: {



      appUrl: 'https://www.amazon.in',
      titlekeyword: "Online Shopping",
      payload: { 'key1': 'val1', 'key2': 'val2' },
      env1: 'https://www.amazon.in',
      env2: 'https://www.amazon.in/Refrigerators',
      env3: 'https://www.flipkart.com/',
      db: {
        authentication: {
          type: 'default',
          options: {
            userName: 'sa',
            password: 'sqladmin@123'
          }
        },
        server: '172.16.0.56',
        options: {
          database: '',
          encrypt: true,
          rowCollectionOnRequestCompletion: true,
          trustServerCertificate: true,
          port: 1433, // Default Port
        }
      }
    },

    defaultCommandTimeout: 15000,

    retries: 1
  },

});
