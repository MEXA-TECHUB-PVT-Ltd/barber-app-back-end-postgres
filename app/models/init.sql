
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
);

CREATE TABLE IF NOT EXISTS otpStored(
  id SERIAL PRIMARY KEY ,
  email  TEXT ,
  otp TEXT 
);


CREATE TABLE IF NOT EXISTS hairStyles(
  hairStyle_id SERIAL PRIMARY KEY ,
  title  TEXT ,
  image TEXT ,
  created_by TEXT,
  created_by_id INTEGER ,
  trash BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hairCutPrices(
  hair_cut_price_id SERIAL PRIMARY KEY ,
  price TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS commissions(
  commission_id SERIAL PRIMARY KEY ,
  name TEXT,
  percentage TEXT,
  status TEXT DEFAULT 'inactive',
  trash BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
