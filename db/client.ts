import { Client } from "pg";

// TODO use config file instead of straightway using process.env, because it's not typed
export const client = new Client(process.env.DB_CONNECTION_STRING);