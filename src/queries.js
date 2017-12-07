/* eslint-disable */

const dbConnection = require('./databases/db_connection.js');

const emailInDatabase = (email, cb) => {
	dbConnection.query('SELECT CASE WHEN EXISTS (SELECT * FROM users WHERE username=$1) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END', [email], (err, res) => {
		if (err) {
			cb(err)
		} else {
			cb(null, parseInt(res.rows[0].case))
		};
	});
};

const addUser = (email,password,cb) => {
	dbConnection.query('INSERT INTO users(username,password) VALUES($1,$2)',[email,password],(err,res) => {
		console.log(res.rows);
		if(err) cb(err)
		else cb(null,res);
	})
}

const getHash = (email, cb) => {
	dbConnection.query('SELECT password FROM users WHERE username=$1', [email], (err, res) => {
		if (err) cb(err);
		else cb(null, res);
	})
}

module.exports = {emailInDatabase,addUser, getHash};