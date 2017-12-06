BEGIN;


INSERT INTO users(username, password) VALUES
    ('Shannon', ''),
    ('Jem', ''),
    ('Mo', ''),
    ('Dragomir', '');

INSERT INTO post(postUser_id, title,text_post) VALUES
    (1, 'HTML','I like HTML'),
    (2, 'CSS','I like CSS')),
    (3, 'JS','I like JS')),
    (4, 'Authentication','I like cookies'));

INSERT INTO comments(post_id, commentuser_id, text_comments) VALUES
    (1, 2, 'I will HTML too!');

COMMIT;
