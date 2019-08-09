DROP TABLE IF EXISTS users; --add this

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    image VARCHAR,
    bio VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
