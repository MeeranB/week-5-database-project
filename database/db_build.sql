BEGIN;

DROP TABLE IF EXISTS users, posts, keywords CASCADE;

CREATE TABLE keywords (
    id SERIAL PRIMARY KEY,
    keyword_name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    keyword_id INTEGER NOT NULL REFERENCES keywords(id)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    posted_with_keyword INTEGER NOT NULL REFERENCES keywords(id),
    text_content VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);

INSERT INTO keywords (keyword_name) VALUES
('red'),
('green'),
('blue')
; 

INSERT INTO users (username, keyword_id) VALUES
('My first user', 1)
; 

INSERT INTO posts (user_id, posted_with_keyword, text_content) VALUES
(1,1,'My first post')
; 

COMMIT;