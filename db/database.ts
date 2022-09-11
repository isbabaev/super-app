import { Database, OPEN_READWRITE } from "sqlite3";

export const database = new Database("./super-app.db", OPEN_READWRITE, (err) => {
  console.log('Error had been occured', err)
});

export function waitUntilDbConnectionIsEstablished(): Promise<void> {
  return new Promise((resolve, reject) => {
    database.on('open', resolve);
    database.on('error', reject);
  })
}

