CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(256) NOT NULL,
  last_name VARCHAR(256) NOT NULL,
  email VARCHAR(256) NOT NULL,
  password VARCHAR(256) NOT NULL
)