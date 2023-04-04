
CREATE TABLE IF NOT EXISTS barbers(
  id SERIAL PRIMARY KEY,
  user_name TEXT,
  password TEXT,
  email TEXT UNIQUE NOT NULL,
  device_token TEXT,
  profile_image TEXT ,
  gender TEXT,
  age TEXT ,
  experiance TEXT,
  saloon_location  POINT , 
  block_status TEXT DEFAULT 'inactive',
  saloon_location_address  TEXT ,
  stripe_account_id TEXT ,
  stripe_customer_id  TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS admins(
  id SERIAL PRIMARY KEY,
  user_name TEXT,
  password TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  img  TEXT,
  privacy_policy  TEXT ,
  terms_and_conditions TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lengths(
  id SERIAL PRIMARY KEY ,
  name  TEXT ,
  length TEXT 
)