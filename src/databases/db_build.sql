BEGIN;

DROP TABLE IF EXISTS users, post, comments;


CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE post (
  id serial PRIMARY KEY,
  postUser_id INTEGER REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  text_post TEXT NOT NULL
);

CREATE TABLE comments (
    id serial PRIMARY KEY,
    post_id INTEGER REFERENCES post(id) ON UPDATE CASCADE,
    commentuser_id INTEGER REFERENCES users(id) ON UPDATE CASCADE,
    text_comments TEXT NOT NULL
);

INSERT INTO users(username, password) VALUES
    ('shannon@gmail.com', '$2a$10$6v.m.ReoTQpUvTwC/3XIv.RnEo3HbVsi9RhMmwOvXga9VWsC1j6Lq'),
    ('jem@gmail.com', '$2a$10$.ij.L3nE9PMuW8ieXGobWuZQ2ZmWYIaNC8/a5XN2Mw7/Swoa0vVxW'),
    ('mo@gmail.com', '$2a$10$EGGEIZ29PWPY4gpg8B.7VOJjt.r0EhpCZCAXav7.JfpWalXbmZzuy'),
    ('dragomir@gmail.com', '$2a$10$qNNS/vttIgVeBb4jE56ksuYIgIpgav6lhTdVVJWRzKxwPsYrsj16q');

INSERT INTO post(postUser_id, title, text_post) VALUES
    (1, 'HTML','I like HTML'),
    (2, 'CSS','I like CSS'),
    (3, 'JS','I like JS'),
    (4, 'Authentication','I like cookies');

INSERT INTO comments(post_id, commentuser_id, text_comments) VALUES
    (1, 1, 'I love HTML! Hello World!'),
    (1, 2, 'Hmmm I find HTML difficult :('),
    (1, 1, 'It gets easier with practice!'),
    (1, 2, 'Thanks! Will get there...');

COMMIT;