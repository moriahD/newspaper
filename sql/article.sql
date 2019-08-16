DROP TABLE IF EXISTS article; --add this

CREATE TABLE article(
    id SERIAL PRIMARY KEY,
    reporter_id INT REFERENCES users(id),
    category_id INT REFERENCES category(id),
    title TEXT,
    description TEXT,
    article_body TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR
);
