/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// };

const mysql = require('mysql');
const { FacebookSocialLogin } = require('cypress-social-logins').plugins;
function queryTestDb(query) {
  // creates a new mysql connection
  // const query = 'DELETE FROM ec_customer_addresses WHERE id >= 12';
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_ecommerce',
  });

  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        // console.log(results)
        return resolve(results);
      }
    });
  });
}

module.exports = (on, config) => {
  on('task', {
    queryDb: (query) => {
      return queryTestDb(query, config);
    },
    FacebookSocialLogin: FacebookSocialLogin,
  });
};
