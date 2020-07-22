BEGIN;

DROP TABLE IF EXISTS users, posts, keywords CASCADE;

CREATE TABLE users {
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    keyword_name REFERENCES keywords(key_name)
}

CREATE TABLE posts {
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    text_content VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}


CREATE TABLE keywords {
    id SERIAL PRIMARY KEY,
    key_name VARCHAR(50),
    -- user_id INTEGER REFERENCES users(id),
}

INSERT INTO users (username, keyword_name) VALUES
('bunnt23', 'red'),
('sdfsdgesg', 'green'),
('grgrDSDA','blue')
; 

INSERT INTO posts (user_id, text_content) VALUES
(1,'Regeneration'),
(2,'Shoots concussive energy bursts from her hands'),
(3,'Announcing of invitation principles in')
(4,'Peculiar trifling absolute and wandered yet'),
(5,'Far stairs now coming bed oppose hunted become his.'),
(6,'Curabitur arcu quam, imperdiet ac orci ac')
; 

INSERT INTO keywords (key_name) VALUES
('red'),
('green'),
('blue')
; 

COMMIT;
