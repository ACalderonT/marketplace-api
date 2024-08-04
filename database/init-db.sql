CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    lastname VARCHAR,
    email VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(12) NOT NULL,
    password VARCHAR(60) NOT NULL,
    active BOOLEAN default false,
    avatar VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

DROP TABLE favorites;
DROP TABLE posts;
DROP TABLE categories;
CREATE TABLE IF NOT EXISTS categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    description VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

INSERT INTO categories (name, description, created_at, updated_at) VALUES
('phones', NULL, now(), now()),
('cameras', NULL, now(), now()),
('laptops', NULL, now(), now()),
('headphones', NULL, now(), now())
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR,
    brand VARCHAR,
    price INTEGER NOT NULL,
    images TEXT[],
    location VARCHAR,
    creator_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_creator
        FOREIGN KEY(creator_id)
            REFERENCES users(id),
    CONSTRAINT fk_category_id
        FOREIGN KEY(category_id)
            REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS favorites(
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id),
    CONSTRAINT fk_post
        FOREIGN KEY(post_id)
            REFERENCES posts(id)
);