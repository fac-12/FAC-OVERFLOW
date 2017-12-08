const fs = require('fs');

const buildDatabase = () => {
  const connection = require('./db_connection');
  const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

  connection.query(sql, (err, result) => {
    if (err) {
      console.log('The database failed and wasn\'t build');
      cb(err);
    } else {
      console.log('The database is build successfully');
      cb(null, result);
    }
  });

};

buildDatabase();

module.exports = buildDatabase;
