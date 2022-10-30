import { createServer } from "./api/server";
import { DbClient } from "./db/client";
import { IOC } from "./ioc";
import dotenv from "dotenv";

(async () => {
  dotenv.config(); // TODO don't use dotenv

  await DbClient.getClient().connect();
  console.log("Connection to database established");
  await DbClient.runMigrations();
  console.log("Migrations have been performed");

  const controllers = IOC.initialize(DbClient.getClient());

  createServer(controllers);
})().catch(async (error) => {
  console.log("An error has been occured", error);
  await DbClient.getClient().end();
});
