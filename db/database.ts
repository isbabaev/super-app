import { Database, OPEN_READWRITE } from "sqlite3";

export const database = new Database("./super-app.db", OPEN_READWRITE, (err) => {
  console.log('Error had been occured', err)
});
