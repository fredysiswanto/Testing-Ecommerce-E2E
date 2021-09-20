var mysql = require('mysql');

const clearDatabase = function () {
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_demo_admin_fs',
  });

  con.connect(function (err) {
    if (err) throw err;
    var sql = 'DELETE FROM users WHERE id >= 130';
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log('Number of records deleted: ' + result.affectedRows);
    });
  });
};

module.exports = {
  clearDatabase,
};
