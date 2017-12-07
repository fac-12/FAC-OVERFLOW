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

const loadPost = (cb) => {
	dbConnection.query('SELECT post.id, post.title, post.text_post, users.username FROM post, users WHERE users.id=post.postuser_id', (err, res) => {
		if (err) cb(err);
		else cb(null, res);
	})
}

const loadComments = (postID, cb) => {
	dbConnection.query(`SELECT users.username, comments.text_comments FROM users, comments WHERE users.id=comments.commentuser_id AND comments.post_id=${postID}`, (err, res) => {
		if (err) cb(err);
		else cb(null, res.rows);
	})
}

module.exports = {emailInDatabase,addUser, getHash, loadPost};