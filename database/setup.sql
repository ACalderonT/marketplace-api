DROP DATABASE IF EXISTS "marketplace-db";
CREATE DATABASE "marketplace-db";

\c "marketplace-db";

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    lastname VARCHAR,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(12),
    password VARCHAR(60),
    active BOOLEAN
);

INSERT INTO users (name, lastname, email, phone, password, active) VALUES ('user_name 1', 'lastname 1', 'email@example.com', '123456789', '123', false);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR,
    brand VARCHAR,
    price INTEGER NOT NULL,
    images TEXT[],
    location VARCHAR,
    creator_id INTEGER NOT NULL,
    CONSTRAINT fk_creator
        FOREIGN KEY(creator_id)
            REFERENCES users(id)
);

INSERT INTO posts (title, description, brand, price, location, creator_id) VALUES ('producto 1', 'descripción 1', 'brand 1', 150000, 'Santiago', 1);

CREATE TABLE IF NOT EXISTS favorites(
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id),
    CONSTRAINT fk_post
        FOREIGN KEY(post_id)
            REFERENCES posts(id)
);

CREATE TABLE IF NOT EXISTS categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR
);

CREATE TABLE IF NOT EXISTS category_posts(
    id SERIAL PRIMARY KEY,
    category_id INTEGER,
    post_id INTEGER,
    CONSTRAINT fk_category
        FOREIGN KEY(category_id)
            REFERENCES categories(id),
    CONSTRAINT fk_category_post
        FOREIGN KEY(post_id)
            REFERENCES posts(id)
);