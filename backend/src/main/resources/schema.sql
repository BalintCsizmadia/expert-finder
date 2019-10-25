DROP TABLE IF EXISTS authorities;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS professions;
DROP TABLE IF EXISTS visitors;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    enabled BOOLEAN,
    registration_date DATE
);

CREATE TABLE visitors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    email TEXT NOT NULL UNIQUE,
    registration_date DATE,
    FOREIGN KEY(user_id) REFERENCES users(id)
);


CREATE TABLE professions (
    id SERIAL PRIMARY KEY,
    name_en TEXT,
    name_hu TEXT
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    phone_number TEXT,
    profession_id INTEGER,
    is_active BOOLEAN,
    position JSON,
  -- default_position JSON ?
    status INTEGER,
    available_from TIMESTAMP,
    registration_date DATE,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(profession_id) REFERENCES professions(id)
);

CREATE TABLE authorities (
    username TEXT NOT NULL,
    authority TEXT NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username),
    UNIQUE (username, authority)
);

