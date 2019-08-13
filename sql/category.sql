DROP TABLE IF EXISTS category; --add this

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    category_name VARCHAR,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
