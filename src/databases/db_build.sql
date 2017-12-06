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

COMMIT;
