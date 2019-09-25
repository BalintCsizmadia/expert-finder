DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	registration_date DATE
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone_number TEXT,
  profession TEXT,
  is_active BOOLEAN,
  position JSON,
  status INTEGER,
  available_from INTEGER
);
