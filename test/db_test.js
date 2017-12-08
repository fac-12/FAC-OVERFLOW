/*eslint-disable*/

const test = require('tape');
const dbBuild = require('../src/databases/db_build.js');
const queries = require('../src/queries.js');
const dbConnection = require('../src/databases/db_connection.js');

test('Tape is working', (t) => {
  const num = 1;
  t.equal(num, 1, 'One should equal one');
  t.end();
});

test('addUserToDB', (t) => {
	dbBuild((err,res) => {
		const newUser = { username: 'shannonj@gmail.com', password: '$2a$10$qNNS/vttIgVeBb4jE56ksuYIgIpgav6lhTdVVJWRzKxwPsYrsj16q' };
		queries.addUser(newUser.username, newUser.password, (err1, res1) => {
			if (err1) {
				console.log('err', err1);
			} else {
				dbConnection.query('SELECT * from users', (err2, res2) => {
					t.equal(5, res2.rows.length, "Should be 5 rows in table");
					t.end();
				})
			}
		});
	})
});

test('emailInDatase', (t) => {
	dbBuild((err,res) => {
		const newUser = { username: 'shannonj@gmail.com', password: '$2a$10$qNNS/vttIgVeBb4jE56ksuYIgIpgav6lhTdVVJWRzKxwPsYrsj16q' };
		queries.addUser(newUser.username, newUser.password, (err1, res1) => {
			if(err1) {
				console.log('err', err1);
			} else {
				queries.emailInDatabase(newUser.username, (err2, res2) => {
					t.equal(1, res2, "Should return 1 bc email in the database");
				});
				queries.emailInDatabase('yoyoyo@gmail.com', (err2, res2) => {
					t.equal(0, res2, "Should return 0 bc email not in the database");
					t.end();
				});
			}
		});
	});
});

test('getHash', (t) => {
	dbBuild((err,res) => {
		const newUser = { username: 'shannonj@gmail.com', password: '$2a$10$qNNS/vttIgVeBb4jE56ksuYIgIpgav6lhTdVVJWRzKxwPsYrsj16q' };
		queries.addUser(newUser.username, newUser.password, (err1, res1) => {
			if(err1) {
				console.log('err', err1);
			} else {
				queries.getHash(newUser.username, (err2, res2) => {
					t.equal(newUser.password, res2.rows[0].password, "Should return correct password");
					t.end();
				});
			}
		});
	});
});

test('loadPost', (t) => {
	dbBuild((err,res) => {
		const expected = [
    {id:1,title: 'HTML',text_post: 'I like HTML',username:'shannon@gmail.com'},
    {id:2,title: 'CSS',text_post: 'I like CSS',username:'jem@gmail.com'},
    {id:3,title: 'JS',text_post: 'I like JS',username:'mo@gmail.com'},
    {id:4,title: 'Authentication',text_post: 'I like cookies',username:'dragomir@gmail.com'}
];
		queries.loadPost((err1, res1) => {
			if(err1) {
				console.log('err', err1);
			} else {
          t.deepEquals(expected, res1, "Should return four posts");
					t.end();

			}
		});
	})
})

test('loadComments', (t) => {
	dbBuild((err,res) => {
		const expected = [
      {username:'shannon@gmail.com', text_comments:'I love HTML! Hello World!'},
      {username:'jem@gmail.com', text_comments:'Hmmm I find HTML difficult :('},
      {username:'shannon@gmail.com', text_comments:'It gets easier with practice!'},
      {username:'jem@gmail.com',text_comments:'Thanks! Will get there...'}
];
		queries.loadComments(1,(err1, res1) => {
			if(err1) {
				console.log('err', err1);
			} else {
          t.deepEquals(expected, res1, "Should return four comments");
					t.end();

			}
		});
	})
})
