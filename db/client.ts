import { Client } from "pg";
import fs from "fs";
import path from "path";

// TODO move to engine directory and create an interface
export namespace DbClient {
  let client: Client | undefined;

  export function createClient() {
    client = new Client(process.env.DB_CONNECTION_STRING);
    return client;
  }

  export function getClient(): Client {
    if (client === undefined) {
      throw new Error();
    }
    return client;
  }

  export async function runMigrations(): Promise<void> {
    const tableName = process.env.MIGRATIONS_TABLE_NAME;
    await getClient().query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        name VARCHAR PRIMARY KEY
      )
    `);

    const performedMigrations = await getClient()
      .query(`SELECT name FROM ${tableName}`)
      .then((result) => result.rows.map((row) => row.name));

    const files = fs.readdirSync(`${__dirname}/migrations`);
    const sqlFiles = files.filter(
      (file) =>
        path.extname(file).toLowerCase() === ".sql" &&
        !performedMigrations.includes(file)
    );
    for (const fileName of sqlFiles) {
      const buffer = fs.readFileSync(`${__dirname}/migrations/${fileName}`);
      const sqlQuery = buffer.toString("utf-8");
      try {
        await getClient().query("BEGIN");
        await getClient().query(sqlQuery);
        await getClient().query(
          `INSERT INTO migrations VALUES ('${fileName}')`
        );
        await getClient().query("COMMIT");
      } catch (error) {
        await getClient().query("ROLLBACK");
        throw error;
      }
    }
  }
}
