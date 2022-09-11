import { createServer } from "./api/server";
import { client } from "./db/client";
import dotenv from 'dotenv';

(async () => {
  dotenv.config();
  
  await client.connect().then(() => console.log('Connection to database established'));
  createServer();
})();
