DROP TABLE IF EXISTS wallpost; --add this

CREATE TABLE wallpost(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    wpmessage VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
