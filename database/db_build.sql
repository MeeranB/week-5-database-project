BEGIN;

DROP TABLE IF EXISTS users, posts, keywords CASCADE;

CREATE TABLE keywords (
    id SERIAL PRIMARY KEY,
    keyword_name VARCHAR(50)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    keyword_id INTEGER REFERENCES keywords(id)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    text_content VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);

INSERT INTO keywords (keyword_name) VALUES
('red'),
('green'),
('blue')
; 

INSERT INTO users (username, keyword_id) VALUES
('bunnt23', 1),
('sdfsdgesg', 2),
('grgrDSDA', 3)
('sddfsadfsdg', 4)
; 

INSERT INTO posts (user_id, text_content) VALUES
(1,'Regeneration'),
(2,'Shoots concussive energy bursts from her hands'),
(3,'Announcing of invitation principles in')
; 

COMMIT;