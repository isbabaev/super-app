import { createServer } from "./api/server";
import { waitUntilDbConnectionIsEstablished } from "./db/database";

(async () => {
  createServer();
  await waitUntilDbConnectionIsEstablished();
})();
