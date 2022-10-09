import { createServer } from "./api/server";
import { DbClient } from "./db/client";
import dotenv from 'dotenv';

(async () => {
  dotenv.config(); // TODO don't use dotenv
  
  await DbClient.createClient().connect();
  console.log('Connection to database established');
  await DbClient.runMigrations();
  console.log('Migrations have been performed');

  createServer();
})().catch(error => {
  console.log('An error has been occured', error);
});
