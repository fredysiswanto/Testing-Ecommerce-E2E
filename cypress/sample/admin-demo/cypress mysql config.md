### Verify if you have MYSQL

1- Through your terminal, make sure that you have `mysql` by running:

```bash
which mysql
```

2- If you got the path means you have `mysql` and you can verify mysql status by running:

```bash
brew services list
```

You will find `mysql` as `stopped` status

3- If you don't have mysql path, then you need to install:

```bash
brew install mysql
```

4- Start `mysql` if you just install or incase you have `stopped` status

```bash
brew services start mysql
```

5- Connect to `mysql` via:

```bash
mysql -h localhost -uUSER_NAME -p;
```

and on password, click enter (without password), however, you can setup a password...

6- Create your db:

```bash
create database NAME_OF_YOUR_DB;
```

7- If you have a DB dump on your local, then import by running from CLI, or simply import from mysqlWorkbench GUI:

```bash
mysql -h YOUR_HOST -uYOUR_USERNAME -pYOUR_PASSWORD SCHEMA_NAME < ~/PATH_TO_YOUR_DUMP_FILE/DUMP_NAME.sql
```

7- Now you have you tables, you can query or work through GUI (MYSQLWorkbench)

### Setup cypress to integrate your DB:

1- On your cypress root, run the below command to have node.js Client for MySQL protocol:

```bash
npm install mysqljs/mysql
```

2- In yopur cypress project, you need to add the following in `plugins/index.js`

```js
const mysql = require('mysql');
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db);
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
  // Usage: cy.task('queryDb', query)
  on('task', {
    queryDb: (query) => {
      return queryTestDb(query, config);
    },
  });
};
```

keeping in mind that `const connection` is loading db from `env` object

3- Add the follwoing to `cypress.json`

```json
"db": {
      "host": "127.0.0.1",
      "user": "YOUR_USERNAME",
      "password": "YOUR_PASSWORD"
    }
```

4- Now, in your `spec.js` file you can call `cy.task` as following:

```js
cy.task(
  'queryDb',
  `SELECT * FROM SCHEMA_NAME.TABLE_NAME WHERE COLUMNS_NAME='VALUE'`
);
```

5- Incase you need to run any assertion:

```js
cy.task(
  'queryDb',
  `SELECT * FROM SCHEMA_NAME.TABLE_NAME WHERE COLUMNS_NAME='VALUE'`
).then((count) => {
  expect(count).to.have.lengthOf(1);
});
```
